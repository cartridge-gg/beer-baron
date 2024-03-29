import { Entity } from '@dojoengine/recs';
import { Flowers, ItemIcons } from './ItemCard';
import { useComponentValue } from '@dojoengine/react';
import { getEntityIdFromKeys } from '@dojoengine/utils';
import { useDojo } from '@/dojo/useDojo';
import { useQueryParams } from '@/dojo/useQueryParams';

export const Ingredient = ({ id, recipe }: { id: string; recipe: any }) => {
    const { game_id } = useQueryParams();
    const {
        setup: {
            clientComponents: { ItemBalance },
        },
        account: { account },
    } = useDojo();

    const quantity =
        useComponentValue(ItemBalance, getEntityIdFromKeys([BigInt(game_id), BigInt(account.address), BigInt(id)]) as Entity)?.balance || 0;

    return (
        <div className="flex">
            <div className="w-8">{ItemIcons[parseInt(id) as Flowers]}</div>

            <div className="rounded-full bg-dirt-100/20 px-2 self-center">{recipe[parseInt(id) as Flowers].toString()}</div>
        </div>
    );
};
