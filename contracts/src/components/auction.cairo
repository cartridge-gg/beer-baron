use cubit::f128::types::fixed::{Fixed, FixedTrait};
use starknet::{ContractAddress, get_block_timestamp};
use dojo_defi::dutch_auction::vrgda::{LogisticVRGDA, LogisticVRGDATrait};
use core::traits::{Into};
use beer_barron::vrgda::vrgda::{ReverseLinearVRGDA, ReverseLinearVRGDATrait};

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
        LogisticVRGDA {
            target_price: self.target_price,
            decay_constant: self.decay_constant,
            max_sellable: self.max_sellable,
            time_scale: self.time_scale
        }
    }
    fn get_price(self: Auction) -> Fixed {
        // time since auction start

        let time_since_start: u128 = get_block_timestamp().into() - self.start_time.into();
        // get current price
        self
            .to_LogisticVRGDA()
            .get_vrgda_price(
                FixedTrait::new_unscaled(time_since_start / 60, false), // time since start
                FixedTrait::new_unscaled(self.sold, false) // amount sold
            )
    }
}


#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct TavernAuction {
    #[key]
    game_id: u64,
    #[key]
    item_id: u128,
    target_price: Fixed,
    decay_constant: Fixed,
    per_time_unit: Fixed,
    start_time: u64,
    sold: u128,
}

#[generate_trait]
impl ImplTavernAuction of TavernAuctionTrait {
    fn to_ReverseLinearVRGDA(self: TavernAuction) -> ReverseLinearVRGDA {
        ReverseLinearVRGDA {
            target_price: self.target_price,
            decay_constant: self.decay_constant,
            per_time_unit: self.per_time_unit
        }
    }
    fn get_price(self: TavernAuction) -> Fixed {
        // time since auction start
        let time_since_start: u128 = get_block_timestamp().into() - self.start_time.into();

        // get current price
        self
            .to_ReverseLinearVRGDA()
            .get_reverse_vrgda_price(
                FixedTrait::new_unscaled(time_since_start / 60, false), // time since start
                FixedTrait::new_unscaled(self.sold, false) // amount sold
            )
    }
}


impl SerdeLenFixed of dojo::serde::SerdeLen<Fixed> {
    #[inline(always)]
    fn len() -> usize {
        2
    }
}
