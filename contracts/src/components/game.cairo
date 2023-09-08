#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Game {
    #[key]
    game_id: u64,
    start_time: u64,
    status: u64,
    number_players: u32,
    max_players: u32,
    game_length: u32, // seconds
    password: felt252, // 0 for no password
    entry_fee: u32,
}

mod GameStatus {
    const Created: u64 = 1;
    const Lobby: u64 = 2;
    const Started: u64 = 3;
}

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Joined {
    #[key]
    game_id: u64,
    #[key]
    address: felt252,
    joined: bool
}

// To use for params in create_game system
#[derive(Copy, Drop, Serde)]
struct GameConfig {
    max_players: u32,
    game_length: u32, // seconds
    password: felt252, // 0 for no password
    entry_fee: u32, // 0 for no entry fee
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
    fn check_password(self: Game, password: felt252) {
        assert(self.password == password, 'GAME: Incorrect password');
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
