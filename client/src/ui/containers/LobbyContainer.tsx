import { useEntityQuery } from "@dojoengine/react";
import { useDojo } from "../../DojoContext"
import { Button } from "@/components/ui/button"
import { HasValue } from "@latticexyz/recs";
import { useNavigate } from 'react-router-dom';

export const LobbyContainer = () => {
    const navigate = useNavigate();
    const {
        setup: {
            systemCalls: { create_game, join_game, start_game },
            components: { Game },
        },
        account: { account }
    } = useDojo();

    const name = 'loaf';

    let lobby_games = useEntityQuery([HasValue(Game, { status: 0 })]);

    let active_games = useEntityQuery([HasValue(Game, { status: 1 })]);

    const setGameQueryParam = (id: string) => {
        navigate('?game=' + id, { replace: true });
    };

    return <div className="fixed h-screen w-screen bg-blue-200 p-20">
        <div>
            <h1>Beer Barron</h1>
            <h4>Barron: {account.address}</h4>
            <div className="flex flex-col w-32 space-y-2">
                <Button onClick={() => create_game({ account })}>Create Game</Button>

            </div>
            <div className="mt-8">
                <h5>Lobby</h5>
                <div className="p-4 border">
                    {lobby_games.map((game_id, index) => {
                        return <div key={index} className="flex space-x-2 py-1">
                            <Button onClick={() => {
                                join_game({ account, game_id, name })
                                // setGameQueryParam(game_id.toString())
                            }}>
                                Join Game: ID {game_id}
                            </Button>
                            <Button variant={'secondary'} onClick={() => start_game({ account, game_id })}>
                                Start Game
                            </Button>
                        </div>
                    })}
                </div>
            </div>
            <div className="mt-8">
                <h5>Your Live Games</h5>
                <div className="p-4 border">
                    {active_games.map((game_id, index) => {
                        return <div key={index} className="flex space-x-2 py-1">
                            <Button onClick={() => {
                                setGameQueryParam(game_id.toString())
                            }}>
                                View game {game_id}
                            </Button>
                        </div>
                    })}
                </div>
            </div>
        </div>

    </div>
}