import { useQueryParams } from '@/dojo/useQueryParams';
import { Chip } from '../elements/chip';
import { Beers, Flowers, ImagePaths, ItemIcons, Seeds } from './ItemCard';
import { useComponentValue } from '@dojoengine/react';
import { useDojo } from '@/DojoContext';
import { Button } from '../elements/button';
import useTimeRemaining from '@/dojo/useTimeRemaining';
import { BREW_TIME } from '@/dojo/gameConfig';
import { generateRandomRecipe } from '@/utils';
import { Entity } from '@dojoengine/recs';
import { getEntityIdFromKeys } from '@dojoengine/utils';
import { Card } from '../elements/card';
import { useSync } from '@dojoengine/react';

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
            network: {
                torii_client,
                contractComponents: { Brew: BrewContract },
            },
        },
        account: { account },
    } = useDojo();

    const brew = useComponentValue(Brew, entity_id);

    const { getTimeRemaining, timeRemaining } = useTimeRemaining(brew?.time_built, BREW_TIME);

    const ready = timeRemaining < 0;

    const ready_state = ready ? 'Ready' : 'Brewing: ' + getTimeRemaining();

    const ready_state_color = ready ? 'green' : 'yellow';

    useSync(torii_client, BrewContract, [BigInt(entity_id)]);

    return (
        <div className="p-2 relative">
            <div className="bg-dirt-300  rounded-xl border border-dirt-100 hover:bg-grass-200 hover:cursor-pointer hover:border-green-200 p-2">
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
            components: { ItemBalance },
        },
        account: { account },
    } = useDojo();

    const recipe = generateRandomRecipe('5672635178472', beer.toString());

    const cascade_quantity =
        useComponentValue(ItemBalance, getEntityIdFromKeys([BigInt(game_id), BigInt(account.address), BigInt(Seeds.CascadeSeeds)]) as Entity)
            ?.balance || 0;

    const chinook_quantity =
        useComponentValue(ItemBalance, getEntityIdFromKeys([BigInt(game_id), BigInt(account.address), BigInt(Seeds.ChinookSeeds)]) as Entity)
            ?.balance || 0;

    const cintra_quantity =
        useComponentValue(ItemBalance, getEntityIdFromKeys([BigInt(game_id), BigInt(account.address), BigInt(Seeds.CintraSeeds)]) as Entity)
            ?.balance || 0;

    const fuggle_quantity =
        useComponentValue(ItemBalance, getEntityIdFromKeys([BigInt(game_id), BigInt(account.address), BigInt(Seeds.FuggleSeeds)]) as Entity)
            ?.balance || 0;

    const saaz_quantity =
        useComponentValue(ItemBalance, getEntityIdFromKeys([BigInt(game_id), BigInt(account.address), BigInt(Seeds.SaazSeeds)]) as Entity)?.balance ||
        0;

    const galaxy_quantity =
        useComponentValue(ItemBalance, getEntityIdFromKeys([BigInt(game_id), BigInt(account.address), BigInt(Seeds.GalaxySeeds)]) as Entity)
            ?.balance || 0;

    const can_brew = () => {
        return (
            cascade_quantity >= recipe[Flowers.CascadeFlowers] &&
            chinook_quantity >= recipe[Flowers.ChinookFlowers] &&
            cintra_quantity >= recipe[Flowers.CintraFlowers] &&
            fuggle_quantity >= recipe[Flowers.FuggleFlowers] &&
            saaz_quantity >= recipe[Flowers.SaazFlowers] &&
            galaxy_quantity >= recipe[Flowers.GalaxyFlowers]
        );
    };

    const isBalanceSufficient = (itemType, requiredAmount) => {
        switch (itemType) {
            case Flowers.CascadeFlowers:
                return cascade_quantity >= requiredAmount;
            case Flowers.ChinookFlowers:
                return chinook_quantity >= requiredAmount;
            case Flowers.CintraFlowers:
                return cintra_quantity >= requiredAmount;
            case Flowers.FuggleFlowers:
                return fuggle_quantity >= requiredAmount;
            case Flowers.SaazFlowers:
                return saaz_quantity >= requiredAmount;
            case Flowers.GalaxyFlowers:
                return galaxy_quantity >= requiredAmount;
            default:
        }
    };

    return (
        <Card>
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
                        const flowerType = parseInt(a) as Flowers;
                        const requiredAmount = recipe[flowerType];
                        const isSufficient = isBalanceSufficient(flowerType, requiredAmount);
                        return (
                            <div key={index} className="flex">
                                <div className={`w-8 ${!isSufficient ? 'opacity-50' : ''}`}>{ItemIcons[parseInt(a) as Flowers]}</div>

                                <div className={`${!isSufficient ? 'opacity-50' : ''} rounded-full bg-dirt-100/20 px-2 self-center`}>
                                    {recipe[parseInt(a) as Flowers].toString()}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Card>
    );
};
