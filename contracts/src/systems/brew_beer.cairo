#[system]
mod brew_beer {
    use array::ArrayTrait;
    use array::SpanTrait;
    use box::BoxTrait;
    use traits::{Into, TryInto};
    use dojo::world::Context;
    use option::OptionTrait;
    use debug::PrintTrait;
    use starknet::{ContractAddress, get_block_timestamp, get_caller_address};

    use beer_barron::components::game::{Game, GameTracker, GameTrait};
    use beer_barron::components::balances::{ItemBalance, ItemBalanceTrait};

    use beer_barron::components::beer::{
        Brew, BrewBatchTrack, Recipe, BeerID, get_beer_id_from_enum, get_recipe,
        get_beer_identifier_id, BrewStatus
    };

    use beer_barron::constants::{GAME_CONFIG, hops, hops_grown, beers};

    fn execute(ctx: Context, game_id: u64, beer_id: BeerID) {
        // assert that the game is active
        let game = get!(ctx.world, (game_id), (Game));
        game.active();

        let beer_recipe = get_recipe(beer_id);

        let mut citra_balance = get!(
            ctx.world, (game_id, ctx.origin, hops_grown::CITRA), (ItemBalance)
        );
        citra_balance.assert_balance(beer_recipe.chinook.into());
        citra_balance.sub(beer_recipe.citra.into());

        let mut chinook_balance = get!(
            ctx.world, (game_id, ctx.origin, hops_grown::CHINOOK), (ItemBalance)
        );
        chinook_balance.assert_balance(beer_recipe.chinook.into());
        chinook_balance.sub(beer_recipe.chinook.into());

        let mut galaxy_balance = get!(
            ctx.world, (game_id, ctx.origin, hops_grown::GALAXY), (ItemBalance)
        );
        galaxy_balance.assert_balance(beer_recipe.galaxy.into());
        galaxy_balance.sub(beer_recipe.galaxy.into());

        // create unique batch number for the game
        let mut batch_count = get!(ctx.world, (game_id), (BrewBatchTrack));
        batch_count.count += 1;

        // create batch with current timestamp
        let brew_batch = Brew {
            game_id,
            player_id: ctx.origin,
            batch_id: batch_count.count,
            batch_key: batch_count.count,
            owner: ctx.origin,
            beer_id: get_beer_id_from_enum(beer_id),
            time_built: get_block_timestamp(),
            status: BrewStatus::brewing,
        };

        set!(ctx.world, (brew_batch, batch_count, citra_balance, chinook_balance, galaxy_balance));
    }
}
