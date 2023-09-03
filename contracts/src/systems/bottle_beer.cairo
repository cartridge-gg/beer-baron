#[system]
mod bottle_beer {
    use array::ArrayTrait;
    use array::SpanTrait;
    use box::BoxTrait;
    use traits::{Into, TryInto};
    use dojo::world::Context;
    use option::OptionTrait;
    use debug::PrintTrait;
    use starknet::{ContractAddress, get_block_timestamp, get_caller_address};

    use beer_barron::components::game::{Game, GameTracker};
    use beer_barron::components::player::{Player};
    use beer_barron::components::player::{FarmArea};
    use beer_barron::components::balances::{ItemBalance};

    use beer_barron::components::beer::{
        Brew, BrewBatchTrack, Recipe, BeerID, get_beer_identifier_id
    };
    use beer_barron::constants::{
        GAME_CONFIG, hops, hops_grown, beers, BREW_TIME, BREW_YEILD_LITRES
    };

    // TODO: Remove Beer ID from this, can get it from the batch
    fn execute(ctx: Context, game_id: u64, beer_id: BeerID, batch_id: u64) {
        let mut game = get!(ctx.world, (game_id), (Game));
        assert(game.status, 'game is not running');

        let mut batch = get!(ctx.world, (game_id, ctx.origin, batch_id), (Brew));

        assert(batch.status == 1, 'batch is not ready');

        let time_since_build = get_block_timestamp() - batch.time_built;

        assert(time_since_build > BREW_TIME.try_into().unwrap(), 'beer is not ready');

        let mut current_inventory_of_beer = get!(
            ctx.world, (game_id, ctx.origin, get_beer_identifier_id(beer_id)), (ItemBalance)
        );

        current_inventory_of_beer.balance += BREW_YEILD_LITRES.try_into().unwrap();

        // some reason batch.status == 2 does not work??
        // todo: investigate
        // this closes the batch
        batch.status += 1;

        set!(ctx.world, (current_inventory_of_beer, batch));
    }
}
