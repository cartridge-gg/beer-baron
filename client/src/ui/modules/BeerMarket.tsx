import { useEffect, useState } from "react";
import { useDojo } from "@/DojoContext.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Beers } from "@/dojo/gameConfig.ts";
import { useQueryParams } from "@/dojo/useQueryParams.ts";

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
    const { setup: { systemCalls: { buy_hops } }, account: { account } } = useDojo();
    const price = useHopPricePolling(beerType);

    const { game_id } = useQueryParams();

    const item_id = beerType;

    const amount = 1;

    return (
        <div className="flex">
            <strong>{Beers[beerType]}</strong>: ${price?.toFixed(2)} p/l
            <Button size={'sm'} className="ml-2 self-center" onClick={() => buy_hops({ account, game_id, item_id, amount })}>Sell</Button>
        </div>
    );
}


export const BeerMarket = () => {
    return (
        <>
            <h4>Beer Market</h4>
            <HopPriceDisplay beerType={Beers.DragonHideBlaze} />
            <HopPriceDisplay beerType={Beers.MithralHaze} />
        </>
    )
}