import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/ui/elements/table';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/ui/elements/select';
import { useState } from 'react';
import { GameStatus } from '@/dojo/gameConfig';
import { useDojo } from '@/dojo/useDojo';
import { GameRow } from './GameRow';
import { useEntityQuery } from '@dojoengine/react';
import { Has, HasValue } from '@dojoengine/recs';

export const GamesTable = () => {
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Lobby);
    const {
        setup: {
            graphSdk,
            clientComponents: { Game },
        },
    } = useDojo();

    const games = useEntityQuery([Has(Game), HasValue(Game, { status: GameStatus.Lobby })]);

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
                            {/* <SelectItem value={GameStatus.Created.toString()}>Created</SelectItem> */}
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
                            <TableHead>Fee</TableHead>
                            <TableHead>Max Barons</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead>Start</TableHead>
                            <TableHead>Length</TableHead>
                            <TableHead>Join</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {games.map((entity, index) => {
                            return <GameRow entity={entity} key={index} />;
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
