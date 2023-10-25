import { Chip } from "../elements/chip";
import Coin from "../../icons/coin.svg?react"

export enum ItemType {
    ChinookSeeds,
    CintraSeeds,
    GalaxySeeds,
    Extra1,
    Extra2,
    Extra3
}

export const LandImagePaths: { [key in ItemType]: string } = {
    [ItemType.ChinookSeeds]: "/images/seeds/Kind=Chinook.png",
    [ItemType.CintraSeeds]: "/images/seeds/Kind=Cintra.png",
    [ItemType.GalaxySeeds]: "/images/seeds/Kind=Galaxy.png",
    [ItemType.Extra1]: "/images/seeds/Kind=Extra-1.png",
    [ItemType.Extra2]: "/images/seeds/Kind=Extra-2.png",
    [ItemType.Extra3]: "/images/seeds/Kind=Extra-3.png",
};

interface Props {
    name: string;
    price: number;
    quantity: string;
    type: ItemType
}

export const ItemCard = (props: Props) => {
    return (
        <div className="relative rounded p-2">
            <div className="bg-dirt-300 pt-6 rounded border border-dirt-100">
                <Chip title={"x " + props.quantity} position="top-right" color="yellow" />
                <div className="px-6 pb-4">
                    <img className="w-16 h-16 mt-4" src={LandImagePaths[props.type]} alt="" />
                </div>

                <div className="w-full flex justify-between">
                    <button className="border-dirt-100 w-7/12 rounded-bl text-beer-100 border-t border-r flex justify-center py-2">
                        <Coin className="self-center mr-1" />
                        {props.price}</button>
                    <button className=" border-dirt-100 w-5/12 rounded-br text-green-100 border-t  py-2">up</button>
                </div>
            </div>
        </div>
    )
};