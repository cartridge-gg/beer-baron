export const BREW_TIME = 1000000
export const GROW_TIME = 2000000;
export const BATCH_AMOUNT = 100;

export const GOLD_ID = 999999;
export const INDULGENCE_ID = 999998;
// used for internal enum in cairo
export enum BeerID {
    DragonHideBlaze = 1,
    MithralHaze = 2,
    ObsidianImperialStout = 3,
}

// used for tracking balances
export enum Beers {
    DragonHideBlaze = 1001,
    MithralHaze = 1002,
    ObsidianImperialStout = 1003,
}

export const BeerNames: { [key in Beers]: string } = {
    [Beers.DragonHideBlaze]: "Dragon Hide Blaze TIPA", // Spaces added for better readability
    [Beers.MithralHaze]: "Mithral Haze IPA",
    [Beers.ObsidianImperialStout]: "Obsidian Imperial Stout",
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
    [Beers.ObsidianImperialStout]: '/images/items/beers/barrel.png',
};

export const BeerBottled = {
    [Beers.DragonHideBlaze]: '/images/items/beers/dragonhide_blaze.png',
    [Beers.MithralHaze]: '/images/items/beers/mithral_haze.png',
    [Beers.ObsidianImperialStout]: '/images/items/beers/obsidian_stout.png',
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
        { hop: Flowers.Cintra, quantity: 5 },
        { hop: Flowers.Chinook, quantity: 3 },
        { hop: Flowers.Galaxy, quantity: 2 }
    ],
    [Beers.MithralHaze]: [
        { hop: Flowers.Galaxy, quantity: 1 },
        { hop: Flowers.Cintra, quantity: 6 },
        { hop: Flowers.Chinook, quantity: 3 },
    ],
    [Beers.ObsidianImperialStout]: [
        { hop: Flowers.Galaxy, quantity: 2 },
        { hop: Flowers.Cintra, quantity: 6 },
        { hop: Flowers.Chinook, quantity: 2 },
    ],
};

export enum GameStatus {
    Created = 1,
    Lobby = 2,
    Started = 3,
}

export enum TradeStatus {
    Open = 1,
    Accepted = 2,
    Cancelled = 3
}

export const TradeStatusTitles = {
    [TradeStatus.Open]: "Open",
    [TradeStatus.Accepted]: "Accepted",
    [TradeStatus.Cancelled]: "Cancelled",
}