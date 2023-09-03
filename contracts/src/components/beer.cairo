use starknet::ContractAddress;
use serde::Serde;

use beer_barron::constants::{GAME_CONFIG, hops, hops_grown, beers};

// this could a generalised component in the future with the FarmArea
// TODO: Can drop player_id and just use owner check
#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Brew {
    #[key]
    game_id: u64,
    #[key]
    player_id: ContractAddress,
    #[key]
    batch_id: u64, // players can brew in parallel so we just use a uuid here
    batch_key: u64, // this needs removing - it is so the client knows which batch to update
    owner: ContractAddress,
    beer_id: u64, // crop type
    time_built: u64, // built time
    status: u64, // 0 = not built, 1 = built, 2 = harvested
}


// This will track batch numbers in games
#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct BrewBatchTrack {
    #[key]
    game_id: u64,
    owner: ContractAddress,
    count: u64
}

#[derive(Drop, Copy, PartialEq, Serde)]
struct Recipe {
    citra: u64,
    chinook: u64,
    galaxy: u64,
}

#[derive(Drop, Copy, PartialEq, Serde)]
enum BeerID {
    None: (),
    DragonHideBlazeIPA,
    MithrilHaze,
    ObsidianImperialStout
}


fn get_beer_id_from_enum(beer_id: BeerID) -> u64 {
    match beer_id {
        BeerID::None(_) => 0,
        BeerID::DragonHideBlazeIPA(_) => 1,
        BeerID::MithrilHaze(_) => 2,
        BeerID::ObsidianImperialStout(_) => 3
    }
}

fn get_recipe(beer_id: BeerID) -> Recipe {
    match beer_id {
        BeerID::None(_) => Recipe { citra: 0, chinook: 0, galaxy: 0 },
        BeerID::DragonHideBlazeIPA(_) => Recipe { citra: 5, chinook: 3, galaxy: 2 },
        BeerID::MithrilHaze(_) => Recipe { citra: 1, chinook: 6, galaxy: 3 },
        BeerID::ObsidianImperialStout(_) => Recipe { citra: 2, chinook: 6, galaxy: 2 }
    }
}
// this is the unique id for the beer type
fn get_beer_identifier_id(beer_id: BeerID) -> felt252 {
    match beer_id {
        BeerID::None(_) => 0,
        BeerID::DragonHideBlazeIPA(_) => beers::DRAGON_HIDE_BLAZE_IPA,
        BeerID::MithrilHaze(_) => beers::MITHRIL_HAZE,
        BeerID::ObsidianImperialStout(_) => beers::OBSIDIAN_IMPERIAL_STOUT
    }
}
