import { useComponentValue, useEntityQuery } from '@dojoengine/react';
import { useDojo } from '../../dojo/useDojo';
import { Button } from '@/ui/elements/button';
import { HasValue } from '@dojoengine/recs';
import { useNavigate } from 'react-router-dom';

export const MyGames = () => {
    const {
        setup: {
            clientComponents: { Game },
        },
    } = useDojo();

    const active_games = useEntityQuery([HasValue(Game, { status: 3 })]);

    return (
        <div className="mt-8">
            <div className="uppercase mb-4">My Games</div>
            <div className="border border-dirt-300 p-2 text-center">
                {active_games.length
                    ? active_games.map((game_id, index) => {
                          return <ActiveGames key={index} entity={game_id} />;
                      })
                    : 'you are not in any games'}
            </div>
        </div>
    );
};

export const ActiveGames = ({ entity }: any) => {
    const {
        setup: {
            clientComponents: { Game },
        },
    } = useDojo();

    const navigate = useNavigate();

    const setGameQueryParam = (id: string) => {
        navigate('?game=' + id, { replace: true });
    };

    const game = useComponentValue(Game, entity);

    return (
        <div className="p-4 bg-dirt-300">
            <div className="flex space-x-2 py-1">
                <Button
                    onClick={() => {
                        setGameQueryParam(game.game_id.toString());
                    }}
                >
                    Game: {game.game_id}
                </Button>
            </div>
        </div>
    );
};
