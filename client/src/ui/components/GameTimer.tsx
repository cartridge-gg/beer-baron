import { useDojo } from '@/DojoContext';
import { useQueryParams } from '@/dojo/useQueryParams';
import { getEntityIdFromKeys } from '@dojoengine/utils';
import { useComponentValue } from '@dojoengine/react';
import { TextContainer } from '../elements/TextContainer';
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
    } = useDojo();

    const entityId = getEntityIdFromKeys([BigInt(game_id)]);

    const start_time = useComponentValue(Game, entityId)?.start_time || 0;

    const game_length = useComponentValue(Game, entityId)?.game_length || 0;

    const { getTimeRemaining } = useTimeRemaining(start_time, game_length * 1000);

    // TODO: This not working...
    useSync(torii_client, GameContract, [BigInt(game_id)]);

    console.log(useComponentValue(Game, entityId));    

    return (
        <TextContainer>
            <span className="text-2xl flex">
                <span className="self-center">{getTimeRemaining()}</span>
            </span>
        </TextContainer>
    );
};
