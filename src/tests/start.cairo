#[cfg(test)]
mod test {
    use traits::{Into, TryInto};
    use core::result::ResultTrait;
    use array::{ArrayTrait, SpanTrait};
    use option::OptionTrait;
    use box::BoxTrait;
    use clone::Clone;
    use debug::PrintTrait;
    use starknet::{ContractAddress, get_block_timestamp, get_caller_address};

    // dojo core imports
    use dojo::world::{IWorldDispatcherTrait, IWorldDispatcher};
    use dojo::test_utils::spawn_test_world;

    // project imports
    use beer_barron::components::auction::{Auction, AuctionTrait, auction};
    use beer_barron::components::balances::{gold_balance, GoldBalance, ItemBalance, item_balance,};

    // systems
    use beer_barron::systems::buy_hops::{buy_hops};
    use beer_barron::systems::start_hops_auction::{start_hops_auction};
    use beer_barron::systems::game::{start_game, join_game, create_game};

    // consts
    use beer_barron::constants::{GAME_CONFIG, hops, STARTING_BALANCE};

    fn setup() -> IWorldDispatcher {
        // components
        let mut components = array![
            gold_balance::TEST_CLASS_HASH, item_balance::TEST_CLASS_HASH, auction::TEST_CLASS_HASH
        ];

        // // systems
        let mut systems = array![
            buy_hops::TEST_CLASS_HASH,
            start_hops_auction::TEST_CLASS_HASH,
            start_game::TEST_CLASS_HASH,
            join_game::TEST_CLASS_HASH,
            create_game::TEST_CLASS_HASH
        ];

        // deploy executor, world and register components/systems
        spawn_test_world(components, systems)
    }


    fn create_start() -> (IWorldDispatcher, u64, ContractAddress) {
        let mut world = setup();

        let game_id = 1;
        let item_id = 1;
        let amount = 1;
        let name = 123;
        let mut res = world.execute('create_game', array![]);
        assert(res.len() > 0, 'did not spawn');

        let game_id = serde::Serde::<u64>::deserialize(ref res).expect('create des failed');

        let mut join_game = world.execute('join_game', array![game_id.into(), name]);
        let player_id = serde::Serde::<ContractAddress>::deserialize(ref join_game)
            .expect('id des failed');

        starknet::testing::set_block_timestamp(1);

        world.execute('start_game', array![game_id.into()]);

        let auction_GALAXY = get!(world, (game_id, hops::GALAXY).into(), (Auction));
        let auction_CHINOOK = get!(world, (game_id, hops::CHINOOK).into(), (Auction));
        let auction_CHINOOK = get!(world, (game_id, hops::CHINOOK).into(), (Auction));

        assert(auction_GALAXY.start_time > 0, 'auction not started');
        assert(auction_CHINOOK.start_time > 0, 'auction not started');
        assert(auction_CHINOOK.start_time > 0, 'auction not started');

        (world, game_id, player_id)
    }

    #[test]
    #[available_gas(600000000)]
    fn test_start() {
        let (world, game_id, player_id) = create_start();
    }

    #[test]
    #[available_gas(600000000)]
    fn test_buy_hops() {
        let (world, game_id, player_id) = create_start();

        let buy_quantity = 1;

        // TODO: Make Better - we know it's just working basically
        world.execute('buy_hops', array![game_id.into(), hops::GALAXY.into(), buy_quantity]);

        let player_balance = get!(world, (game_id, player_id).into(), (GoldBalance));
        assert(
            player_balance.balance < STARTING_BALANCE.try_into().unwrap(), 'balance not updated'
        );
    }
}

