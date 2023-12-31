import { createArrayFromEnum } from '@/utils';
import { Beers, Seeds, Flowers } from '../components/ItemCard';
import { ItemRow } from '../modules/ItemRow';
import { IconTitle, Icons } from '../components/IconTitle';
import { CreateTrade } from '../modules/CreateTrade';

export const MarketContainer = () => {
    return (
        <div className="flex flex-col space-y-2">
            <IconTitle title="Market" icon={Icons.Market} />

            <CreateTrade />
            {/* <TradeTable /> */}
            <ItemRow title="seeds" items={createArrayFromEnum(Seeds)} />
            <br />
            <ItemRow title="flowers" items={createArrayFromEnum(Flowers)} />
            <br />
            <ItemRow title="beers" items={createArrayFromEnum(Beers)} />
        </div>
    );
};
