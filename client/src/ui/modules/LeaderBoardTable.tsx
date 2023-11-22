import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui/elements/table';
import { useEffect, useState } from 'react';
import { GOLD_ID, GameStatus, INDULGENCE_ID } from '@/dojo/gameConfig';
import { useDojo } from '@/DojoContext';
import { useQueryParams } from '@/dojo/useQueryParams';
import { shortenHex } from '@/utils';

export const LeaderBoardTable = () => {
    const { game_id } = useQueryParams();

    const [leaderboard, setLeaderBoard] = useState<any | undefined[]>([]);

    const {
        setup: {
            network: { graphSdk },
        },
    } = useDojo();

    // TODO: use ws to update leaderboard

    useEffect(() => {
        let intervalId;
        const games = async () => {
            const {
                data: { itembalanceModels, playerModels },
            } = await graphSdk.getAllBalancesForGame({ game_id: game_id });

            const playerBalances = new Map();

            itembalanceModels.edges.forEach(({ node }) => {
                const { player_id, item_id, balance } = node;
                if (!playerBalances.has(player_id)) {
                    playerBalances.set(player_id, { player_id, gold: 0, indulgences: 0 });
                }
                const playerBalance = playerBalances.get(player_id);
                if (item_id === INDULGENCE_ID) {
                    playerBalance.indulgences += balance;
                } else if (item_id === GOLD_ID) {
                    playerBalance.gold += balance;
                }
                playerBalances.set(player_id, playerBalance);
            });

            const balanceArray = Array.from(playerBalances.values());

            console.log(balanceArray);
            setLeaderBoard(balanceArray);
        };

        games();
        intervalId = setInterval(games, 5000);

        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="p-4 border border-beer-100 text-dirt-100">
            <div className=" overflow-auto">
                <Table className=" text-dirt-100">
                    <TableHeader>
                        <TableRow className="">
                            <TableHead className="w-[100px]">Player</TableHead>
                            <TableHead>Indulgences</TableHead>
                            <TableHead>Gold</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leaderboard.map((leaderboard: any, index: number) => {
                            return (
                                <TableRow key={index} className="m-1">
                                    <TableCell>{shortenHex(leaderboard.player_id)}</TableCell>
                                    <TableCell>{leaderboard.indulgences}</TableCell>
                                    <TableCell>{leaderboard.gold}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
