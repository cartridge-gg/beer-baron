use beer_barron::components::balances::{ItemBalance, ItemBalanceTrait};

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Trade {
    #[key]
    entity_id: u64, // uuid trade number
    game_id: u64,
    item_id: u128,
    quantity: u128,
    price: u128,
    status: u8
}

mod TradeStatus {
    const OPEN: u8 = 1;
    const ACCEPTED: u8 = 2;
    const CANCELLED: u8 = 0;
}

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct TradeTrack {
    #[key]
    game_id: u64,
    count: u64
}

#[generate_trait]
impl ImplTrade of TradeTrait {
    fn accept_trade(
        ref self: Trade,
        ref buyer_gold_balance: ItemBalance,
        ref seller_gold_balance: ItemBalance,
        ref buyer_item_balance: ItemBalance,
        game_id: u64
    ) {
        assert(self.status == TradeStatus::OPEN, 'Trade is not open');
        assert(self.quantity > 0, 'Trade quantity is 0');
        assert(buyer_gold_balance.balance >= self.price, 'not enough gold');
        assert(self.game_id == game_id, 'game id does not match');

        // update gold
        buyer_gold_balance.sub(self.price);
        seller_gold_balance.add(self.price);

        // update item balance
        buyer_item_balance.add(self.quantity);

        // update trade status
        self.status = TradeStatus::ACCEPTED;
    }
    fn create_trade(ref self: Trade, ref item_balance: ItemBalance) {
        assert(item_balance.balance >= self.quantity, 'not enough items');

        // update item balance and add to trade
        item_balance.sub(self.quantity);
    }
    fn cancel_trade(ref self: Trade, ref item_balance: ItemBalance) {
        assert(self.status == TradeStatus::OPEN, 'Trade is not open');

        // update item balance and add to trade
        item_balance.add(self.quantity);

        // update trade status
        self.status = TradeStatus::CANCELLED;
    }
}

#[test]
#[available_gas(600000000)]
fn test_trade() {
    let game_id = 1;

    let price = 100;
    let quantity = 100;
    let item_id = 1;

    // seller
    let mut seller_gold_balance = ItemBalance {
        game_id, player_id: 2.try_into().unwrap(), item_id: 999, balance: 0
    };
    let mut seller_item_balance = ItemBalance {
        game_id, player_id: 2.try_into().unwrap(), item_id, balance: quantity
    };

    // trade
    let mut trade = Trade {
        entity_id: 1, game_id, item_id, quantity, price, status: TradeStatus::OPEN
    };

    trade.create_trade(ref seller_item_balance);
    assert(seller_item_balance.balance == 0, 'seller item balance is not 0');

    // buyer
    let mut buyer_gold_balance = ItemBalance {
        game_id, player_id: 1.try_into().unwrap(), item_id: 999, balance: 100
    };
    let mut buyer_item_balance = ItemBalance {
        game_id, player_id: 1.try_into().unwrap(), item_id, balance: 0
    };

    assert(buyer_gold_balance.balance == price, 'buyer gold balance is not 100');
    assert(buyer_item_balance.balance == 0, 'buyer item balance is not 0');

    trade
        .accept_trade(
            ref buyer_gold_balance, ref seller_gold_balance, ref buyer_item_balance, game_id
        );

    assert(buyer_gold_balance.balance == 0, 'buyer gold balance is not 0');
    assert(seller_gold_balance.balance == price, 'seller gold balance is not 100');
    assert(buyer_item_balance.balance == quantity, 'buyer item balance is not 100');
}
