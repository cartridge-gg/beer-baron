use starknet::ContractAddress;
use dojo_defi::dutch_auction::vrgda::{LogisticVRGDA};
use cubit::f128::types::fixed::{Fixed, FixedTrait};


#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct GoldBalance {
    #[key]
    game_id: u64,
    #[key]
    player_id: ContractAddress,
    balance: u128,
}

// All Items use this, they are internal tokens
#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct ItemBalance {
    #[key]
    game_id: u64,
    #[key]
    player_id: ContractAddress,
    #[key]
    item_id: u128,
    balance: u128,
}

