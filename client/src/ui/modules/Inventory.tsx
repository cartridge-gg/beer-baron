import { useDojo } from "../../DojoContext"
import { getEntityIdFromKeys } from "@/dojo/createSystemCalls";
import { useComponentValue } from "@dojoengine/react";
import { Hops, Beers, Flowers, FlowerImages, BeerImages, HopImages, BeerNames } from "@/dojo/gameConfig.ts";
import { useQueryParams } from "@/dojo/useQueryParams";

import { useSync } from "@/hooks/useSync";

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
        <div>
            <h3>Inventory</h3>
            <div className="my-3">
                <h5>Hop Seeds</h5>
                {Object.values(Hops).filter(value => typeof value === 'number').map(item => {
                    useSync(ItemBalance, [BigInt(game_id), BigInt(account.address), BigInt(item)])
                    return <div key={item} className="flex py-1">
                        <img className="w-8" src={HopImages[item as keyof typeof HopImages]} alt="" />
                        <h6> {(Hops as any)[item]}: {getItemBalance(item as string)} seeds</h6>
                    </div>
                })}
            </div>
            <hr />
            <div className="my-3">
                <h5>Hop Flowers</h5>
                {Object.values(Flowers).filter(value => typeof value === 'number').map(item => {
                    useSync(ItemBalance, [BigInt(game_id), BigInt(account.address), BigInt(item)])
                    return <div key={item} className="flex  py-1">
                        <img className="w-8" src={FlowerImages[item as keyof typeof FlowerImages]} alt="" />
                        <h6>{(Flowers as any)[item]}: {getItemBalance(item as string)} flowers</h6>

                    </div>
                })}
            </div>

            <hr />
            <div className="my-3">
                <h5>Beer</h5>
                {Object.values(Beers).filter(value => typeof value === 'number').map(item => {
                    useSync(ItemBalance, [BigInt(game_id), BigInt(account.address), BigInt(item)])
                    return <div key={item} className="flex py-1">
                        <img className="w-8" src={BeerImages[item as keyof typeof BeerImages]} alt="" />
                        <h6> {(BeerNames as any)[item]}: {getItemBalance(item as string)} litres</h6>
                    </div>
                }
                )}
            </div>
        </div>
    );
}

