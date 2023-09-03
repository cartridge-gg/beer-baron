#[system]
mod sell_beer {
    use core::debug::PrintTrait;
    use array::ArrayTrait;
    use core::traits::{Into, TryInto};
    use option::OptionTrait;
    use starknet::{ContractAddress, get_block_timestamp};

    use beer_barron::components::auction::{TavernAuction, TavernAuctionTrait};
    use beer_barron::components::balances::{GoldBalance, ItemBalance};
    use beer_barron::components::game::{Game};
    use beer_barron::components::beer::{
        Brew, BrewBatchTrack, Recipe, BeerID, get_beer_identifier_id
    };
    use beer_barron::vrgda::vrgda::{ReverseLinearVRGDA, ReverseLinearVRGDATrait};

    use cubit::f128::types::fixed::{Fixed, FixedTrait, ONE};
    use dojo::world::Context;

    // beer id
    // amount = litres of beer
    fn execute(ctx: Context, game_id: u64, beer_id: BeerID, amount: u128) {
        let mut game = get!(ctx.world, (game_id), (Game));
        assert(game.status, 'game is not running');

        let mut auction = get!(
            ctx.world, (game_id, get_beer_identifier_id(beer_id)).into(), (TavernAuction)
        );
        let mut player_gold_balance = get!(ctx.world, (game_id, ctx.origin), GoldBalance);
        let mut player_item_balance = get!(
            ctx.world, (game_id, ctx.origin, get_beer_identifier_id(beer_id)), ItemBalance
        );

        let VRGDA = auction.to_ReverseLinearVRGDA();

        // get current price
        let time_since_start: u128 = get_block_timestamp().into() - auction.start_time.into();

        // get current price
        let price = VRGDA
            .get_reverse_vrgda_price(
                FixedTrait::new((time_since_start), false), // time since start
                FixedTrait::new(auction.sold, false) // amount sold
            );

        auction.sold += amount;

        // // we sell beer into the auction and in return get gold
        player_gold_balance.balance += price.try_into().unwrap() * amount;
        player_item_balance.balance -= amount;

        set!(ctx.world, (auction, player_gold_balance, player_item_balance));
    }
}
