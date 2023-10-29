import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react";
import { Input } from "../elements/input";
import { Button } from "../elements/button";
import { useDojo } from "@/DojoContext";
import { FancyTitle } from "../components/FancyTitle";
import { useQueryParams } from "@/dojo/useQueryParams";

export const CreateTrade = () => {

    const { game_id } = useQueryParams();

    const {
        setup: {
            systemCalls: { create_trade }
        },
        account: { account }
    } = useDojo();

    const [formData, setFormData] = useState({
        game_id: game_id,
        item_id: 1,
        quantity: 1,
        price: 10
    });

    // Event handler for form changes
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevState: any) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Event handler for form submission
    const handleSubmit = (event: any) => {
        event.preventDefault();
        create_trade({ account, ...formData });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={'default'} size={'sm'}>Create Trade</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <FancyTitle title="Create Trade" />
                    <div className="flex  text-beer-100">
                        <form className="flex w-full flex-col space-y-2" onSubmit={handleSubmit}>
                            <label>
                                Item:
                                <Input type="number" name="item_id" value={formData.item_id} onChange={handleInputChange} />

                            </label>
                            <label>
                                quantity:
                                <Input type="text" name="quantity" value={formData.quantity} onChange={handleInputChange} />

                            </label>
                            <label>
                                price:
                                <Input type="number" name="price" value={formData.price} onChange={handleInputChange} />

                            </label>
                            <Button type="submit">Create Trade</Button>
                        </form>
                    </div>

                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}