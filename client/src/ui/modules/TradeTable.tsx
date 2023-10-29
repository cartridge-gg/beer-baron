import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/ui/elements/table';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/ui/elements/select';
import { useEffect, useState } from 'react';
import { TradeStatus } from '@/dojo/gameConfig';
import { useDojo } from '@/DojoContext';
import { TradeEdge } from '@/generated/graphql';
import { useEntityQuery } from '@latticexyz/react';
import { HasValue } from '@latticexyz/recs';
import { TradeRow } from '../components/TradeRow';
import { CreateTrade } from './CreateTrade';
import { useQueryParams } from '@/dojo/useQueryParams';

export const TradeTable = () => {
    const [gamesList, setGamesList] = useState<any | undefined[]>([]);
    const [tradeStatus, setTradeStatus] = useState<TradeStatus>(TradeStatus.Open);
    const {
        setup: {
            components: { Trade },
            network: { graphSdk },
        },
    } = useDojo();

    const { game_id } = useQueryParams();

    const games = async () => {
        const {
            data: { tradeModels },
        } = await graphSdk.getTrades({ game_id, status: tradeStatus });
        return setGamesList(tradeModels?.edges);
    };

    const open_trades = useEntityQuery([HasValue(Trade, { status: TradeStatus.Open, game_id_value: game_id })]);

    const accepted_trades = useEntityQuery([HasValue(Trade, { status: TradeStatus.Accepted, game_id_value: game_id })]);

    const cancelled_trades = useEntityQuery([HasValue(Trade, { status: TradeStatus.Cancelled, game_id_value: game_id })]);

    useEffect(() => {
        games();
    }, [open_trades.length, tradeStatus, accepted_trades.length, cancelled_trades.length]);

    return (
        <div>
            <div className="flex justify-between mb-2">
                <CreateTrade />

                <Select onValueChange={(value) => setTradeStatus(parseInt(value))}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup defaultValue={TradeStatus.Open.toString()}>
                            <SelectItem value={TradeStatus.Open.toString()}>Open</SelectItem>
                            <SelectItem value={TradeStatus.Accepted.toString()}>Accepted</SelectItem>
                            <SelectItem value={TradeStatus.Cancelled.toString()}>Cancelled</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="overflow-auto">
                <Table className=" text-dirt-100">
                    <TableHeader>
                        <TableRow className="">
                            <TableHead>Item</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Seller</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {gamesList.map((trade: TradeEdge, index: number) => {
                            return <TradeRow trade={trade.node?.entity} key={index} />;
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
