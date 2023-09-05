const OFFSET: felt252 = 1000;
const GAME_CONFIG: felt252 = 999999999999999;
const GOLD_ID: felt252 = 999999;
const STARTING_BALANCE: felt252 = 1000;
const CROP_GROWTH_TIME: felt252 = 100;
const CROP_YIELD: felt252 = 1000;

const SEED_GROWN_OFFSET: felt252 = 100;

// this should be moved to game setup
const NUMBER_OF_FARM_PLOTS: felt252 = 6;

// beer
const BREW_TIME: felt252 = 100;
const BREW_YEILD_LITRES: felt252 = 1000;

// markets

mod CONFIG {
    // to use in the ItemBalances - we offset the values so we can fit more in the future
    mod ITEM_IDS {
        const GOLD_ID: felt252 = 999999;
        mod HOP_SEEDS {
            const CITRA: felt252 = 1;
            const CHINOOK: felt252 = 2;
            const GALAXY: felt252 = 3;
        }
        mod HOP_FLOWERS {
            const CITRA: felt252 = 101;
            const CHINOOK: felt252 = 102;
            const GALAXY: felt252 = 103;
        }
        mod BEERS {
            const DRAGON_HIDE_BLAZE_IPA: felt252 = 1001;
            const MITHRIL_HAZE: felt252 = 1002;
            const OBSIDIAN_IMPERIAL_STOUT: felt252 = 1003;
        }
    }
}
