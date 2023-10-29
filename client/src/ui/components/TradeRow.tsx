import { useDojo } from "@/DojoContext";
import { Entity, Trade } from "@/generated/graphql";
import { TableCell, TableRow } from "../elements/table";
import { TradeStatus, TradeStatusTitles } from "@/dojo/gameConfig";
import { shortenHex } from "@/utils";
import { Button } from "../elements/button";
import { Maybe } from "graphql/jsutils/Maybe";
import { ImagePaths, Seeds } from "./ItemCard";
import Coin from "../../icons/coin.svg?react"

import { num } from "starknet"
import { useQueryParams } from "@/dojo/useQueryParams";

export const TradeRow = ({ trade }: { trade: Maybe<Entity> | undefined }) => {

    const trade_model = trade?.models?.find((m) => m?.__typename == 'Trade') as Trade;

    const { game_id } = useQueryParams();

    const {
        setup: {
            systemCalls: { accept_trade },
        },
        account: { account }
    } = useDojo();

    return (
        <TableRow className=" m-1 text-white">
            <TableCell>
                <div className="w-8">
                    {ImagePaths[parseInt(num.hexToDecimalString(trade_model?.item_id)) as Seeds]}
                </div>

            </TableCell>
            <TableCell>{num.hexToDecimalString(trade_model?.quantity)}</TableCell>
            <TableCell>
                <div className="flex space-x-2">
                    <Coin className="self-center mr-1 h-6" />
                    <span className="self-center">{num.hexToDecimalString(trade_model?.price)}</span>
                </div>
            </TableCell>
            <TableCell>{TradeStatusTitles[trade_model?.status as TradeStatus]}</TableCell>
            <TableCell>{shortenHex(trade_model?.player_id)}</TableCell>
            <TableCell>
                <Button onClick={() => accept_trade({ account, game_id, trade_id: trade_model.entity_id })} >accept</Button>
            </TableCell>
        </TableRow>
    )
}