#[system]
mod create_game {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::{Into, TryInto};
    use dojo::world::Context;
    use option::OptionTrait;
    use starknet::{get_block_timestamp};

    use beer_barron::components::game::{Game, GameTracker, GameStatus, GameTrait, Ownership};
    use beer_barron::constants::GAME_CONFIG;


    // Creates a new game
    // increments game id
    // sets game tracker
    fn execute(ctx: Context) -> u64 {
        let mut game_tracker = get!(ctx.world, (GAME_CONFIG), (GameTracker));

        let count: u64 = (game_tracker.count + 1).into(); // game id increment

        let start_time = get_block_timestamp(); // blocknumber
        let status = GameStatus::Lobby; // game status
        let number_players = 0; // number of players

        // set game
        set!(ctx.world, (Game { game_id: count, start_time, status, number_players }));

        // set game tracker
        set!(
            ctx.world,
            (GameTracker { entity_id: GAME_CONFIG.try_into().unwrap(), count: count.into() })
        );

        // set ownership
        set!(ctx.world, (Ownership { entity_id: count, owner: ctx.origin.into() }));

        count
    }
}

#[system]
mod join_game {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::{Into, TryInto};
    use dojo::world::Context;
    use option::OptionTrait;
    use starknet::{ContractAddress, get_block_timestamp, get_caller_address};

    use beer_barron::components::game::{Game, GameTracker, GameTrait};
    use beer_barron::components::player::{Player};
    use beer_barron::components::balances::{ItemBalance};

    use beer_barron::constants::{GAME_CONFIG, STARTING_BALANCE, CONFIG::{ITEM_IDS::{GOLD_ID}}};

    // adds player to the game
    // TODO: Add Lords Deposit
    fn execute(ctx: Context, game_id: u64, name: felt252) -> ContractAddress {
        // Assert game in lobby
        let mut game = get!(ctx.world, (game_id), (Game));
        game.lobby();

        // increase number of players
        game.number_players += 1;
        set!(ctx.world, (game));

        // add player to game with compound key
        let player_id = ctx.origin;
        set!(ctx.world, (Player { game_id, player_id, name }));

        set!(
            ctx.world,
            (ItemBalance {
                game_id: game_id,
                player_id: player_id,
                item_id: GOLD_ID.try_into().unwrap(),
                balance: STARTING_BALANCE.try_into().unwrap()
            })
        );

        ctx.origin
    }
}

//
// TODO:
//
#[system]
mod start_game {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::{Into, TryInto};
    use dojo::world::Context;
    use option::OptionTrait;
    use starknet::{ContractAddress, get_block_timestamp, get_caller_address};

    use beer_barron::components::game::{Game, GameTracker, GameTrait, GameStatus};
    use beer_barron::components::player::{Player};

    use beer_barron::constants::{GAME_CONFIG, CONFIG::{ITEM_IDS::{HOP_SEEDS, BEERS}}};

    // adds player to the game
    // TODO: Add Lords Deposit
    fn execute(ctx: Context, game_id: u64) {
        // Check if game exists and in lobby stage
        let mut game = get!(ctx.world, (game_id), (Game));
        game.lobby();

        let number_players = game.number_players + 1;

        set!(
            ctx.world,
            (Game {
                game_id, start_time: game.start_time, status: GameStatus::Started, number_players
            })
        );

        // Start hop auctions
        ctx.world.execute('start_hops_auction', array![game_id.into(), HOP_SEEDS::CHINOOK.into()]);
        ctx.world.execute('start_hops_auction', array![game_id.into(), HOP_SEEDS::CITRA.into()]);
        ctx.world.execute('start_hops_auction', array![game_id.into(), HOP_SEEDS::GALAXY.into()]);

        // start beer auctions
        ctx
            .world
            .execute(
                'start_beer_auction', array![game_id.into(), BEERS::DRAGON_HIDE_BLAZE_IPA.into()]
            );
        ctx.world.execute('start_beer_auction', array![game_id.into(), BEERS::MITHRIL_HAZE.into()]);
        ctx
            .world
            .execute(
                'start_beer_auction', array![game_id.into(), BEERS::OBSIDIAN_IMPERIAL_STOUT.into()]
            );
    }
}
