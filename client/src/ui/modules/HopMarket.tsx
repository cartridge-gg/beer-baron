import { useEffect, useState } from "react";
import { useDojo } from "@/DojoContext.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Hops } from "@/dojo/gameConfig.ts";
import { useQueryParams } from "@/dojo/useQueryParams";

const useHopPricePolling = (hopType: Hops) => {
    const { setup: { systemCalls: { view_hop_price } } } = useDojo();
    const [price, setPrice] = useState<number | undefined>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Initialize loading state

    const { game_id } = useQueryParams();

    useEffect(() => {
        // Set loading to true when starting polling
        setIsLoading(true);

        const interval = setInterval(() => {
            view_hop_price({ game_id, item_id: hopType })
                .then(price => {
                    setPrice(price);
                    setIsLoading(false); // Set loading to false when data is fetched successfully
                })
                .catch(error => {
                    console.error('Error fetching hop price:', error);
                    setIsLoading(false); // Set loading to false even if there's an error
                });
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [hopType]);

    return { price, isLoading };  // Return both the price and loading state
}

const HopPriceDisplay = ({ hopType }: { hopType: Hops }) => {
    const { setup: { systemCalls: { buy_hops } }, account: { account } } = useDojo();
    const { price, isLoading } = useHopPricePolling(hopType);
    const { game_id } = useQueryParams();

    return (
        <div className="flex justify-between py-2 border-t border-b">
            <div className="self-center flex">

                <h5 className="self-center" >{Hops[hopType]}:</h5>
                <div className={`self-center px-3 ${isLoading ?? 'animate-pulse'}`}>{price?.toFixed(4)}</div>
            </div>
            <Button size={'sm'} variant={'outline'} onClick={() => buy_hops({ account, game_id, item_id: hopType, amount: 1 })}>Buy</Button>
        </div>
    );
}


export const HopMarket = () => {
    return (
        <>
            <h3>Hop Market</h3>
            <HopPriceDisplay hopType={Hops.Cintra} />
            <HopPriceDisplay hopType={Hops.Galaxy} />
            <HopPriceDisplay hopType={Hops.Chinook} />
        </>
    )
}