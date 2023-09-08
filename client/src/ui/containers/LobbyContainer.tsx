import { useComponentValue, useEntityQuery } from "@dojoengine/react";
import { useDojo } from "../../DojoContext"
import { Button } from "@/components/ui/button"
import { HasValue } from "@latticexyz/recs";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { num } from "starknet";
import { Input } from "@/components/ui/input";
import { Game, GameEdge } from "@/generated/graphql";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { localStartTime } from "@/utils";
import { GameStatus } from "@/dojo/gameConfig";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export const LobbyContainer = () => {
    const navigate = useNavigate();
    const {
        setup: {
            systemCalls: { create_game },
            components: { Game },
            network: { graphSdk }
        },
        account: { account }
    } = useDojo();

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

    const [gamesList, setGamesList] = useState<any[]>([])
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Lobby)

    const games = async () => {
        const { data: { gameComponents } } = await graphSdk.getGames({ status: gameStatus });

        console.log(gameComponents?.edges)
        return setGamesList(gameComponents?.edges!)
    }

    useEffect(() => {
        games()
    }, [gameStatus, active_games])

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
            <div className="mt-8 p-4 border border-white/20">
                <div className="flex justify-between mb-2">
                    <h5>Open Games</h5>
                    <Select onValueChange={(value) => setGameStatus(parseInt(value))}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup defaultValue={GameStatus.Lobby.toString()}>
                                <SelectItem value={GameStatus.Lobby.toString()}>Lobby</SelectItem>
                                <SelectItem value={GameStatus.Created.toString()}>Created</SelectItem>
                                <SelectItem value={GameStatus.Started.toString()}>Started</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="h-96 overflow-auto ">
                    <Table className="border border-white/20">
                        <TableHeader>
                            <TableRow className="border-white/20 border">
                                <TableHead className="w-[100px]">Game ID</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Entry Fee</TableHead>
                                <TableHead>Max Players</TableHead>
                                <TableHead>Number Players</TableHead>
                                <TableHead>Start Time</TableHead>
                                <TableHead>Game Length</TableHead>
                                <TableHead>Join</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody >
                            {gamesList.map((game: GameEdge, index: number) => {
                                return (
                                    <GameRow game={game.node!} key={index} />
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>

            </div>
            {/* <div className="mt-8">
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

            </div> */}
        </div>

    </div>
}

export const GameRow = ({ game }: { game: Game }) => {
    const navigate = useNavigate();

    const {
        setup: {
            systemCalls: { start_game, join_game },
            components: { Game },
            network: { graphSdk }
        },
        account: { account }
    } = useDojo();

    const [name, setName] = useState('');
    const handleSelectChange = (e: any) => {
        setName(e.target.value)
    };
    const setGameQueryParam = (id: string) => {
        navigate('?game=' + id, { replace: true });
    };


    return <TableRow className="border-white/20 border">
        <TableCell>{game.game_id}</TableCell>
        <TableCell>{GameStatus[game.status]}</TableCell>
        <TableCell>{game.entry_fee}</TableCell>
        <TableCell>{game.max_players}</TableCell>
        <TableCell>{game.number_players}</TableCell>
        <TableCell>{localStartTime(game.start_time)}</TableCell>
        <TableCell>{game.game_length / 60} minutes</TableCell>
        <TableCell className="flex space-x-2">

            {/* // TODO: Restrict to only joined games */}
            {game.status == GameStatus.Started.toString() &&
                (<Button onClick={() => {
                    setGameQueryParam(game.game_id.toString())
                }}>
                    View game {game.game_id}
                </Button>
                )
            }

            {game.status == GameStatus.Lobby.toString() &&
                <>
                    <Button disabled={!name} onClick={() => {
                        join_game({ account, game_id: game?.game_id, name })
                    }}>
                        Join Game
                    </Button>
                    <Input className="w-32" type="text" name="password" placeholder="enter name" value={name} onChange={handleSelectChange} />
                    <Button disabled={game?.number_players == 0} variant={'secondary'} onClick={() => start_game({ account, game_id: game.game_id })}>
                        Start Game
                    </Button>
                </>
            }

        </TableCell>
    </TableRow>
}


// export const GameCard = ({ game }: GameCardProps) => {
//     const {
//         setup: {
//             systemCalls: { join_game, start_game },
//             components: { Game, Ownership },
//         },
//         account: { account }
//     } = useDojo();

//     const [name, setName] = useState('');

//     const handleSelectChange = (e: any) => {
//         setName(e.target.value)
//     };

//     const game_id = game.game_id;

//     const ownership = useComponentValue(Ownership, game_id);

//     const localStartTime = (time: number) => {
//         return new Date(time * 1000).toLocaleString();
//     }

//     return <div className="border rounded p-4">
//         <h3>Game - {game_id}</h3>
//         <h6>Players: {game?.number_players}</h6>
//         {/* <h6>Creation Time: {localStartTime()}</h6> */}
//         <h6>Owner: {num.toHex(ownership?.owner || '')}</h6>
//         <div className="flex space-x-2 py-1">
//             <Button disabled={!name} onClick={() => {
//                 join_game({ account, game_id, name })
//             }}>
//                 Join Game: ID {game_id}
//             </Button>
//             <input onChange={handleSelectChange} type="text" name="price" id="price" className="block  rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="name"></input>
//             <Button disabled={game?.number_players == 0} variant={'secondary'} onClick={() => start_game({ account, game_id })}>
//                 Start Game
//             </Button>
//         </div>

//     </div>
// }