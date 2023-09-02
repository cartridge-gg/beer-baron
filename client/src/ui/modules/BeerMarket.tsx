import { useEffect, useState } from "react";
import { AuctionPrice } from "../components/AuctionPrice.tsx"
import { useDojo } from "@/DojoContext.tsx";
import { Button } from "@/components/ui/button.tsx";

enum Beers {
    DragonHideBlaze = 1001,
    MithralHaze = 1002
}

const game_id = 1;

const useHopPricePolling = (hopType: Beers) => {
    const { setup: { systemCalls: { view_beer_price } } } = useDojo();
    const [price, setPrice] = useState<number | undefined>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            view_beer_price(game_id, hopType)
                .then(price => setPrice(price))
                .catch(error => console.error('Error fetching hop price:', error));
        }, 5000);

        return () => clearInterval(interval);
    }, [hopType]);

    return price;
}

const HopPriceDisplay = ({ hopType }: { hopType: Beers }) => {
    const { setup: { systemCalls: { buy_hops } }, account: { account } } = useDojo();
    const price = useHopPricePolling(hopType);

    console.log(price)

    return (
        <div className="flex">
            <strong>{Beers[hopType]}</strong>: ${price?.toFixed(2)} p/l
            {/* <Button size={'sm'} className="ml-2 self-center" onClick={() => buy_hops(account, game_id, 1, 1)}>Sell</Button> */}
        </div>
    );
}


export const BeerMarket = () => {
    return (
        <>
            <h4>Beer Market</h4>
            <HopPriceDisplay hopType={Beers.DragonHideBlaze} />
            <HopPriceDisplay hopType={Beers.MithralHaze} />
        </>
    )
}