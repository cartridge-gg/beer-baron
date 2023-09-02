#[system]
mod buy_hops {
    use core::debug::PrintTrait;
    use array::ArrayTrait;
    use core::traits::{Into, TryInto};
    use option::OptionTrait;
    use starknet::{ContractAddress, get_block_timestamp};

    use cubit::f128::types::fixed::{Fixed, FixedTrait};

    use dojo::world::Context;
    use dojo_defi::dutch_auction::vrgda::{LogisticVRGDA, LogisticVRGDATrait};

    use beer_barron::components::auction::{Auction, AuctionTrait};
    use beer_barron::components::balances::{GoldBalance, ItemBalance};

    fn execute(ctx: Context, game_id: u64, item_id: u128, amount: u128) {
        let mut auction = get!(ctx.world, (game_id, item_id), Auction);
        let mut player_gold_balance = get!(ctx.world, (game_id, ctx.origin), GoldBalance);
        let mut player_item_balance = get!(ctx.world, (game_id, ctx.origin, item_id), ItemBalance);

        // convert auction to VRGDA
        let VRGDA = auction.to_LogisticVRGDA();

        // time since auction start
        let time_since_start: u128 = get_block_timestamp().into() - auction.start_time.into();

        // get current price
        let price = VRGDA
            .get_vrgda_price(
                FixedTrait::new((time_since_start), false), // time since start
                FixedTrait::new(auction.sold, false) // amount sold
            );

        // add to amount sold
        auction.sold += amount;

        // TODO: check this
        player_gold_balance.balance -= price.try_into().unwrap() * amount;

        player_item_balance.balance += amount;

        set!(ctx.world, (auction, player_gold_balance, player_item_balance));
    }
}
