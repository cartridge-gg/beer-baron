import { useQueryParams } from '@/dojo/useQueryParams';
import { Chip } from '../elements/chip';
import { Beers, Flowers, ImagePaths, ItemIcons } from './ItemCard';
import { useComponentValue } from '@latticexyz/react';
import { useDojo } from '@/DojoContext';
import { Button } from '../elements/button';
import useTimeRemaining from '@/dojo/useTimeRemaining';
import { BREW_TIME } from '@/dojo/gameConfig';
import { generateRandomRecipe } from '@/utils';
import { Entity } from '@latticexyz/recs';

export enum BeerID {
    TIPA = 1,
    PaleAle,
    Stout,
    Sour,
    Wheat,
    Lager,
}

export const BeerImages: { [key in BeerID]: string } = {
    [BeerID.TIPA]: '/images/beers/tipa.png',
    [BeerID.PaleAle]: '/images/beers/pale-ale.png',
    [BeerID.Stout]: '/images/beers/stout.png',
    [BeerID.Sour]: '/images/beers/sour.png',
    [BeerID.Wheat]: '/images/beers/wheat.png',
    [BeerID.Lager]: '/images/beers/lager.png',
};

// used for tracking balances

export const BeerNames: { [key in BeerID]: string } = {
    [BeerID.TIPA]: 'Dragon Hide Blaze TIPA',
    [BeerID.PaleAle]: 'Mithral Haze IPA',
    [BeerID.Stout]: 'Obsidian Imperial Stout',
    [BeerID.Sour]: 'Ruby Sour',
    [BeerID.Wheat]: 'Diamond Wheat Beer',
    [BeerID.Lager]: 'Ethereal Lager',
};

export type HopQuantity = {
    hop: Flowers;
    quantity: number;
};

export type Recipe = {
    [key in BeerID]: HopQuantity[];
};

export const BeerRecipes: Recipe = {
    [BeerID.TIPA]: [
        { hop: Flowers.CascadeFlowers, quantity: 3 },
        { hop: Flowers.ChinookFlowers, quantity: 3 },
        { hop: Flowers.GalaxyFlowers, quantity: 2 },
        { hop: Flowers.CascadeFlowers, quantity: 1 },
        { hop: Flowers.SaazFlowers, quantity: 1 },
        { hop: Flowers.FuggleFlowers, quantity: 1 },
    ],
    [BeerID.PaleAle]: [
        { hop: Flowers.CascadeFlowers, quantity: 3 },
        { hop: Flowers.ChinookFlowers, quantity: 3 },
        { hop: Flowers.GalaxyFlowers, quantity: 2 },
        { hop: Flowers.CascadeFlowers, quantity: 1 },
        { hop: Flowers.SaazFlowers, quantity: 1 },
        { hop: Flowers.FuggleFlowers, quantity: 1 },
    ],
    [BeerID.Stout]: [
        { hop: Flowers.CascadeFlowers, quantity: 3 },
        { hop: Flowers.ChinookFlowers, quantity: 3 },
        { hop: Flowers.GalaxyFlowers, quantity: 2 },
        { hop: Flowers.CascadeFlowers, quantity: 1 },
        { hop: Flowers.SaazFlowers, quantity: 1 },
        { hop: Flowers.FuggleFlowers, quantity: 1 },
    ],
    [BeerID.Sour]: [
        { hop: Flowers.CascadeFlowers, quantity: 3 },
        { hop: Flowers.ChinookFlowers, quantity: 3 },
        { hop: Flowers.GalaxyFlowers, quantity: 2 },
        { hop: Flowers.CascadeFlowers, quantity: 1 },
        { hop: Flowers.SaazFlowers, quantity: 1 },
        { hop: Flowers.FuggleFlowers, quantity: 1 },
    ],
    [BeerID.Wheat]: [
        { hop: Flowers.CascadeFlowers, quantity: 3 },
        { hop: Flowers.ChinookFlowers, quantity: 3 },
        { hop: Flowers.GalaxyFlowers, quantity: 2 },
        { hop: Flowers.CascadeFlowers, quantity: 1 },
        { hop: Flowers.SaazFlowers, quantity: 1 },
        { hop: Flowers.FuggleFlowers, quantity: 1 },
    ],
    [BeerID.Lager]: [
        { hop: Flowers.CascadeFlowers, quantity: 3 },
        { hop: Flowers.ChinookFlowers, quantity: 3 },
        { hop: Flowers.GalaxyFlowers, quantity: 2 },
        { hop: Flowers.CascadeFlowers, quantity: 1 },
        { hop: Flowers.SaazFlowers, quantity: 1 },
        { hop: Flowers.FuggleFlowers, quantity: 1 },
    ],
};

interface BeerCardProps {
    entity_id: Entity;
}

export const BeerCard = ({ entity_id }: BeerCardProps) => {
    const { game_id } = useQueryParams();
    const {
        setup: {
            systemCalls: { bottle_beer },
            components: { Brew },
        },
        account: { account },
    } = useDojo();

    const brew = useComponentValue(Brew, entity_id);

    const { getTimeRemaining, timeRemaining } = useTimeRemaining(brew?.time_built, BREW_TIME);

    const ready = timeRemaining < 0;

    const ready_state = ready ? 'Ready' : 'Brewing: ' + getTimeRemaining();

    const ready_state_color = ready ? 'green' : 'yellow';

    return (
        <div className="p-2 relative">
            <div className="bg-dirt-300  rounded-xl rounded border border-dirt-100 hover:bg-grass-200 hover:cursor-pointer hover:border-green-200 p-2">
                <Chip title={ready_state} position="top-right" color={ready_state_color} />
                <div className="w-24 mx-auto">{ImagePaths[brew?.beer_id as Beers]}</div>

                {ready && (
                    <Button
                        variant={'outline'}
                        size={'sm'}
                        className="w-full"
                        onClick={() => bottle_beer({ account, game_id, beer_id: brew?.beer_id as any, batch_id: brew?.batch_key })}
                    >
                        Bottle Batch
                    </Button>
                )}
            </div>
        </div>
    );
};

interface BeerRecipeCardProps {
    beer: BeerID;
    seed: number;
}

export const BeerRecipeCard = ({ beer }: BeerRecipeCardProps) => {
    const { game_id } = useQueryParams();

    const {
        setup: {
            systemCalls: { brew_beer },
        },
        account: { account },
    } = useDojo();

    const recipe = generateRandomRecipe('5672635178472', beer.toString());

    return (
        <div className="relative rounded-xl bg-dirt-300 rounded border border-dirt-100 flex text-white flex-wrap hover:bg-grass-200 hover:cursor-pointer hover:border-green-200">
            <div className="p-4 border-r border-dirt-100 w-3/12 self-center space-y-2">
                {ImagePaths[(beer + 1000) as Beers]}
                <Button variant={'outline'} size={'sm'} onClick={() => brew_beer({ account, game_id, beer_id: beer })}>
                    Brew
                </Button>
            </div>
            <div className="self-center p-4 w-9/12">
                <div className="text-lg">{BeerNames[beer]}</div>
                <div className="grid grid-cols-3 gap-2 my-2">
                    {Object.keys(recipe).map((a, index) => {
                        console.log(a);
                        return (
                            <div key={index} className="flex">
                                <div className="w-8">{ItemIcons[parseInt(a) as Flowers]}</div>

                                <div className="rounded-full bg-dirt-100/20 px-2 self-center">{recipe[parseInt(a) as Flowers].toString()}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
