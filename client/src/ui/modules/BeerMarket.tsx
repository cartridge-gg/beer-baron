import { useEffect, useState } from "react";
import { useDojo } from "@/DojoContext.tsx";
import { Button } from "@/components/ui/button.tsx";
import { BeerNames, Beers } from "@/dojo/gameConfig.ts";
import { useQueryParams } from "@/dojo/useQueryParams.ts";
import { getEntityIdFromKeys } from "@/dojo/createSystemCalls";
import { useComponentValue } from "@dojoengine/react";

const useHopPricePolling = (beerType: Beers) => {
    const { setup: { systemCalls: { view_beer_price } } } = useDojo();
    const [price, setPrice] = useState<number | undefined>(0);

    const { game_id } = useQueryParams();

    useEffect(() => {
        const interval = setInterval(() => {
            view_beer_price({ game_id, item_id: beerType })
                .then(price => setPrice(price))
                .catch(error => console.error('Error fetching hop price:', error));
        }, 5000);

        return () => clearInterval(interval);
    }, [beerType]);

    return price;
}

const HopPriceDisplay = ({ beerType }: { beerType: Beers }) => {
    const { setup: { systemCalls: { sell_beer }, components: { ItemBalance } }, account: { account } } = useDojo();
    const price = useHopPricePolling(beerType);

    const { game_id } = useQueryParams();

    const beer_id = beerType;

    const amount = 1;

    const getItemBalance = (item: string) => {
        let entityId = getEntityIdFromKeys([BigInt(game_id), BigInt(account.address), BigInt(item)]);
        return useComponentValue(ItemBalance, entityId)?.balance || 0;
    }

    return (
        <div className="flex justify-between py-2 border-t border-b">
            <div className="self-center flex">
                <h5 className="self-center" >{BeerNames[beerType]}:</h5>
                <div className={`self-center px-3`}>${price?.toFixed(4)}</div>
            </div>
            <Button variant={'outline'} size={'sm'} className="ml-2 self-center" onClick={() => sell_beer({ account, game_id, beer_id: beer_id - 1000, amount })}>Sell</Button>
        </div>
    );
}


export const BeerMarket = () => {
    return (
        <>
            <h3>Beer Market</h3>
            <HopPriceDisplay beerType={Beers.DragonHideBlaze} />
            <HopPriceDisplay beerType={Beers.MithralHaze} />
        </>
    )
}