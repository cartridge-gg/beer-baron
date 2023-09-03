export const BREW_TIME = 100000
export const GROW_TIME = 100000;
// used for internal enum in cairo
export enum BeerID {
    DragonHideBlaze = 1,
    MithralHaze = 2
}

// used for tracking balances
export enum Beers {
    DragonHideBlaze = 1001,
    MithralHaze = 1002
}

export const BeerNames: { [key in Beers]: string } = {
    [Beers.DragonHideBlaze]: "Dragon Hide Blaze", // Spaces added for better readability
    [Beers.MithralHaze]: "Mithral Haze"
};

export enum Hops {
    Cintra = 1,
    Chinook = 2,
    Galaxy = 3,
}

export enum Flowers {
    Cintra = 101,
    Chinook = 102,
    Galaxy = 103,
}

export const HopImages = {
    [Hops.Cintra]: '/images/items/seeds/seed.png',
    [Hops.Chinook]: '/images/items/seeds/seed.png',
    [Hops.Galaxy]: '/images/items/seeds/seed.png',
};

export const FlowerImages = {
    [Flowers.Cintra]: '/images/items/flowers/cintra.png',
    [Flowers.Chinook]: '/images/items/flowers/chinook.png',
    [Flowers.Galaxy]: '/images/items/flowers/galaxy.png',
};

export const BeerImages = {
    [Beers.DragonHideBlaze]: '/images/items/beers/barrel.png',
    [Beers.MithralHaze]: '/images/items/beers/barrel.png',
};


export type HopQuantity = {
    hop: Flowers;
    quantity: number;
};

export type Recipe = {
    [key in Beers]: HopQuantity[];
};

export const beerRecipes: Recipe = {
    [Beers.DragonHideBlaze]: [
        { hop: Flowers.Cintra, quantity: 0 },
        { hop: Flowers.Chinook, quantity: 0 },
        { hop: Flowers.Galaxy, quantity: 1 }
    ],
    [Beers.MithralHaze]: [
        { hop: Flowers.Galaxy, quantity: 0 },
        { hop: Flowers.Cintra, quantity: 0 },
        { hop: Flowers.Chinook, quantity: 0 },
    ]
};