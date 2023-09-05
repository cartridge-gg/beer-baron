import { SetupNetworkResult } from "./setupNetwork";
import { Event } from "starknet";
import { EntityIndex, setComponent, Components, Schema, getComponentValue } from "@latticexyz/recs";
import { uuid } from "@latticexyz/utils";
import { fromFixed } from "@/utils/fixed";
import { poseidonHashMany } from "micro-starknet";
import { BuyHopsProps, JoinGameProps, GameIdProps, ViewPriceProps, SystemSigner, FarmProps, BrewBeerProps, BottleBeerProps, SellBeerProps } from "./types";

import { toast } from 'react-toastify';
import { BATCH_AMOUNT, Beers, Hops } from "./gameConfig";
import { ClientComponents } from "./createClientComponents";


export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
    { execute, contractComponents, call }: SetupNetworkResult,
    { ItemBalance }: ClientComponents
) {

    const notify = (message: string) => toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    const create_game = async ({ account }: SystemSigner) => {

        try {
            const tx = await execute(account, "create_game", []);
            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 })
            setComponentsFromEvents(contractComponents, getEvents(receipt));

            notify('Game Created!')
        } catch (e) {
            console.log(e)
        }
    };

    const join_game = async ({ account, game_id, name }: JoinGameProps) => {

        try {
            const tx = await execute(account, "join_game", [game_id, name]);
            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 })
            setComponentsFromEvents(contractComponents, getEvents(receipt));

            notify('Joined Game ' + game_id)
        } catch (e) {
            console.log(e)
        }
    };

    const start_game = async ({ account, game_id }: GameIdProps) => {

        try {
            const tx = await execute(account, "start_game", [game_id]);

            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 })
            setComponentsFromEvents(contractComponents, getEvents(receipt));

            notify('Started ' + game_id)
        } catch (e) {
            console.log(e)
        }
    };

    const view_hop_price = async ({ game_id, item_id }: ViewPriceProps) => {
        try {
            const tx: any = await call("view_hop_price", [game_id, item_id]);

            console.log(fromFixed(tx[0]))
            return fromFixed(tx[0])
        } catch (e) {
            console.log(e)
        }
    }
    const view_beer_price = async ({ game_id, item_id }: ViewPriceProps) => {

        try {
            const tx: any = await call("view_beer_price", [game_id, item_id]);
            return fromFixed(tx[0])
        } catch (e) {
            console.log(e)
        }

    }

    const buy_hops = async ({ account, game_id, item_id, amount }: BuyHopsProps) => {

        const overrideId = uuid();
        let hop_entity_id = getEntityIdFromKeys([BigInt(game_id), BigInt(account.address), BigInt(item_id)])

        let current_value = getComponentValue(ItemBalance, hop_entity_id);

        ItemBalance.addOverride(overrideId, {
            entity: hop_entity_id,
            value: { balance: current_value?.balance! + amount }
        })

        try {
            const tx = await execute(account, "buy_hops", [game_id, item_id, amount]);
            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 })
            setComponentsFromEvents(contractComponents, getEvents(receipt));

            notify(amount + ' x ' + Hops[item_id] + ' Hops bought!')
        } catch (e) {
            console.log(e)
            ItemBalance.removeOverride(overrideId);
        } finally {
            ItemBalance.removeOverride(overrideId);
        }
    }

    const build_farm = async ({ account, game_id, area_type }: FarmProps) => {

        try {
            const tx = await execute(account, "build_farm", [game_id, area_type.length, ...area_type]);
            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 })
            setComponentsFromEvents(contractComponents, getEvents(receipt));

            notify('Farm built!')
        } catch (e) {
            console.log(e)
        }
    }

    const harvest_farm = async ({ account, game_id }: GameIdProps) => {
        try {
            const tx = await execute(account, "harvest_farm", [game_id]);
            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 })
            setComponentsFromEvents(contractComponents, getEvents(receipt));

            notify('Farm Harvested!')
        } catch (e) {
            console.log(e)
        }
    }

    const brew_beer = async ({ account, game_id, beer_id }: BrewBeerProps) => {
        try {
            const tx = await execute(account, "brew_beer", [game_id, beer_id]);
            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 })
            setComponentsFromEvents(contractComponents, getEvents(receipt));

            notify(Beers[beer_id + 1000] + ' is brewing in the tank!')
        } catch (e) {
            console.log(e)
        }
    }

    const bottle_beer = async ({ account, game_id, beer_id, batch_id }: BottleBeerProps) => {

        const overrideId = uuid();
        let hop_entity_id = getEntityIdFromKeys([BigInt(game_id), BigInt(account.address), BigInt(beer_id)])

        let current_value = getComponentValue(ItemBalance, hop_entity_id);

        ItemBalance.addOverride(overrideId, {
            entity: hop_entity_id,
            value: { balance: current_value?.balance! + BATCH_AMOUNT }
        })

        try {
            const tx = await execute(account, "bottle_beer", [game_id, batch_id]);
            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 })

            console.log(receipt)
            setComponentsFromEvents(contractComponents, getEvents(receipt));

            notify(Beers[beer_id + 1000] + ' has been bottled!')
        } catch (e) {
            console.log(e)
            ItemBalance.removeOverride(overrideId);
        } finally {
            ItemBalance.removeOverride(overrideId);
        }
    }

    const sell_beer = async ({ account, game_id, beer_id, amount }: SellBeerProps) => {

        try {
            const tx = await execute(account, "sell_beer", [game_id, beer_id, amount]);
            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 })
            setComponentsFromEvents(contractComponents, getEvents(receipt));

            notify(Beers[beer_id + 1000] + ' has been sold!')
        } catch (e) {
            console.log(e)
        }
    }

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
        sell_beer
    };
}

export function getEvents(receipt: any): any[] {
    console.log(receipt.events)
    return receipt.events.filter((event: any) => {
        return event.keys.length === 1 &&
            event.keys[0] === import.meta.env.VITE_EVENT_KEY;
    });
}

export function setComponentsFromEvents(components: Components, events: Event[]) {
    events.forEach((event) => setComponentFromEvent(components, event.data));
}

export function setComponentFromEvent(components: Components, eventData: string[]) {
    // retrieve the component name
    const componentName = hexToAscii(eventData[0]);

    // retrieve the component from name
    const component = components[componentName];

    // get keys
    const keysNumber = parseInt(eventData[1]);
    let index = 2 + keysNumber + 1;

    const keys = eventData.slice(2, 2 + keysNumber).map((key) => BigInt(key));

    // get entityIndex from keys
    const entityIndex = getEntityIdFromKeys(keys);

    // get values
    let numberOfValues = parseInt(eventData[index++]);

    // get values
    const values = eventData.slice(index, index + numberOfValues);

    // create component object from values with schema
    const componentValues = Object.keys(component.schema).reduce((acc: Schema, key, index) => {
        const value = values[index];
        acc[key] = Number(value);
        return acc;
    }, {});

    console.log(componentName, entityIndex, componentValues)

    // set component
    setComponent(component, entityIndex, componentValues);

}

function hexToAscii(hex: string) {
    var str = '';
    for (var n = 2; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

export function getEntityIdFromKeys(keys: bigint[]): EntityIndex {
    if (keys.length === 1) {
        return parseInt(keys[0].toString()) as EntityIndex;
    }
    // calculate the poseidon hash of the keys
    let poseidon = poseidonHashMany([BigInt(keys.length), ...keys]);
    return parseInt(poseidon.toString()) as EntityIndex;
}
