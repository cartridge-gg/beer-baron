use starknet::ContractAddress;
use dojo_defi::dutch_auction::vrgda::{LogisticVRGDA};
use cubit::f128::types::fixed::{Fixed, FixedTrait};

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Auction {
    #[key]
    game_id: u64,
    #[key]
    item_id: u128,
    target_price: Fixed,
    decay_constant: Fixed,
    max_sellable: Fixed,
    time_scale: Fixed,
    start_time: u64,
    sold: u128,
}

// we generate a trait here so we can construct the LogisticVRGDA from the remote library
#[generate_trait]
impl ImplAuction of AuctionTrait {
    fn to_LogisticVRGDA(self: Auction) -> LogisticVRGDA {
        let target_price = self.target_price;
        let decay_constant = self.decay_constant;
        let max_sellable = self.max_sellable;
        let time_scale = self.time_scale;

        LogisticVRGDA { target_price, decay_constant, max_sellable, time_scale }
    }
}


impl SerdeLenFixed of dojo::serde::SerdeLen<Fixed> {
    #[inline(always)]
    fn len() -> usize {
        2
    }
}
