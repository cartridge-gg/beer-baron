import { useEffect, useState } from "react";
import { useDojo } from "@/DojoContext.tsx";
import { Button } from "@/components/ui/button.tsx";
import { BeerNames, Beers } from "@/dojo/gameConfig.ts";
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
    const { setup: { systemCalls: { sell_beer } }, account: { account } } = useDojo();
    const price = useHopPricePolling(beerType);

    const { game_id } = useQueryParams();

    const beer_id = beerType;

    const amount = 1;


    return (
        <div className="flex justify-between py-2 border-t border-b">
            <div className="self-center flex">
                <h5 className="self-center" >{BeerNames[beerType]}:</h5>
                <div className={`self-center px-3`}>{price?.toFixed(4)}</div>
            </div>
            <Button variant={'outline'} size={'sm'} className="ml-2 self-center" onClick={() => sell_beer({ account, game_id, beer_id: beer_id - 1000, amount })}>Sell</Button>
        </div>
    );
}


export const BeerMarket = () => {
    return (
        <>
            <h3>Beer Market</h3>
            {Object.values(Beers).filter(value => typeof value === 'number').map((beerType) => (
                <HopPriceDisplay key={beerType} beerType={beerType as Beers} />
            ))}
        </>
    );
}