#[system]
mod create_game {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::{Into, TryInto};
    use dojo::world::Context;
    use option::OptionTrait;
    use starknet::{ContractAddress, get_block_timestamp};

    use beer_barron::components::game::{Game, GameTracker};

    use beer_barron::constants::GAME_CONFIG;


    // Creates a new game
    // increments game id
    // sets game tracker
    fn execute(ctx: Context) -> u64 {
        let mut game_tracker = get!(ctx.world, (GAME_CONFIG), (GameTracker));

        let count: u64 = (game_tracker.count + 1).into(); // game id increment

        let start_time = get_block_timestamp(); // blocknumber
        let status = true; // game status
        let number_players = 0; // number of players

        set!(ctx.world, (Game { game_id: count, start_time, status, number_players }));

        set!(
            ctx.world,
            (GameTracker { entity_id: GAME_CONFIG.try_into().unwrap(), count: count.into() })
        );

        // Emit World Event
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

    use beer_barron::components::game::{Game, GameTracker};
    use beer_barron::components::player::{Player};
    use beer_barron::components::balances::{GoldBalance};

    use beer_barron::constants::{GAME_CONFIG, STARTING_BALANCE};

    // adds player to the game
    // TODO: Add Lords Deposit
    fn execute(ctx: Context, game_id: u64, name: felt252) -> ContractAddress {
        // Check if game exists
        let mut game = get!(ctx.world, (game_id), (Game));
        assert(game.status, 'game is not running');

        // increase number of players
        game.number_players += 1;
        set!(ctx.world, (game));

        // add player to game with compound key
        let player_id = ctx.origin;
        set!(ctx.world, (Player { game_id, player_id, name }));

        // Set player balance
        let balance: u128 = STARTING_BALANCE.try_into().unwrap();
        set!(ctx.world, (GoldBalance { game_id, player_id, balance }));

        ctx.origin
    }
}

//
// TODO:
//
#[system]
mod start_game {
    // use dojo::world::IWorldDispatcherTrait;
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::{Into, TryInto};
    use dojo::world::Context;
    use option::OptionTrait;
    use starknet::{ContractAddress, get_block_timestamp, get_caller_address};

    use beer_barron::components::game::{Game, GameTracker};
    use beer_barron::components::player::{Player};

    use beer_barron::constants::{GAME_CONFIG, hops, beers};

    // adds player to the game
    // TODO: Add Lords Deposit
    fn execute(ctx: Context, game_id: u64) {
        // Check if game exists
        let mut game = get!(ctx.world, (game_id), (Game));
        assert(game.status, 'game is not running');

        // Start hop auctions
        ctx.world.execute('start_hops_auction', array![game_id.into(), hops::CHINOOK.into()]);
        ctx.world.execute('start_hops_auction', array![game_id.into(), hops::CITRA.into()]);
        ctx.world.execute('start_hops_auction', array![game_id.into(), hops::GALAXY.into()]);

        // start beer auctions
        ctx
            .world
            .execute(
                'start_beer_auction', array![game_id.into(), beers::DRAGON_HIDE_BLAZE_IPA.into()]
            );
        ctx.world.execute('start_beer_auction', array![game_id.into(), beers::MITHRIL_HAZE.into()]);
        // change status to active
        game.status == true;
        set!(ctx.world, (game));
    }
}
