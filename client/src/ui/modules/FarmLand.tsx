import { useDojo } from '@/DojoContext';
import { Button } from '@/components/ui/button';
import { getEntityIdFromKeys } from '@/dojo/createSystemCalls';
import { FlowerImages, GROW_TIME, Hops } from '@/dojo/gameConfig';
import { useQueryParams } from '@/dojo/useQueryParams';
import useTimeRemaining from '@/dojo/useTimeRemaining';
import { useComponentValue } from '@dojoengine/react';
import { useState } from 'react';

const FarmCell = ({ index }: any) => {
    const { game_id } = useQueryParams();
    const { setup: { systemCalls: { build_farm, harvest_farm }, components: { FarmArea } }, account: { account } } = useDojo();

    let entityId = getEntityIdFromKeys([BigInt(game_id), BigInt(account.address), BigInt(index)]);

    const farm = useComponentValue(FarmArea, entityId);

    const [selectedHop, setSelectedHop] = useState(Hops.Cintra);

    const getColor = () => {
        if (!farm?.time_built) return 'border-2 border-gray-700';
        const duration = Date.now() - (farm?.time_built * 1000);

        if (duration >= GROW_TIME) return 'bg-green-700 animate-pulse';
        if (duration >= GROW_TIME / 2) return 'bg-yellow-700';
        return 'bg-orange-700';
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
            className={`flex flex-col w-48 h-48 p-8 rounded-2xl ${getColor()}`}
        >
            {farm?.area_type! ? (<div className='flex pb-3'>
                <img className="w-8" src={FlowerImages[farm?.area_type! + 100 as keyof typeof FlowerImages]} alt="" />
                <h4>{farm?.area_type && <span>{Hops[farm?.area_type]}</span>}</h4>
            </div>) : ''}

            {timeRemaining && timeRemaining > 0 && (
                <span className='text-xs mb-2'>Harvest: {getTimeRemaining()}</span>
            )}

            {!timeRemaining && farm?.area_type && (<Button className='mb-1 self-center' size={'sm'} onClick={() => harvest_farm({ account, game_id })}>Harvest Farmland</Button>)}

            <div className='flex space-x-1'>
                <Button className='py-2' size={'sm'} onClick={() => handlePlanting(selectedHop, index)}>Plant</Button>

                <select
                    value={selectedHop}
                    onChange={handleSelectChange}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fulldark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                >
                    {Object.entries(Hops)
                        .filter(([_key, value]) => typeof value === 'number')
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
            <div className='flex justify-between'>
                <h4>Farm Land - 6 Plots</h4>
                <Button className='mb-1 self-center' size={'sm'} onClick={() => harvest_farm({ account, game_id })}>Harvest Farmland</Button>
            </div>

            <div className='grid grid-cols-3 gap-2'>
                <FarmCell index={0} />
                <FarmCell index={1} />
                <FarmCell index={2} />
                <FarmCell index={3} />
                <FarmCell index={4} />
                <FarmCell index={5} />
            </div>
        </>
    );
};