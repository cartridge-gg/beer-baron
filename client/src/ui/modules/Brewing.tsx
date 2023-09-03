import { useDojo } from "@/DojoContext";
import { Button } from "@/components/ui/button";
import { getEntityIdFromKeys } from "@/dojo/createSystemCalls";
import { BREW_TIME, BeerImages, BeerNames, Beers, Flowers, beerRecipes } from "@/dojo/gameConfig";
import { useQueryParams } from "@/dojo/useQueryParams";
import useTimeRemaining from "@/dojo/useTimeRemaining";
import { useComponentValue, useEntityQuery } from "@dojoengine/react";
import { EntityIndex, HasValue } from "@latticexyz/recs";

export const Brewing = () => {
    const { game_id } = useQueryParams();

    const { setup: { systemCalls: { brew_beer }, components: { ItemBalance, Brew } }, account: { account } } = useDojo();

    // TODO: Generalise this and put into hook
    const getItemBalance = (item: string) => {
        let entityId = getEntityIdFromKeys([BigInt(game_id), BigInt(account.address), BigInt(item)]);
        return useComponentValue(ItemBalance, entityId)?.balance || 0;
    }

    let active_brews = useEntityQuery([HasValue(Brew, { owner: Number(account.address), status: 1 })]);

    return (
        <div className="flex justify-between">
            <div>
                <h4>Brewing</h4>
                {Object.values(Beers).filter(value => typeof value === 'number').map(beerId => (
                    <div key={beerId} className="py-1 p-2 flex">
                        <div className="border-4 border-white/20 p-2 w-72 rounded-xl">
                            <h5>{(BeerNames as any)[beerId]}</h5>

                            {beerRecipes[beerId as Beers].map(({ hop, quantity }, idx) => (
                                <div key={idx} className="flex justify-between">
                                    {Flowers[hop]}: {quantity} <span>({getItemBalance(hop.toString())})</span>
                                </div>
                            ))}

                            <Button variant={'outline'} size={'sm'} onClick={() => brew_beer({ account, game_id, beer_id: beerId as number - 1000 })}>Brew</Button>
                        </div>

                    </div>
                ))}

            </div>

            <div>
                <h4>Beer Batches</h4>

                {active_brews.map((value, index) => {
                    return <div key={index} className="flex space-x-2 py-1">
                        <ActiveBrew entity_id={value} />
                    </div>
                })}

            </div>

        </div>
    )
}



const ActiveBrew = ({ entity_id }: any) => {
    const { game_id } = useQueryParams();
    const { setup: { systemCalls: { bottle_beer }, components: { Brew } }, account: { account } } = useDojo();

    const brew = useComponentValue(Brew, entity_id.entity_id);

    const { getTimeRemaining, timeRemaining } = useTimeRemaining(brew?.time_built, BREW_TIME);

    return (
        <div className="p-2 border-4 rounded-xl border-white/20 w-72">
            <div className="flex mb-3">
                <div className="w-8">
                    <img className="w-8" src={BeerImages[brew?.beer_id! + 1000 as keyof typeof BeerImages]} alt="" />
                </div>

                <h5>{(BeerNames as any)[brew?.beer_id! + 1000]}</h5>

            </div>


            <div>
                {timeRemaining && timeRemaining > 0 ? (
                    <span className='text-xs mb-2'>Bottle: {getTimeRemaining()}</span>
                ) : (
                    <Button variant={'outline'} size={'sm'} onClick={() => bottle_beer({ account, game_id, beer_id: brew?.beer_id! as any, batch_id: brew?.batch_key! })}>
                        Bottle Batch
                    </Button>
                )}
            </div>


        </div>
    )
}