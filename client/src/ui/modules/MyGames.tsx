import { useEntityQuery } from '@latticexyz/react';
import { useDojo } from '../../DojoContext';
import { Button } from '@/ui/elements/button';
import { HasValue } from '@latticexyz/recs';
import { useNavigate } from 'react-router-dom';

export const MyGames = () => {
    const navigate = useNavigate();

    const {
        setup: {
            components: { Game },
        },
    } = useDojo();

    const setGameQueryParam = (id: string) => {
        navigate('?game=' + id, { replace: true });
    };

    const active_games = useEntityQuery([HasValue(Game, { status: 3 })]);

    return (
        <div className="mt-8">
            <div className="uppercase mb-4">My Games</div>
            <div className="border border-dirt-300 p-2 text-center">
                {active_games.length
                    ? active_games.map((game_id, index) => {
                          return (
                              <div key={index} className="p-4 bg-dirt-300">
                                  <div key={index} className="flex space-x-2 py-1">
                                      <Button
                                          onClick={() => {
                                              setGameQueryParam(game_id.toString());
                                          }}
                                      >
                                          View game {game_id}
                                      </Button>
                                  </div>
                              </div>
                          );
                      })
                    : 'you are not in any games'}
            </div>
        </div>
    );
};
