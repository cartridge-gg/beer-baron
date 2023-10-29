import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/ui/elements/table';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/ui/elements/select';
import { useEffect, useState } from 'react';
import { GameStatus } from '@/dojo/gameConfig';
import { useDojo } from '@/DojoContext';
import { GameEdge } from '@/generated/graphql';
import { GameRow } from './GameRow';
import { useEntityQuery } from '@dojoengine/react';
import { HasValue } from '@latticexyz/recs';

export const GamesTable = () => {
    const [gamesList, setGamesList] = useState<any | undefined[]>([]);
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Lobby);
    const {
        setup: {
            components: { Game },
            network: { graphSdk },
        },
    } = useDojo();

    const active_games = useEntityQuery([HasValue(Game, { status: GameStatus.Started })]);

    const new_games = useEntityQuery([HasValue(Game, { status: GameStatus.Created })]);

    const lobby_games = useEntityQuery([HasValue(Game, { status: GameStatus.Lobby })]);

    console.log(lobby_games.length);

    useEffect(() => {
        const games = async () => {
            const {
                data: { gameModels },
            } = await graphSdk.getGames({ status: gameStatus });
            return setGamesList(gameModels?.edges);
        };

        games();
    }, [gameStatus, active_games.length, new_games.length, lobby_games.length, graphSdk, gamesList]);

    return (
        <div className="mt-8 p-4">
            <div className="flex justify-between mb-2">
                <div className="uppercase">Open Games</div>
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

            <div className="h-96 overflow-auto">
                <Table className=" text-dirt-100">
                    <TableHeader>
                        <TableRow className="">
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
                    <TableBody>
                        {gamesList.map((game: GameEdge, index: number) => {
                            return <GameRow game={game.node?.entity} key={index} />;
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
