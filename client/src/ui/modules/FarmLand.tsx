import { useDojo } from '@/DojoContext';
import { Button } from '@/components/ui/button';
import { getEntityIdFromKeys } from '@/dojo/createSystemCalls';
import { Hops } from '@/dojo/gameConfig';
import { useQueryParams } from '@/dojo/useQueryParams';
import useTimeRemaining from '@/dojo/useTimeRemaining';
import { useComponentValue } from '@dojoengine/react';
import React, { useState, useEffect } from 'react';



const GROW_TIME = 1000000; // Grow time in milliseconds

const FarmCell = ({ initialHop, index }: any) => {
    const { game_id } = useQueryParams();
    const { setup: { systemCalls: { build_farm, harvest_farm }, components: { FarmArea } }, account: { account } } = useDojo();

    let entityId = getEntityIdFromKeys([BigInt(game_id), BigInt(account.address), BigInt(index)]);

    const farm = useComponentValue(FarmArea, entityId);

    const [selectedHop, setSelectedHop] = useState(Hops.Cintra);

    const getColor = () => {
        if (!farm?.time_built) return 'white';
        const duration = Date.now() - (farm?.time_built * 1000);

        if (duration >= GROW_TIME) return 'green';
        if (duration >= GROW_TIME / 2) return 'yellow';
        return 'orange';
    };

    const handleSelectChange = (e: any) => {
        setSelectedHop(e.target.value);
    };

    // TODO: Make full Farm
    const handlePlanting = (selectedHop: any, index: any) => {
        const area_type = [0, 0, 0, 0, 0, 0];
        if (index >= 0 && index < area_type.length) {
            area_type[index] = selectedHop;
        }
        build_farm({ account, game_id, area_type });

    };

    const { getTimeRemaining, timeRemaining } = useTimeRemaining(farm?.time_built, GROW_TIME);

    return (
        <div
            className='flex flex-col w-48 h-48 p-8'
            style={{
                backgroundColor: getColor(),
            }}
        >
            <h4>{farm?.area_type && <span>{Hops[farm?.area_type]}</span>}</h4>

            {timeRemaining && timeRemaining > 0 && (
                <span className='text-xs mb-2'>Harvest: {getTimeRemaining()}</span>
            )}

            <div className='flex'>
                <Button className='py-2' size={'sm'} onClick={() => handlePlanting(selectedHop, index)}>Plant</Button>
                <select
                    value={selectedHop}
                    onChange={handleSelectChange}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fulldark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                >
                    {Object.entries(Hops)
                        .filter(([key, value]) => typeof value === 'number')
                        .map(([key, value], index) => (
                            <option key={index} value={value}>
                                {key}
                            </option>
                        ))}
                </select>
            </div>




        </div>
    );
}

export const FarmLand = () => {

    const { setup: { systemCalls: { harvest_farm } }, account: { account } } = useDojo();
    const { game_id } = useQueryParams();

    return (
        <>
            <h4>Farm Land</h4>
            <Button className='mb-1' size={'sm'} onClick={() => harvest_farm({ account, game_id })}>Harvest Farmland</Button>
            <div className='grid grid-cols-3 gap-2'>
                <FarmCell initialHop={null} index={0} />
                <FarmCell initialHop={null} index={1} />
                <FarmCell initialHop={null} index={2} />
                <FarmCell initialHop={null} index={3} />
                <FarmCell initialHop={null} index={4} />
                <FarmCell initialHop={null} index={5} />
            </div>
        </>
    );
};