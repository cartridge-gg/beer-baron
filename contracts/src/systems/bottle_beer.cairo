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

    use beer_barron::components::game::{Game, GameTracker, GameTrait};
    use beer_barron::components::player::{Player};
    use beer_barron::components::player::{FarmArea};
    use beer_barron::components::balances::{ItemBalance};

    use beer_barron::components::beer::{
        Brew, BrewTrait, BrewBatchTrack, Recipe, BeerID, get_beer_identifier_id, BrewStatus
    };
    use beer_barron::constants::{
        GAME_CONFIG, hops, hops_grown, beers, BREW_TIME, BREW_YEILD_LITRES
    };

    // TODO: Remove Beer ID from this, can get it from the batch
    fn execute(ctx: Context, game_id: u64, beer_id: BeerID, batch_id: u64) {
        // assert that the game is active
        let game = get!(ctx.world, (game_id), (Game));
        game.active();

        // assert batch is built and brewed
        let mut batch = get!(ctx.world, (game_id, ctx.origin, batch_id), (Brew));
        batch.assert_built();
        batch.assert_brewed();

        // bottle batch
        batch.status = BrewStatus::bottled;

        let mut inventory = get!(
            ctx.world, (game_id, ctx.origin, get_beer_identifier_id(beer_id)), (ItemBalance)
        );

        inventory.balance += BREW_YEILD_LITRES.try_into().unwrap();

        set!(ctx.world, (inventory, batch));
    }
}
