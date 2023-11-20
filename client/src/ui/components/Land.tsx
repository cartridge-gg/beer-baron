import { useQueryParams } from '@/dojo/useQueryParams';
import { Chip } from '../elements/chip';
import { useDojo } from '@/DojoContext';
import { getEntityIdFromKeys } from '@dojoengine/utils';
import { useComponentValue } from '@dojoengine/react';
import useTimeRemaining from '@/dojo/useTimeRemaining';
import { GROW_TIME } from '@/dojo/gameConfig';
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
} from '@/ui/elements/alert-dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/ui/elements/select';
import { FancyTitle } from './FancyTitle';
import { Button } from '../elements/button';
import { ImagePaths, Seeds } from './ItemCard';
import { useSync } from '@dojoengine/react';

export enum LandType {
    Empty,
    Sprout,
    Flower,
}

export const LandImagePaths: { [key in LandType]: string } = {
    [LandType.Empty]: '/images/lands/State=Empty, Kind=Default, Num=1.png',
    [LandType.Sprout]: '/images/lands/State=Sprout, Kind=Galaxy, Num=1.png',
    [LandType.Flower]: '/images/lands/State=Flower, Kind=Galaxy, Num=1.png',
};

interface Props {
    index: number;
}

export const Land = ({ index }: Props) => {
    const [selectedHop, setSelectedHop] = useState(Seeds.CascadeSeeds);

    const { game_id } = useQueryParams();
    const {
        setup: {
            systemCalls: { build_farm },
            components: { FarmArea, ItemBalance },
            network: {
                contractComponents: { FarmArea: FarmAreaContract },
                torii_client,
            },
        },
        account: { account },
    } = useDojo();

    const entityId = getEntityIdFromKeys([BigInt(game_id), BigInt(account.address), BigInt(index)]);

    // useSync(FarmArea, [BigInt(game_id), BigInt(account.address), BigInt(index)])

    const farm = useComponentValue(FarmArea, entityId);

    const built = farm?.time_built || 0;
    const duration = Date.now() - built * 1000;
    const fully_grown = duration >= GROW_TIME;
    const half_grown = duration >= GROW_TIME / 2;

    const getImage = () => {
        // not build
        if (!built) return;

        // full grown
        if (fully_grown) return ImagePaths[(farm.area_type + 100) as Seeds];

        // sprout
        if (half_grown) return ImagePaths[farm.area_type as Seeds];

        // seeded
        return ImagePaths[farm.area_type as Seeds];
    };

    // // TODO: Make full Farm
    const handlePlanting = (selectedHop: any, index: any) => {
        const area_type = [0, 0, 0, 0, 0, 0];
        if (index >= 0 && index < area_type.length) {
            area_type[index] = selectedHop;
        }
        build_farm({ account, game_id, area_type });
    };

    const { getTimeRemaining, timeRemaining } = useTimeRemaining(farm?.time_built, GROW_TIME);

    const ready = timeRemaining < 0;

    const ready_state = built ? (ready ? 'Ready' : 'Growing: ' + getTimeRemaining()) : 'Not Planted';

    const ready_state_color = built ? (ready ? 'green' : 'yellow') : 'red';

    const quantity = (type: string) => {
        const entityId = getEntityIdFromKeys([BigInt(game_id), BigInt(account.address), BigInt(type)]);

        return useComponentValue(ItemBalance, entityId)?.balance || 0;
    };

    useSync(torii_client, FarmAreaContract, [BigInt(game_id), BigInt(account.address), BigInt(index)]);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="relative p-2">
                    <Chip title={ready_state} position="top-right" color={ready_state_color} />
                    <div
                        className={`${
                            ready_state ? 'border-beer-100' : ''
                        } rounded border h-48 bg-dirt-300 border-dirt-100/20 p-10 hover:border-green-100 hover:bg-grass-200 cursor-pointer`}
                    >
                        {getImage()}
                    </div>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <FancyTitle title="Plant hops" />
                    <p className="text-center">Grow flowers needed for brewing!</p>
                    <div className="mx-auto flex space-x-2 py-3">
                        <div className="w-24">{ImagePaths[selectedHop]}</div>
                        <div className="self-center">
                            {' > '} grows {' > '}
                        </div>
                        <div className="w-24">{ImagePaths[(selectedHop + 100) as Seeds]}</div>
                    </div>
                    <div className="flex space-x-1 mx-auto">
                        <Select onValueChange={(value) => setSelectedHop(parseInt(value))}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup defaultValue={Seeds.CascadeSeeds.toString()}>
                                    {Object.entries(Seeds)
                                        .filter(([_key, value]) => typeof value === 'number')
                                        .map(([key, value], index) => (
                                            <SelectItem key={index} value={value.toString()}>
                                                {key} : {quantity(value.toString()).toString()}
                                            </SelectItem>
                                        ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button variant={'default'} size={'sm'} onClick={() => handlePlanting(selectedHop, index)}>
                            Plant
                        </Button>
                    </AlertDialogCancel>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
