import { useQueryParams } from '@/dojo/useQueryParams';
import { useDojo } from '@/dojo/useDojo';
import { useState } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/ui/elements/table';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/ui/elements/select';
import { IndulgenceRow } from '../components/IndulgenceRow';
import { TradeStatus } from '@/dojo/gameConfig';
import { Button } from '../elements/button';
import { useEntityQuery } from '@dojoengine/react';
import { Has, HasValue } from '@dojoengine/recs';

export const IndulgenceAuctionTable = () => {
    const {
        setup: {
            systemCalls: { increment_indulgences_auction },
            graphSdk,
            clientComponents: { IndulgenceAuction },
        },
        account: { account },
    } = useDojo();

    const [tradeStatus, setTradeStatus] = useState<TradeStatus>(TradeStatus.Open);
    const { game_id } = useQueryParams();

    const indulgenceList = useEntityQuery([Has(IndulgenceAuction), HasValue(IndulgenceAuction, { status: tradeStatus, game_id })]);

    return (
        <div>
            <div className="flex justify-between mb-4">
                <div className="uppercase self-center">Bids</div>
                <Select onValueChange={(value) => setTradeStatus(parseInt(value))}>
                    <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup defaultValue={TradeStatus.Open.toString()}>
                            <SelectItem value={TradeStatus.Open.toString()}>Open</SelectItem>
                            <SelectItem value={TradeStatus.Accepted.toString()}>Won</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button onClick={() => increment_indulgences_auction({ account, game_id })}>new</Button>
            </div>
            <Table className=" text-dirt-100">
                <TableHeader>
                    <TableRow className="">
                        <TableHead>Expiry</TableHead>
                        {/* <TableHead>ID</TableHead> */}
                        <TableHead>Price</TableHead>
                        <TableHead>Holder</TableHead>

                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {indulgenceList.map((entity: any, index: number) => {
                        return <IndulgenceRow entity={entity} key={index} />;
                    })}
                </TableBody>
            </Table>
        </div>
    );
};
