import { Chip } from '../elements/chip';
import Coin from '../../icons/coin.svg?react';
import { Input } from '../elements/input';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { FancyTitle } from './FancyTitle';
import { useComponentValue } from '@latticexyz/react';
import FuggleSeeds from '../../icons/seeds/FuggleSeeds.svg?react';
import GalaxySeeds from '../../icons/seeds/GalaxySeeds.svg?react';
import ChinookSeeds from '../../icons/seeds/ChinookSeeds.svg?react';
import CintraSeeds from '../../icons/seeds/CintraSeeds.svg?react';
import CascadeSeeds from '../../icons/seeds/CascadeSeeds.svg?react';
import SaazSeeds from '../../icons/seeds/SaazSeeds.svg?react';
import FuggleFlowers from '../../icons/flowers/FuggleFlowers.svg?react';
import GalaxyFlowers from '../../icons/flowers/GalaxyFlowers.svg?react';
import ChinookFlowers from '../../icons/flowers/ChinookFlowers.svg?react';
import CintraFlowers from '../../icons/flowers/CintraFlowers.svg?react';
import CascadeFlowers from '../../icons/flowers/CascadeFlowers.svg?react';
import SaazFlowers from '../../icons/flowers/SaazFlowers.svg?react';

import DragonHideBlaze from '../../icons/beers/DragonHideBlaze.svg?react';
import MithralHaze from '../../icons/beers/MithralHaze.svg?react';
import ObsidianImperialStout from '../../icons/beers/ObsidianImperialStout.svg?react';
import RubySour from '../../icons/beers/RubySour.svg?react';
import DiamondWheatBeer from '../../icons/beers/DiamondWheatBeer.svg?react';
import EtherealLager from '../../icons/beers/EtherealLager.svg?react';

import { useDojo } from '@/DojoContext';
import { getEntityIdFromKeys } from '@dojoengine/utils';
import { useQueryParams } from '@/dojo/useQueryParams';
import { Button } from '../elements/button';
import { TextContainer } from '../elements/TextContainer';
import { usePricePolling } from '@/hooks/usePricePolling';
import { useState } from 'react';
import { useSync } from '@/hooks/useSync';
import { Entity } from '@latticexyz/recs';

export enum Seeds {
    ChinookSeeds = 1,
    CintraSeeds,
    GalaxySeeds,
    CascadeSeeds,
    SaazSeeds,
    FuggleSeeds,
}

export enum Flowers {
    CintraFlowers = 101,
    ChinookFlowers,
    GalaxyFlowers,
    CascadeFlowers,
    SaazFlowers,
    FuggleFlowers,
}

export enum Beers {
    DragonHideBlaze = 1001,
    MithralHaze = 1002,
    ObsidianImperialStout = 1003,
    RubySour = 1004,
    DiamondWheatBeer = 1005,
    EtherealLager = 1006,
}

export const ItemIcons: { [key in Flowers]: any } = {
    [Flowers.CintraFlowers]: <CintraFlowers />,
    [Flowers.ChinookFlowers]: <ChinookFlowers />,
    [Flowers.GalaxyFlowers]: <GalaxyFlowers />,
    [Flowers.CascadeFlowers]: <CascadeFlowers />,
    [Flowers.SaazFlowers]: <SaazFlowers />,
    [Flowers.FuggleFlowers]: <FuggleFlowers />,
};

export const ImagePaths: { [key in Seeds | Flowers | Beers]: any } = {
    [Seeds.ChinookSeeds]: <ChinookSeeds />,
    [Seeds.CintraSeeds]: <CintraSeeds />,
    [Seeds.GalaxySeeds]: <GalaxySeeds />,
    [Seeds.CascadeSeeds]: <CascadeSeeds />,
    [Seeds.SaazSeeds]: <SaazSeeds />,
    [Seeds.FuggleSeeds]: <FuggleSeeds />,
    [Flowers.CintraFlowers]: <CintraFlowers />,
    [Flowers.ChinookFlowers]: <ChinookFlowers />,
    [Flowers.GalaxyFlowers]: <GalaxyFlowers />,
    [Flowers.CascadeFlowers]: <CascadeFlowers />,
    [Flowers.SaazFlowers]: <SaazFlowers />,
    [Flowers.FuggleFlowers]: <FuggleFlowers />,
    [Beers.DragonHideBlaze]: <DragonHideBlaze />,
    [Beers.MithralHaze]: <MithralHaze />,
    [Beers.ObsidianImperialStout]: <ObsidianImperialStout />,
    [Beers.RubySour]: <RubySour />,
    [Beers.DiamondWheatBeer]: <DiamondWheatBeer />,
    [Beers.EtherealLager]: <EtherealLager />,
};

export const ItemNames: { [key in Seeds | Flowers | Beers]: string } = {
    [Seeds.ChinookSeeds]: 'Chinook Seeds',
    [Seeds.CintraSeeds]: 'Cintra Seeds',
    [Seeds.GalaxySeeds]: 'Galaxy Seeds',
    [Seeds.CascadeSeeds]: 'Cascade Seeds',
    [Seeds.SaazSeeds]: 'Saaz Seeds',
    [Seeds.FuggleSeeds]: 'Fuggle Seeds',
    [Flowers.CintraFlowers]: 'Cintra Flowers',
    [Flowers.ChinookFlowers]: 'Chinook Flowers',
    [Flowers.GalaxyFlowers]: 'Galaxy Flowers',
    [Flowers.CascadeFlowers]: 'Cascade Flowers',
    [Flowers.SaazFlowers]: 'Saaz Flowers',
    [Flowers.FuggleFlowers]: 'Fuggle Flowers',
    [Beers.DragonHideBlaze]: 'Dragon Hide Blaze',
    [Beers.MithralHaze]: 'Mithral Haze',
    [Beers.ObsidianImperialStout]: 'Obsidian Imperial Stout',
    [Beers.RubySour]: 'Ruby Sour',
    [Beers.DiamondWheatBeer]: 'Diamond Wheat Beer',
    [Beers.EtherealLager]: 'Ethereal Lager',
};

export interface Item {
    type: Seeds | Flowers | Beers;
}

export const ItemCard = ({ type }: Item) => {
    const {
        setup: {
            systemCalls: { buy_hops, sell_beer },
            components: { ItemBalance },
        },
        account: { account },
    } = useDojo();

    const { game_id } = useQueryParams();

    const { price } = usePricePolling(type);

    const entity_id = getEntityIdFromKeys([BigInt(game_id), BigInt(account.address), BigInt(type)]) as Entity;

    const quantity = useComponentValue(ItemBalance, entity_id)?.balance || 0;

    const [actionQuantity, setActionQuantity] = useState(1);

    useSync(ItemBalance, [BigInt(game_id), BigInt(account.address), BigInt(type)]);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="relative rounded p-2 ">
                    <div className="bg-dirt-300 pt-6 border rounded border border-dirt-100 hover:bg-grass-200 hover:cursor-pointer hover:border-green-200">
                        <Chip title={'x ' + quantity} position="top-right" color="yellow" />
                        <div className="px-6 pb-4 mx-auto">{ImagePaths[type]}</div>

                        <div className="w-full flex justify-between">
                            <button className="border-dirt-100/20 w-7/12 rounded-bl text-beer-100 border-t border-r flex justify-center py-2 hover:bg-dirt-100/30">
                                <Coin className="self-center mr-1 h-6" />
                                {price?.toFixed(2)}
                            </button>
                            <button className="border-dirt-100/20 w-5/12 rounded-br text-green-100 border-t  py-2  hover:bg-dirt-100/30">up</button>
                        </div>
                    </div>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle asChild>
                        <FancyTitle title={ItemNames[type]} />
                    </AlertDialogTitle>

                    <div className="mx-auto my-3 w-24">{ImagePaths[type]}</div>
                    <div className="flex space-x-2 justify-center">
                        <TextContainer>
                            <>
                                Own: <span className="text-beer-100">{quantity.toString()}</span>
                            </>
                        </TextContainer>
                        <TextContainer>
                            <>
                                <Coin className="self-center mx-4 h-6" />
                                <span className="text-beer-100">{price}</span>
                            </>
                        </TextContainer>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex justify-center">
                    {type < 100 && (
                        <Button variant={'default'} onClick={() => buy_hops({ account, game_id, item_id: type, amount: actionQuantity })}>
                            Buy
                        </Button>
                    )}

                    {/* NOTE: (beer_id: type - 1000) - we use an enum in cairo - it's a little dirty doing this and we should change */}

                    {type > 1000 && (
                        <Button
                            variant={'default'}
                            className="ml-2 self-center"
                            onClick={() => sell_beer({ account, game_id, beer_id: type - 1000, amount: actionQuantity })}
                        >
                            Sell
                        </Button>
                    )}

                    <Input
                        className="w-12"
                        min={actionQuantity.toString()}
                        type="number"
                        placeholder={actionQuantity.toString()}
                        name="action_quantity"
                        value={actionQuantity}
                        onChange={(event) => setActionQuantity(parseInt(event.target.value))}
                    />
                </AlertDialogFooter>
                <AlertDialogCancel>close</AlertDialogCancel>
            </AlertDialogContent>
        </AlertDialog>
    );
};
