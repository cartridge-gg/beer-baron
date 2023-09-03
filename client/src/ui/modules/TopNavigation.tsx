import { Button } from "@/components/ui/button";
import { useDojo } from "../../DojoContext"
import { getEntityIdFromKeys } from "@/dojo/createSystemCalls";
import { useComponentValue } from "@dojoengine/react";
import { useQueryParams } from "@/dojo/useQueryParams";
import { shortString } from "starknet";

export const TopNavigation = () => {
    const { clear, game_id } = useQueryParams();

    const {
        setup: {
            components: { GoldBalance, Player },
        },
        account: { account }
    } = useDojo();

    let entityId = getEntityIdFromKeys([BigInt(game_id), BigInt(account.address)]);

    const gold_balance = useComponentValue(GoldBalance, entityId);
    const player = useComponentValue(Player, entityId);

    return (<>

        <div className="flex justify-between">
            <div>Game {game_id}</div>
            <div>{shortString.decodeShortString(player?.name.toString() || '0')}</div>
            <div>Shekles: {gold_balance?.balance}</div>
            <Button size={'sm'} variant={'ghost'} onClick={clear}>Lobby</Button>
        </div>

    </>)
}