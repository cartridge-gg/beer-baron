import { useDojo } from '@/DojoContext';
import { BeerCard } from '../components/BeerCard';
import { useEntityQuery } from '@latticexyz/react';
import { HasValue } from '@dojoengine/recs';

export const BreweryRow = () => {
    const {
        setup: {
            components: { Brew },
        },
        account: { account },
    } = useDojo();

    const active_brews = useEntityQuery([HasValue(Brew, { owner: account.address, status: 1 })]);
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
