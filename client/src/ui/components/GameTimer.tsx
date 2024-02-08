import { useDojo } from '@/dojo/useDojo';
import { useQueryParams } from '@/dojo/useQueryParams';
import { TextContainer } from '../elements/TextContainer';
import useTimeRemaining from '@/dojo/useTimeRemaining';
import { useEffect, useState } from 'react';
import { Game } from '@/generated/graphql';
import { GameStatus } from '@/dojo/gameConfig';

//TODO: Remove Graphql
export const GameTimer = () => {
    const { game_id } = useQueryParams();
    const {
        setup: { graphSdk },
    } = useDojo();

    const [game, setGame] = useState<Game>({
        __typename: 'Game',
        game_id: 2,
        start_time: 1700643311,
        status: 3,
        number_players: 2,
        max_players: 10,
        game_length: 6000,
        entry_fee: 0,
        password: '0x4d2',
    });

    useEffect(() => {
        const games = async () => {
            const {
                data: { gameModels },
            } = await graphSdk.getGames({ status: GameStatus.Started, gameId: game_id });
            return setGame(gameModels?.edges[0].node.entity.models.find((m) => m?.__typename == 'Game') as Game);
        };

        games();
    }, []);

    const { getTimeRemaining } = useTimeRemaining(game.start_time, game.game_length * 1000);

    return (
        <TextContainer>
            <span className="text-2xl flex">
                <span className="self-center">{getTimeRemaining()}</span>
            </span>
        </TextContainer>
    );
};
