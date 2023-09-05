#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Game {
    #[key]
    game_id: u64,
    start_time: u64,
    status: bool,
    number_players: u32,
}

#[generate_trait]
impl ImplGame of GameTrait {
    fn active(self: Game) {
        assert(self.status, 'GAME: Not active');
    }
}

// Config Components ---------------------------------------------------------------------

// This will track the number of games played
#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct GameTracker {
    #[key]
    entity_id: u64, // FIXED
    count: u64
}

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Ownership {
    #[key]
    entity_id: u64, // FIXED
    #[key]
    game_id: u32, // increment
    address: felt252
}
