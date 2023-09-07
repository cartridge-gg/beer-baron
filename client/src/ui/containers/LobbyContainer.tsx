import { useComponentValue, useEntityQuery } from "@dojoengine/react";
import { useDojo } from "../../DojoContext"
import { Button } from "@/components/ui/button"
import { HasValue } from "@latticexyz/recs";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { num } from "starknet";
import { Input } from "@/components/ui/input";

export const LobbyContainer = () => {
    const navigate = useNavigate();
    const {
        setup: {
            systemCalls: { create_game },
            components: { Game },
        },
        account: { account }
    } = useDojo();

    let lobby_games = useEntityQuery([HasValue(Game, { status: 2 })]);
    let active_games = useEntityQuery([HasValue(Game, { status: 3 })]);

    const setGameQueryParam = (id: string) => {
        navigate('?game=' + id, { replace: true });
    };

    const [formData, setFormData] = useState({
        max_players: 10,
        game_length: 6000,
        password: '1234',
        entry_fee: 0
    });

    // Event handler for form changes
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Event handler for form submission
    const handleSubmit = (event: any) => {
        event.preventDefault();
        create_game({ account, ...formData });
    };

    return <div className="fixed h-screen w-screen bg-tavern bg-cover p-20">
        <div className="bg-black p-8 text-white rounded-2xl">
            <h1>Beer Barron</h1>
            <h4>Barron: {account.address}</h4>
            <div className="flex flex-col w-32 space-y-2">
                <form className="" onSubmit={handleSubmit}>
                    <label>
                        Max Players:
                        <Input type="number" placeholder="Email" name="max_players" value={formData.max_players} onChange={handleInputChange} />
                    </label>
                    <label>
                        Game Length:
                        <Input type="number" name="game_length" value={formData.game_length} onChange={handleInputChange} />

                    </label>
                    <label>
                        Password:
                        <Input type="text" name="password" value={formData.password} onChange={handleInputChange} />

                    </label>
                    <label>
                        Entry Fee:
                        <Input type="number" name="entry_fee" value={formData.entry_fee} onChange={handleInputChange} />

                    </label>
                    <Button type="submit">Create Game</Button>
                </form>
            </div>
            <div className="mt-8">
                <h5>Lobby</h5>
                {lobby_games.length ? (
                    <div className="p-4 border">
                        {lobby_games.map((game_id, index) => {
                            return <GameCard game_id={game_id} key={index} />
                        })}
                    </div>
                ) : ''}

            </div>
            <div className="mt-8">
                <h5>Your Live Games</h5>

                {active_games.length ? (active_games.map((game_id, index) => {
                    return <div className="p-4 border"><div key={index} className="flex space-x-2 py-1">
                        <Button onClick={() => {
                            setGameQueryParam(game_id.toString())
                        }}>
                            View game {game_id}
                        </Button>
                    </div></div>
                })) : ''}

            </div>
        </div>

    </div>
}

export const GameCard = ({ game_id }: any) => {
    const {
        setup: {
            systemCalls: { join_game, start_game },
            components: { Game, Ownership },
        },
        account: { account }
    } = useDojo();

    const [name, setName] = useState('');

    const handleSelectChange = (e: any) => {
        setName(e.target.value)
    };

    const game = useComponentValue(Game, game_id);

    const ownership = useComponentValue(Ownership, game_id);

    const localStartTime = () => {
        return new Date(game?.start_time! * 1000).toLocaleString();
    }

    return <div>
        <h3>Game - {game_id}</h3>
        <h6>Players: {game?.number_players}</h6>
        <h6>Creation Time: {localStartTime()}</h6>
        <h6>Owner: {num.toHex(ownership?.owner || '')}</h6>
        <div className="flex space-x-2 py-1">
            <Button disabled={!name} onClick={() => {
                join_game({ account, game_id, name })
            }}>
                Join Game: ID {game_id}
            </Button>
            <input onChange={handleSelectChange} type="text" name="price" id="price" className="block  rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="name"></input>
            <Button disabled={game?.number_players == 0} variant={'secondary'} onClick={() => start_game({ account, game_id })}>
                Start Game
            </Button>
        </div>

    </div>
}