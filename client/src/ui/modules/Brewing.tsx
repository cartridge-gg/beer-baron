import { useDojo } from "@/DojoContext";
import { Button } from "@/components/ui/button";
import { getEntityIdFromKeys } from "@/dojo/createSystemCalls";
import { Beers, Flowers, beerRecipes } from "@/dojo/gameConfig";
import { useQueryParams } from "@/dojo/useQueryParams";
import useTimeRemaining from "@/dojo/useTimeRemaining";
import { useComponentValue, useEntityQuery } from "@dojoengine/react";
import { EntityIndex, HasValue } from "@latticexyz/recs";

export const Brewing = () => {
    const { game_id } = useQueryParams();

    const { setup: { systemCalls: { brew_beer, bottle_beer }, components: { ItemBalance, Brew } }, account: { account } } = useDojo();

    // TODO: Generalise this and put into hook
    const getItemBalance = (item: string) => {
        let entityId = getEntityIdFromKeys([BigInt(game_id), BigInt(account.address), BigInt(item)]);
        return useComponentValue(ItemBalance, entityId)?.balance || 0;
    }

    let entityId = getEntityIdFromKeys([BigInt(game_id), BigInt(account.address), BigInt(1)]);

    const brew = useComponentValue(Brew, entityId);

    // generalise
    const getTimeSinceStart = () => {
        if (!brew?.time_built) return null;
        const currentTimeInSeconds = Date.now() / 1000;
        const elapsedTimeInMinutes = (currentTimeInSeconds - brew?.time_built) / 60;
        return elapsedTimeInMinutes.toFixed(1) + " m";
    };


    let active_brews = useEntityQuery([HasValue(Brew, { owner: Number(account.address) })]);

    console.log('active_brews', active_brews)

    return (
        <div className="flex justify-between">
            <div>
                <h4>Brewing</h4>
                {Object.values(Beers).filter(value => typeof value === 'number').map(beerId => (
                    <div key={beerId} className="py-1 p-2 flex">
                        <div className="border p-2 w-48">
                            <div className="font-bold">{(Beers as any)[beerId]}</div>

                            <h6 className="text-xs">Recipe</h6>
                            {beerRecipes[beerId as Beers].map(({ hop, quantity }, idx) => (
                                <div key={idx} className="flex justify-between">
                                    {Flowers[hop]}: {quantity} <span>({getItemBalance(hop.toString())})</span>
                                </div>
                            ))}

                            <Button size={'sm'} onClick={() => brew_beer({ account, game_id, beer_id: beerId as number - 1000 })}>brew</Button>
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

const BREW_TIME = 1000000

const ActiveBrew = (entity_id: EntityIndex) => {
    const { game_id } = useQueryParams();

    const { setup: { systemCalls: { brew_beer, bottle_beer }, components: { Brew } }, account: { account } } = useDojo();
    const brew = useComponentValue(Brew, entity_id.entity_id);

    const { getTimeRemaining, timeRemaining } = useTimeRemaining(brew?.time_built, BREW_TIME);

    return <div className="p-2 border w-48">
        {(Beers as any)[brew?.beer_id! + 1000]}
        <br />
        {timeRemaining && timeRemaining > 0 ? (
            <span className='text-xs mb-2'>Harvest: {getTimeRemaining()}</span>
        ) : (
            <Button size={'sm'} onClick={() => bottle_beer({ account, game_id, beer_id: brew?.beer_id! + 1000 as any, batch_id: 1 })}>
                Bottle Batch
            </Button>
        )}
    </div>
}