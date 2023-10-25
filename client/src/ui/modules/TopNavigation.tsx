import { Button } from "@/ui/elements/button";
import { useDojo } from "../../DojoContext"
import { getEntityIdFromKeys } from "@/dojo/createSystemCalls";
import { useComponentValue } from "@dojoengine/react";
import { useQueryParams } from "@/dojo/useQueryParams";
import { shortString } from "starknet";
import { GOLD_ID } from "@/dojo/gameConfig";
import { useSync } from "@/hooks/useSync";

export const TopNavigation = () => {
    const { clear, game_id } = useQueryParams();

    const {
        setup: {
            components: { ItemBalance, Player },
        },
        account: { account }
    } = useDojo();

    let entityId = getEntityIdFromKeys([BigInt(game_id), BigInt(account.address), BigInt(GOLD_ID)]);

    const gold_balance = useComponentValue(ItemBalance, entityId);
    const player = useComponentValue(Player, entityId);

    useSync(ItemBalance, [BigInt(game_id), BigInt(account.address), BigInt(GOLD_ID)])
    useSync(Player, [BigInt(game_id), BigInt(account.address), BigInt(GOLD_ID)])

    return (<>

        <div className="flex justify-between">
            <h5>Game {game_id}</h5>
            <div className="flex">
                <img className="w-8 mr-3" src={'/images/people/monk_head.png'} alt="" />
                <h5>{shortString.decodeShortString(player?.name.toString() || '0')}</h5>
            </div>

            <div className="flex">
                <img className="w-8 mr-3" src={'/images/items/purse/purse.png'} alt="" />
                <h5>Gold: {gold_balance?.balance}</h5>
            </div>

            <Button size={'sm'} variant={'ghost'} onClick={clear}>Lobby</Button>
        </div>

    </>)
}