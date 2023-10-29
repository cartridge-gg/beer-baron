import { num } from 'starknet';
import { TableCell, TableRow } from '../elements/table';
import Coin from '../../icons/coin.svg?react';
import { Button } from '../elements/button';
import { useQueryParams } from '@/dojo/useQueryParams';
import { useDojo } from '@/DojoContext';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity, IndulgenceAuction } from '@/generated/graphql';
import { shortenHex } from '@/utils';
import useTimeRemaining from '@/dojo/useTimeRemaining';
import { Input } from '../elements/input';
import { useState } from 'react';
import { TradeStatus } from '@/dojo/gameConfig';

export const IndulgenceRow = ({ indulgence }: { indulgence: Maybe<Entity> | undefined }) => {
    const indulgence_auction_model = indulgence?.models?.find((m) => m?.__typename == 'IndulgenceAuction') as IndulgenceAuction;

    const { game_id } = useQueryParams();
    const {
        setup: {
            systemCalls: { place_indulgences_bid, claim_indulgence },
        },
        account: { account },
    } = useDojo();

    const { getTimeRemaining, timeRemaining } = useTimeRemaining(indulgence_auction_model.expiry);

    const finished = timeRemaining <= 0;
    const claimed = indulgence_auction_model.status == TradeStatus.Accepted;
    const isOwner = account.address == indulgence_auction_model.highest_bid_player_id;

    const pricePlusOne = parseInt(num.hexToDecimalString(indulgence_auction_model.price)) + 1;
    const [newPrice, setNewPrice] = useState<number>(pricePlusOne);

    return (
        <TableRow className=" m-1 text-white">
            <TableCell>{indulgence_auction_model.auction_id}</TableCell>
            <TableCell>
                <div className="flex space-x-2">
                    <Coin className="self-center mr-1 h-6" />
                    <span className="self-center">{num.hexToDecimalString(indulgence_auction_model.price)}</span>
                </div>
            </TableCell>
            <TableCell>{isOwner ? 'you!' : shortenHex(indulgence_auction_model.highest_bid_player_id)}</TableCell>
            <TableCell>{getTimeRemaining()}</TableCell>
            <TableCell>
                {!finished && (
                    <div className="flex ml-auto">
                        <Button onClick={() => place_indulgences_bid({ account, game_id, price: newPrice })}>place bid</Button>
                        <Input
                            className="w-12"
                            min={indulgence_auction_model.price.toString()}
                            type="number"
                            placeholder={newPrice.toString()}
                            name="new_price"
                            value={newPrice}
                            onChange={(event) => setNewPrice(parseInt(event.target.value))}
                        />
                    </div>
                )}

                {isOwner && finished && !claimed && <Button onClick={() => claim_indulgence({ account, game_id })}>claim</Button>}
            </TableCell>
        </TableRow>
    );
};
