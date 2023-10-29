import { useQueryParams } from '@/dojo/useQueryParams';
import { useDojo } from '@/DojoContext';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/ui/elements/table';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/ui/elements/select';
import { IndulgenceRow } from '../components/IndulgenceRow';
import { IndulgenceAuctionEdge } from '@/generated/graphql';
import { TradeStatus } from '@/dojo/gameConfig';
import { Button } from '../elements/button';
import { useComponentValue } from '@latticexyz/react';
import { HasValue } from '@latticexyz/recs';
import { getEntityIdFromKeys } from '@dojoengine/utils';

export const IndulgenceAuctionTable = () => {
    const {
        setup: {
            components: { IndulgenceAuction, IndulgenceAuctionCount },
            systemCalls: { increment_indulgences_auction },
        },
        account: { account },
    } = useDojo();
    const [indulgenceList, setIndulgenceList] = useState<any | undefined[]>([]);
    const [tradeStatus, setTradeStatus] = useState<TradeStatus>(TradeStatus.Open);
    const { game_id } = useQueryParams();
    const {
        setup: {
            network: { graphSdk },
        },
    } = useDojo();

    const indulgenceAuctionCount = useComponentValue(IndulgenceAuctionCount, getEntityIdFromKeys([BigInt(game_id)]))?.count || '0';

    const entityId = getEntityIdFromKeys([BigInt(game_id), BigInt(indulgenceAuctionCount)]);

    const indulgences = useComponentValue(IndulgenceAuction, entityId)?.price.toString() || 0;

    useEffect(() => {
        const indulgences = async () => {
            const {
                data: { indulgenceauctionModels },
            } = await graphSdk.getIndulgences({ game_id, status: tradeStatus });
            return setIndulgenceList(indulgenceauctionModels?.edges);
        };
        indulgences();
    }, [tradeStatus, indulgenceList, graphSdk, game_id, indulgences]);

    return (
        <div>
            <div className="flex justify-between mb-4">
                <div className="uppercase self-center">Bids</div>
                <Select onValueChange={(value) => setTradeStatus(parseInt(value))}>
                    <SelectTrigger className="w-[180px]">
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
                        <TableHead>ID</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Holder</TableHead>
                        <TableHead>Expiry</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {indulgenceList.map((trade: IndulgenceAuctionEdge, index: number) => {
                        return <IndulgenceRow indulgence={trade.node?.entity} key={index} />;
                    })}
                </TableBody>
            </Table>
        </div>
    );
};
