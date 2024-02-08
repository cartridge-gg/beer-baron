import { TableCell, TableRow } from '../elements/table';
import Coin from '../../icons/coin.svg?react';
import { Button } from '../elements/button';
import { useQueryParams } from '@/dojo/useQueryParams';
import { useDojo } from '@/dojo/useDojo';
import { Maybe } from 'graphql/jsutils/Maybe';
import { IndulgenceAuction, World__Entity } from '@/generated/graphql';
import { shortenHex } from '@/utils';
import useTimeRemaining from '@/dojo/useTimeRemaining';
import { Input } from '../elements/input';
import { useState } from 'react';
import { TradeStatus } from '@/dojo/gameConfig';
import { useComponentValue } from '@dojoengine/react';
import { getEntityIdFromKeys } from '@dojoengine/utils';
import { num, shortString } from 'starknet';

export const IndulgenceRow = ({ entity }: any) => {
    const { game_id } = useQueryParams();
    const {
        setup: {
            systemCalls: { place_indulgences_bid, claim_indulgence },
            clientComponents: { IndulgenceAuction, Player },
        },
        account: { account },
    } = useDojo();

    const indulgence_auction_model = useComponentValue(IndulgenceAuction, entity);

    const player = useComponentValue(Player, getEntityIdFromKeys([BigInt(game_id), BigInt(indulgence_auction_model.highest_bid_player_id)]));

    const { getTimeRemaining, timeRemaining } = useTimeRemaining(indulgence_auction_model.expiry);

    const finished = timeRemaining <= 0;
    const claimed = indulgence_auction_model.status == TradeStatus.Accepted;
    const isOwner = account.address == indulgence_auction_model.highest_bid_player_id;

    const pricePlusOne = parseInt(indulgence_auction_model.price) + 1;
    const [newPrice, setNewPrice] = useState<number>(pricePlusOne);

    return (
        <TableRow className=" m-1 text-white">
            <TableCell>{getTimeRemaining() < '0' ? 'finished' : getTimeRemaining()}</TableCell>
            {/* <TableCell>{indulgence_auction_model.auction_id}</TableCell> */}
            <TableCell>
                <div className="flex space-x-2">
                    <Coin className="self-center mr-1 h-6" />
                    <span className="self-center">{indulgence_auction_model.price}</span>
                </div>
            </TableCell>
            <TableCell>{isOwner ? 'you!' : shortString.decodeShortString(player?.name || 0)}</TableCell>

            <TableCell>
                {!finished && (
                    <div className="flex ml-auto space-x-1">
                        <Coin className="w-4" />
                        <Input
                            className="w-12 bg-dirt-300/90"
                            min={indulgence_auction_model.price.toString()}
                            type="number"
                            placeholder={newPrice.toString()}
                            name="new_price"
                            value={newPrice}
                            onChange={(event) => setNewPrice(parseInt(event.target.value))}
                        />
                        <Button variant="outline" onClick={() => place_indulgences_bid({ account, game_id, price: newPrice })}>
                            place bid
                        </Button>
                    </div>
                )}

                {isOwner && finished && !claimed && (
                    <Button variant="outline" onClick={() => claim_indulgence({ account, game_id })}>
                        Claim!
                    </Button>
                )}
            </TableCell>
        </TableRow>
    );
};
