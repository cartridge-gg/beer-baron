import { useDojo } from '@/DojoContext';
import { GOLD_ID } from '@/dojo/gameConfig';
import { useQueryParams } from '@/dojo/useQueryParams';
import { getEntityIdFromKeys } from '@dojoengine/utils';
import { useComponentValue } from '@latticexyz/react';
import { TextContainer } from '../elements/TextContainer';
import Coin from '../../icons/coin.svg?react';
import { useSync } from '@dojoengine/react';
import useTimeRemaining from '@/dojo/useTimeRemaining';

export const GameTimer = () => {
    const { game_id } = useQueryParams();
    const {
        setup: {
            components: { Game },
            network: {
                contractComponents: { Game: GameContract },
                torii_client,
            },
        },
        account: { account },
    } = useDojo();

    const entityId = getEntityIdFromKeys([BigInt(game_id)]);

    const start_time = useComponentValue(Game, entityId)?.start_time || 0;

    const game_length = useComponentValue(Game, entityId)?.game_length || 0;

    const { getTimeRemaining } = useTimeRemaining(start_time, game_length * 1000);

    useSync(torii_client, GameContract, [BigInt(game_id)]);

    return (
        <TextContainer>
            <span className="text-2xl flex">
                {/* <Coin className="self-center mr-3 h-10" /> */}
                <span className="self-center">{getTimeRemaining()}</span>
            </span>
        </TextContainer>
    );
};
