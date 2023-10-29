import { Item, ItemCard } from "../components/ItemCard";

interface ItemRowProps {
    title: string;
    items: Item[];
}

export const ItemRow = ({ title, items }: ItemRowProps) => {
    return (
        <div>
            <div className="uppercase text-dirt-100">{title}</div>
            <div className="grid grid-cols-3 gap-2">
                {items.map((item, index) => {
                    return <ItemCard {...item} key={index} />
                })}
            </div>
        </div>
    )
}