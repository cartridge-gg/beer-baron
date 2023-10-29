import { useEffect, useState } from "react";
import { useDojo } from "@/DojoContext.tsx";
import { useQueryParams } from "@/dojo/useQueryParams";
import { Beers, Flowers, Seeds } from "../ui/components/ItemCard";

export const usePricePolling = (item_id: Flowers | Seeds | Beers) => {
    const [price, setPrice] = useState<number | undefined>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { game_id } = useQueryParams();
    const { setup: { systemCalls: { view_hop_price, view_beer_price } } } = useDojo();

    useEffect(() => {

        setIsLoading(true);

        const interval = setInterval(() => {
            if (item_id > 1000)
                view_beer_price({ game_id, item_id })
                    .then(price => {
                        setPrice(price);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.error('Error fetching hop price:', error);
                        setIsLoading(false);
                    });
            else if (item_id < 100)
                view_hop_price({ game_id, item_id })
                    .then(price => {
                        setPrice(price);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.error('Error fetching hop price:', error);
                        setIsLoading(false);
                    });

        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [item_id]);

    return { price, isLoading };  // Return both the price and loading state
}
