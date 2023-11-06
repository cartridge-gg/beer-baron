import { useDojo } from '@/DojoContext';
import { GOLD_ID } from '@/dojo/gameConfig';
import { useQueryParams } from '@/dojo/useQueryParams';
import { getEntityIdFromKeys } from '@dojoengine/utils';
import { useComponentValue } from '@latticexyz/react';
import { TextContainer } from '../elements/TextContainer';
import Coin from '../../icons/coin.svg?react';
import { useSync } from '@/hooks/useSync';

export const GoldBalance = () => {
    const { game_id } = useQueryParams();
    const {
        setup: {
            components: { ItemBalance },
            network: {
                contractComponents: { ItemBalance: ItemBalanceContract },
                torii_client,
            },
        },
        account: { account },
    } = useDojo();

    const entityId = getEntityIdFromKeys([BigInt(game_id), BigInt(account.address), BigInt(GOLD_ID)]);

    const gold_balance = useComponentValue(ItemBalance, entityId)?.balance.toString() || 0;

    useSync(torii_client, ItemBalanceContract, [BigInt(game_id), BigInt(account.address), BigInt(GOLD_ID)]);

    return (
        <TextContainer>
            <span className="text-2xl flex">
                <Coin className="self-center mr-3 h-8" />
                <span className="self-center">{gold_balance}</span>
            </span>
        </TextContainer>
    );
};
