import { useEffect, useState } from "react";
import { AuctionPrice } from "../components/AuctionPrice.tsx"
import { useDojo } from "@/DojoContext.tsx";
import { Button } from "@/components/ui/button.tsx";

enum Hops {
    Cintra = 1,
    Chinook = 2,
    Galaxy = 3,
}

const game_id = 1;

const useHopPricePolling = (hopType: Hops) => {
    const { setup: { systemCalls: { view_hop_price } } } = useDojo();
    const [price, setPrice] = useState<number | undefined>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            view_hop_price(game_id, hopType)
                .then(price => setPrice(price))
                .catch(error => console.error('Error fetching hop price:', error));
        }, 5000);

        return () => clearInterval(interval);
    }, [hopType]);

    return price;
}

const HopPriceDisplay = ({ hopType }: { hopType: Hops }) => {
    const { setup: { systemCalls: { buy_hops } }, account: { account } } = useDojo();
    const price = useHopPricePolling(hopType);

    console.log(price)

    return (
        <div className="flex">
            <strong>{Hops[hopType]}</strong>: ${price?.toFixed(4)} <Button onClick={() => buy_hops(account, game_id, 1, 1)}>Buy</Button>
        </div>
    );
}


export const HopMarket = () => {
    return (
        <>
            <h4>Hop Market</h4>
            <HopPriceDisplay hopType={Hops.Cintra} />
            <HopPriceDisplay hopType={Hops.Galaxy} />
            <HopPriceDisplay hopType={Hops.Chinook} />
        </>
    )
}