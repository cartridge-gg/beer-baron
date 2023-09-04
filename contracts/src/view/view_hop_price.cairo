#[system]
mod view_hop_price {
    use core::debug::PrintTrait;
    use array::ArrayTrait;
    use core::traits::{Into};
    use starknet::{ContractAddress, get_block_timestamp};

    use cubit::f128::types::fixed::{Fixed, FixedTrait};
    use dojo::world::Context;
    use dojo_defi::dutch_auction::vrgda::{LogisticVRGDA, LogisticVRGDATrait};

    use beer_barron::components::auction::{Auction, AuctionTrait};
    use beer_barron::components::balances::{GoldBalance};


    fn execute(ctx: Context, game_id: u64, item_id: u128) -> Fixed {
        let mut auction = get!(ctx.world, (game_id, item_id), Auction);

        // convert auction to VRGDA
        let VRGDA = auction.to_LogisticVRGDA();

        // time since auction start
        let time_since_start: u128 = get_block_timestamp().into() - auction.start_time.into();
        // get current price
        VRGDA
            .get_vrgda_price(
                FixedTrait::new_unscaled(time_since_start / 60, false), // time since start
                FixedTrait::new_unscaled(auction.sold, false) // amount sold
            )
    }
}
