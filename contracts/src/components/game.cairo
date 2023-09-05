#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Game {
    #[key]
    game_id: u64,
    start_time: u64,
    status: u64,
    number_players: u32,
}

mod GameStatus {
    const Created: u64 = 1;
    const Lobby: u64 = 2;
    const Started: u64 = 3;
}

#[generate_trait]
impl ImplGame of GameTrait {
    fn active(self: Game) {
        assert(self.status == GameStatus::Started, 'GAME: Not active');
    }
    fn lobby(self: Game) {
        assert(self.status == GameStatus::Lobby, 'GAME: Not in lobby');
    }
    fn created(self: Game) {
        assert(self.status == GameStatus::Created, 'GAME: Not created');
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
    owner: felt252
}
