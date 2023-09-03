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