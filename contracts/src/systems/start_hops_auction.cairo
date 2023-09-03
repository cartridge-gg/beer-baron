#[system]
mod start_hops_auction {
    use array::ArrayTrait;
    use core::traits::{Into, TryInto};
    use option::OptionTrait;
    use starknet::{ContractAddress, get_block_timestamp};

    use beer_barron::components::auction::{Auction, AuctionTrait};
    use beer_barron::components::balances::{GoldBalance};
    use beer_barron::components::game::{Game};

    use cubit::f128::types::fixed::{Fixed, FixedTrait};
    use dojo::world::Context;
    use dojo_defi::dutch_auction::vrgda::{LogisticVRGDA};

    const target_price: u128 = 10;
    const _0_31: u128 = 10718490662849961000; // 0.31
    const MAX_SELLABLE: u128 = 9000;
    const _0_0023: u128 = 42427511369531970; // 0.0023

    fn execute(ctx: Context, game_id: u64, item_id: u128) {
        // todo: check if auction already exists
        // todo: check game exists
        let mut game = get!(ctx.world, (game_id), (Game));
        // assert(game.status, 'game is not running');

        let auction = Auction {
            game_id,
            item_id,
            target_price: FixedTrait::new_unscaled(target_price, false).into(),
            decay_constant: FixedTrait::new(_0_31, false),
            max_sellable: FixedTrait::new_unscaled(MAX_SELLABLE, false),
            time_scale: FixedTrait::new(_0_0023, false),
            start_time: get_block_timestamp(), //update to timestamp
            sold: 0,
        };

        set!(ctx.world, (auction));
    }
}
