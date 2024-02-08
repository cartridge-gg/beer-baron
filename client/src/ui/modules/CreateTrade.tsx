import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
} from '@/ui/elements/alert-dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/ui/elements/select';
import { useEffect, useState } from 'react';
import { Input } from '../elements/input';
import { Button } from '../elements/button';
import { useDojo } from '@/dojo/useDojo';
import { FancyTitle } from '../components/FancyTitle';
import { useQueryParams } from '@/dojo/useQueryParams';
import { Flowers, ImagePaths, ItemNames, Seeds, allItems } from '../components/ItemCard';
import { TradeStatus } from '@/dojo/gameConfig';
import { TradeTable } from './TradeTable';
import Coin from '../../icons/coin.svg?react';

export const CreateTrade = () => {
    const { game_id } = useQueryParams();
    const [selectedItem, setSelectedItem] = useState<Seeds>(Seeds.FuggleSeeds);

    console.log(selectedItem);

    const {
        setup: {
            systemCalls: { create_trade },
        },
        account: { account },
    } = useDojo();

    const [formData, setFormData] = useState({
        game_id: game_id,
        item_id: selectedItem,
        quantity: 1,
        price: 10,
    });

    // Event handler for form changes
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Event handler for form submission
    const handleSubmit = (event: any) => {
        event.preventDefault();

        console.log(formData);
        create_trade({ account, ...formData });
    };

    useEffect(() => {
        setFormData((prevState) => ({
            ...prevState,
            item_id: selectedItem,
        }));
    }, [selectedItem]);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={'default'} size={'sm'}>
                    Create Trade
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <FancyTitle title="Market" />
                </AlertDialogHeader>
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <div>Details</div>
                        <Select onValueChange={(value) => setSelectedItem(parseInt(value))}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select Item" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup defaultValue={'1'}>
                                    {allItems
                                        .filter((value) => typeof value !== 'number')
                                        .map(([_key, value], index) => (
                                            <SelectItem key={index} value={value.toString()}>
                                                <div className="flex text-sm">
                                                    <div className="w-6 mr-2">{ImagePaths[value] as Seeds}</div>
                                                    {ItemNames[value]}
                                                </div>
                                            </SelectItem>
                                        ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <div className="w-16 my-8 mx-auto">{ImagePaths[selectedItem] as Seeds}</div>
                    </div>
                    <div className="col-span-12">
                        <TradeTable />
                    </div>
                </div>
                <div className="flex text-beer-100">
                    <form className="flex w-full space-x-2" onSubmit={handleSubmit}>
                        <div className="flex">
                            <Coin className="self-center mr-1 h-6" />
                            <Input placeholder="price" type="text" name="quantity" value={formData.quantity} onChange={handleInputChange} />
                        </div>
                        <div className="flex">
                            <div className="self-center  mr-1 h-6">#</div>
                            <Input type="number" name="price" value={formData.price} onChange={handleInputChange} />
                        </div>

                        <Button type="submit">Create</Button>
                    </form>
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
