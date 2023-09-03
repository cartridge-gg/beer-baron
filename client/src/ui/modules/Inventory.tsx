import { useDojo } from "../../DojoContext"
import { getEntityIdFromKeys } from "@/dojo/createSystemCalls";
import { useComponentValue } from "@dojoengine/react";
import { Hops, Beers, Flowers } from "@/dojo/gameConfig.ts";
import { useQueryParams } from "@/dojo/useQueryParams";

export const Inventory = () => {
    const {
        setup: {
            components: { ItemBalance },
        },
        account: { account }
    } = useDojo();

    const { game_id } = useQueryParams();

    // This function retrieves the balance for a given hop number
    // TODO: Generalise this and put into hook
    const getItemBalance = (item: string) => {
        let entityId = getEntityIdFromKeys([BigInt(game_id), BigInt(account.address), BigInt(item)]);
        return useComponentValue(ItemBalance, entityId)?.balance || 0;
    }

    return (
        <div className="pt-10 border-t">
            <h4>Inventory</h4>

            <h5>Hop Seeds</h5>
            {Object.values(Hops).filter(value => typeof value === 'number').map(item => (
                <div key={item} className="flex justify-between py-1">
                    {(Hops as any)[item]}: {getItemBalance(item as string)} unitss
                </div>
            ))}
            <hr />
            <h5>Hop Flowers</h5>
            {Object.values(Flowers).filter(value => typeof value === 'number').map(item => (
                <div key={item} className="flex justify-between py-1">
                    {(Flowers as any)[item]}: {getItemBalance(item as string)} flowers
                </div>
            ))}
            <hr />
            <h5>Beer</h5>
            {Object.values(Beers).filter(value => typeof value === 'number').map(item => (
                <div key={item} className="flex justify-between py-1">
                    {(Beers as any)[item]}: {getItemBalance(item as string)} litres
                </div>
            ))}
        </div>
    );
}