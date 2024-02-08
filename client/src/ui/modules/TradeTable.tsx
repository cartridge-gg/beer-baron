import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/ui/elements/table';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/ui/elements/select';
import { useEffect, useState } from 'react';
import { TradeStatus } from '@/dojo/gameConfig';
import { useDojo } from '@/dojo/useDojo';
import { TradeEdge } from '@/generated/graphql';
import { TradeRow } from '../components/TradeRow';
import { useQueryParams } from '@/dojo/useQueryParams';

export const TradeTable = () => {
    const [tradeList, setTradeList] = useState<any | undefined[]>([]);
    const [tradeStatus, setTradeStatus] = useState<TradeStatus>(TradeStatus.Open);
    const {
        setup: { graphSdk },
    } = useDojo();

    const { game_id } = useQueryParams();

    useEffect(() => {
        const games = async () => {
            const {
                data: { tradeModels },
            } = await graphSdk.getTrades({ game_id, status: tradeStatus });
            return setTradeList(tradeModels?.edges);
        };
        games();
    }, [tradeList, tradeStatus]);

    return (
        <div>
            <div className="flex justify-between mb-2">
                {/* <CreateTrade /> */}

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
                            <TableHead>Qty</TableHead>
                            <TableHead>Price</TableHead>
                            {/* <TableHead>Status</TableHead> */}
                            <TableHead>Seller</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tradeList.map((trade: TradeEdge, index: number) => {
                            return <TradeRow trade={trade.node?.entity} key={index} />;
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
