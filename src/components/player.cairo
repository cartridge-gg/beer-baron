use starknet::ContractAddress;

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Player {
    #[key]
    game_id: u64,
    #[key]
    player_id: ContractAddress,
    name: felt252
}

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct FarmArea {
    #[key]
    game_id: u64,
    #[key]
    player_id: ContractAddress,
    #[key]
    area_id: u64,
    area_type: u64,
    time_built: u64,
}

