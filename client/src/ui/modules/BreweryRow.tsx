import { useDojo } from '@/dojo/useDojo';
import { BeerCard } from '../components/BeerCard';
import { useEntityQuery } from '@dojoengine/react';
import { HasValue } from '@dojoengine/recs';
import { useQueryParams } from '@/dojo/useQueryParams';

export const BreweryRow = () => {
    const {
        setup: {
            clientComponents: { Brew },
        },
        account: { account },
    } = useDojo();

    const { game_id } = useQueryParams();

    const active_brews = useEntityQuery([HasValue(Brew, { game_id, owner: BigInt(account.address), status: 1 })]);

    return (
        <div>
            <div className="uppercase text-dirt-100">Batches</div>
            <div className="grid grid-cols-2 gap-3">
                {active_brews.map((value: any, index: any) => {
                    return <BeerCard key={index} entity_id={value} />;
                })}
            </div>
        </div>
    );
};
