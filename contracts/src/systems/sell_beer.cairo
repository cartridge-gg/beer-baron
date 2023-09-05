#[system]
mod sell_beer {
    use core::debug::PrintTrait;
    use array::ArrayTrait;
    use core::traits::{Into, TryInto};
    use option::OptionTrait;
    use starknet::{ContractAddress, get_block_timestamp};

    use beer_barron::components::auction::{TavernAuction, TavernAuctionTrait};
    use beer_barron::components::balances::{ItemBalance, ItemBalanceTrait};
    use beer_barron::components::game::{Game, GameTrait};
    use beer_barron::components::beer::{
        Brew, BrewBatchTrack, Recipe, BeerID, get_beer_identifier_id
    };
    use beer_barron::vrgda::vrgda::{ReverseLinearVRGDA, ReverseLinearVRGDATrait};

    use cubit::f128::types::fixed::{Fixed, FixedTrait, ONE};
    use dojo::world::Context;

    use beer_barron::constants::GOLD_ID;

    // beer id
    // amount = litres of beer
    fn execute(ctx: Context, game_id: u64, beer_id: BeerID, amount: u128) {
        // assert that the game is active
        let game = get!(ctx.world, (game_id), (Game));
        game.active();

        let mut auction = get!(
            ctx.world, (game_id, get_beer_identifier_id(beer_id)).into(), (TavernAuction)
        );
        let mut gold_balance = get!(ctx.world, (game_id, ctx.origin, GOLD_ID), ItemBalance);
        let mut item_balance = get!(
            ctx.world, (game_id, ctx.origin, get_beer_identifier_id(beer_id)), ItemBalance
        );

        auction.sold += amount;

        // we sell beer into the auction and in return get gold
        gold_balance.add(auction.get_price().try_into().unwrap() * amount);

        // we remove the beer amount from the player
        item_balance.sub(amount);

        set!(ctx.world, (auction, gold_balance, item_balance));
    }
}
