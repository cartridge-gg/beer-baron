use starknet::{ContractAddress, get_block_timestamp, get_caller_address};
use serde::Serde;
use beer_barron::constants::{GAME_CONFIG, BREW_TIME, CONFIG::{ITEM_IDS::{BEERS}}};
use traits::{Into, TryInto};
use option::OptionTrait;

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

mod BrewStatus {
    const not_started: u64 = 0;
    const brewing: u64 = 1;
    const bottled: u64 = 2;
}

#[generate_trait]
impl ImplBrew of BrewTrait {
    fn assert_built(self: Brew) {
        assert(self.status == BrewStatus::brewing, 'BREW: not ready');
    }
    fn assert_brewed(self: Brew) {
        let time_since_build = get_block_timestamp() - self.time_built;
        assert(time_since_build > BREW_TIME.try_into().unwrap(), 'beer is not ready');
    }
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


// We use a helper ENUM here so we can match on the beer_id in the inputs

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
        BeerID::DragonHideBlazeIPA(_) => BEERS::DRAGON_HIDE_BLAZE_IPA.try_into().unwrap(),
        BeerID::MithrilHaze(_) => BEERS::MITHRIL_HAZE.try_into().unwrap(),
        BeerID::ObsidianImperialStout(_) => BEERS::OBSIDIAN_IMPERIAL_STOUT.try_into().unwrap()
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
