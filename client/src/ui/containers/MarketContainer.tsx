import { createArrayFromEnum } from '@/utils';
import { Beers, Seeds, Flowers } from '../components/ItemCard';
import { ItemRow } from '../modules/ItemRow';
import { TradeTable } from '../modules/TradeTable';
import { IconTitle, Icons } from '../components/IconTitle';

export const MarketContainer = () => {
    return (
        <div className="flex flex-col space-y-2">
            <IconTitle title="Market" icon={Icons.Market} />
            <TradeTable />
            <ItemRow title="seeds" items={createArrayFromEnum(Seeds)} />
            <br />
            <ItemRow title="flowers" items={createArrayFromEnum(Flowers)} />
            <br />
            <ItemRow title="beers" items={createArrayFromEnum(Beers)} />
        </div>
    );
};
