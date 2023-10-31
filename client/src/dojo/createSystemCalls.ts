import { SetupNetworkResult } from './setupNetwork';
import { getComponentValue } from '@latticexyz/recs';
import { uuid } from '@latticexyz/utils';
import { fromFixed } from '@/utils/fixed';
import {
    BuyHopsProps,
    JoinGameProps,
    GameIdProps,
    ViewPriceProps,
    FarmProps,
    BrewBeerProps,
    BottleBeerProps,
    SellBeerProps,
    CreateGameProps,
    MakeTradeProps,
    AcceptTradeProps,
    CancelTradeProps,
    ClaimIndulgenceProps,
    PlaceIndulgencesBidProps,
} from './types';
import { getEntityIdFromKeys, getEvents, setComponentsFromEvents } from '@dojoengine/utils';

import { ClientComponents } from './createClientComponents';

import manifest from '../../../contracts/target/dev/manifest.json';
import { toast } from '@/ui/elements/use-toast';
import { Beers, ItemNames, Seeds } from '@/ui/components/ItemCard';

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls({ execute, contractComponents, call }: SetupNetworkResult, { ItemBalance }: ClientComponents) {
    const notify = (message: string, transaction: any) =>
        toast({
            title: 'BREW',
            description: transaction.execution_status != 'REVERTED' ? message : transaction.revert_reason,
            variant: 'default',
        });

    const create_game = async ({ account, max_players, game_length, password, entry_fee }: CreateGameProps) => {
        try {
            const tx = await execute(account, 'lobby', 'create_game', [max_players, game_length, password, entry_fee]);
            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 });
            setComponentsFromEvents(contractComponents, getEvents(receipt));

            notify('Game Created!', receipt);
        } catch (e) {
            console.log(e);
        }
    };

    const join_game = async ({ account, game_id, name }: JoinGameProps) => {
        try {
            const tx = await execute(account, 'lobby', 'join_game', [game_id, name, 1234]);
            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 });
            setComponentsFromEvents(contractComponents, getEvents(receipt));

            notify('Joined Game ' + game_id, receipt);
        } catch (e) {
            console.log(e);
        }
    };

    const start_game = async ({ account, game_id }: GameIdProps) => {
        const auctions_address = manifest.contracts.find((contract) => contract.name === 'auctions')?.address || '';

        try {
            const tx = await execute(account, 'lobby', 'start_game', [game_id, auctions_address]);
            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 });
            setComponentsFromEvents(contractComponents, getEvents(receipt));

            notify('Started ' + game_id, receipt);
        } catch (e) {
            console.log(e);
        }
    };

    const view_hop_price = async ({ game_id, item_id }: ViewPriceProps) => {
        try {
            const tx: any = await call('auctions', 'get_hop_price', [game_id, item_id]);
            return fromFixed(tx.result[0]);
        } catch (e) {
            console.log(e);
        }
    };
    const view_beer_price = async ({ game_id, item_id }: ViewPriceProps) => {
        try {
            const tx: any = await call('auctions', 'get_beer_price', [game_id, item_id]);
            return fromFixed(tx.result[0]);
        } catch (e) {
            console.log(e);
        }
    };

    const buy_hops = async ({ account, game_id, item_id, amount }: BuyHopsProps) => {
        const overrideId = uuid();
        const hop_entity_id = getEntityIdFromKeys([BigInt(game_id), BigInt(account.address), BigInt(item_id)]);

        const current_value = getComponentValue(ItemBalance, hop_entity_id);

        ItemBalance.addOverride(overrideId, {
            entity: hop_entity_id,
            value: { balance: current_value?.balance },
        });

        try {
            const tx = await execute(account, 'auctions', 'buy_hops', [game_id, item_id, amount]);
            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 });
            setComponentsFromEvents(contractComponents, getEvents(receipt));

            notify(amount + ' x ' + Seeds[item_id] + ' Hops bought!', receipt);
        } catch (e) {
            console.log(e);
            ItemBalance.removeOverride(overrideId);
        } finally {
            ItemBalance.removeOverride(overrideId);
        }
    };

    const build_farm = async ({ account, game_id, area_type }: FarmProps) => {
        try {
            const tx = await execute(account, 'farming', 'build_farm', [game_id, area_type.length, ...area_type]);
            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 });
            setComponentsFromEvents(contractComponents, getEvents(receipt));

            notify('Farm built!', receipt);
        } catch (e) {
            console.log(e);
        }
    };

    const harvest_farm = async ({ account, game_id }: GameIdProps) => {
        try {
            const tx = await execute(account, 'farming', 'harvest_farm', [game_id]);
            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 });
            setComponentsFromEvents(contractComponents, getEvents(receipt));

            notify('Farm Harvested!', receipt);
        } catch (e) {
            console.log(e);
        }
    };

    const brew_beer = async ({ account, game_id, beer_id }: BrewBeerProps) => {
        try {
            const tx = await execute(account, 'brewing', 'brew_beer', [game_id, beer_id]);

            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 });
            setComponentsFromEvents(contractComponents, getEvents(receipt));
            notify(ItemNames[(beer_id + 1000) as Beers] + ' is brewing in the tank!', receipt);
        } catch (e) {
            console.log(e);
        }
    };

    const bottle_beer = async ({ account, game_id, beer_id, batch_id }: BottleBeerProps) => {
        const overrideId = uuid();

        const hop_entity_id = getEntityIdFromKeys([BigInt(game_id), BigInt(account.address), BigInt(beer_id)]);

        const current_value = getComponentValue(ItemBalance, hop_entity_id);

        ItemBalance.addOverride(overrideId, {
            entity: hop_entity_id,
            value: { balance: current_value?.balance },
        });

        try {
            const tx = await execute(account, 'brewing', 'bottle_beer', [game_id, batch_id]);
            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 });
            setComponentsFromEvents(contractComponents, getEvents(receipt));

            notify(ItemNames[(beer_id + 1000) as Beers] + ' has been bottled!', receipt);
        } catch (e) {
            console.log(e);
            ItemBalance.removeOverride(overrideId);
        } finally {
            ItemBalance.removeOverride(overrideId);
        }
    };

    const sell_beer = async ({ account, game_id, beer_id, amount }: SellBeerProps) => {
        try {
            const tx = await execute(account, 'auctions', 'sell_beer', [game_id, beer_id, amount]);

            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 });
            setComponentsFromEvents(contractComponents, getEvents(await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 })));
            console.log(beer_id);
            notify(ItemNames[(beer_id + 1000) as Beers] + ' has been sold!', receipt);
        } catch (e) {
            console.log(e);
        }
    };

    const create_trade = async ({ account, game_id, item_id, quantity, price }: MakeTradeProps) => {
        try {
            const tx = await execute(account, 'trading', 'create_trade', [game_id, item_id, quantity, price]);

            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 });

            console.log(receipt);

            setComponentsFromEvents(contractComponents, getEvents(receipt));

            notify('Trade Created!', receipt);
        } catch (e) {
            console.log(e);
        }
    };
    const accept_trade = async ({ account, game_id, trade_id }: AcceptTradeProps) => {
        try {
            const tx = await execute(account, 'trading', 'accept_trade', [game_id, trade_id]);

            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 });
            setComponentsFromEvents(contractComponents, getEvents(receipt));
            notify('Trade accepted', receipt);
        } catch (e) {
            console.log(e);
        }
    };

    const cancel_trade = async ({ account, game_id, trade_id }: CancelTradeProps) => {
        try {
            const tx = await execute(account, 'trading', 'accept_trade', [game_id, trade_id]);

            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 });
            setComponentsFromEvents(contractComponents, getEvents(receipt));
            notify('Trade cancelled', receipt);
        } catch (e) {
            console.log(e);
        }
    };

    const place_indulgences_bid = async ({ account, game_id, price }: PlaceIndulgencesBidProps) => {
        try {
            const tx = await execute(account, 'auctions', 'place_indulgences_bid', [game_id, price]);

            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 });
            setComponentsFromEvents(contractComponents, getEvents(receipt));

            notify(`Placed Bid: ${price}`, receipt);
        } catch (e) {
            console.log(e);
        }
    };

    const claim_indulgence = async ({ account, game_id }: ClaimIndulgenceProps) => {
        try {
            const tx = await execute(account, 'auctions', 'claim_indulgence', [game_id]);

            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 });
            setComponentsFromEvents(contractComponents, getEvents(receipt));

            notify('Claimed Indulgence', receipt);
        } catch (e) {
            console.log(e);
        }
    };

    const increment_indulgences_auction = async ({ account, game_id }: ClaimIndulgenceProps) => {
        try {
            const { transaction_hash } = await execute(account, 'auctions', 'increment_indulgences_auction', [game_id]);

            const receipt = await account.waitForTransaction(transaction_hash, { retryInterval: 100 });
            setComponentsFromEvents(contractComponents, getEvents(receipt));

            notify('New Auction Started!', receipt);
        } catch (e) {
            console.log(e);
        }
    };

    return {
        create_game,
        join_game,
        start_game,
        view_hop_price,
        view_beer_price,
        buy_hops,
        build_farm,
        harvest_farm,
        brew_beer,
        bottle_beer,
        sell_beer,
        accept_trade,
        cancel_trade,
        create_trade,
        place_indulgences_bid,
        claim_indulgence,
        increment_indulgences_auction,
    };
}
