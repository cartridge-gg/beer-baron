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
    use beer_barron::components::auction::{
        Auction, AuctionTrait, auction, TavernAuction, tavern_auction
    };
    use beer_barron::components::balances::{ItemBalance, item_balance};
    use beer_barron::components::game::{
        Game, GameTracker, Ownership, game, game_tracker, ownership
    };
    use beer_barron::components::beer::{Brew, BrewBatchTrack, BeerID, brew, brew_batch_track};

    use beer_barron::components::player::{Player, FarmArea, player, farm_area};


    // systems
    use beer_barron::systems::buy_hops::{buy_hops};
    use beer_barron::systems::start_hops_auction::{start_hops_auction};
    use beer_barron::systems::game::{start_game, join_game, create_game};
    use beer_barron::systems::build_farm::{build_farm};
    use beer_barron::systems::harvest_farm::{harvest_farm};
    use beer_barron::systems::brew_beer::{brew_beer};
    use beer_barron::systems::bottle_beer::{bottle_beer};
    use beer_barron::systems::start_beer_auction::{start_beer_auction};
    use beer_barron::systems::sell_beer::{sell_beer};

    // consts
    use beer_barron::constants::{
        GAME_CONFIG, STARTING_BALANCE, GOLD_ID, CONFIG::{ITEM_IDS::{HOP_SEEDS, HOP_FLOWERS, BEERS}}
    };

    fn setup() -> IWorldDispatcher {
        // components
        let mut components = array![
            item_balance::TEST_CLASS_HASH,
            auction::TEST_CLASS_HASH,
            game::TEST_CLASS_HASH,
            game_tracker::TEST_CLASS_HASH,
            ownership::TEST_CLASS_HASH,
            player::TEST_CLASS_HASH,
            farm_area::TEST_CLASS_HASH,
            brew::TEST_CLASS_HASH,
            brew_batch_track::TEST_CLASS_HASH,
            tavern_auction::TEST_CLASS_HASH
        ];

        // // systems
        let mut systems = array![
            buy_hops::TEST_CLASS_HASH,
            start_hops_auction::TEST_CLASS_HASH,
            start_game::TEST_CLASS_HASH,
            join_game::TEST_CLASS_HASH,
            create_game::TEST_CLASS_HASH,
            build_farm::TEST_CLASS_HASH,
            brew_beer::TEST_CLASS_HASH,
            harvest_farm::TEST_CLASS_HASH,
            bottle_beer::TEST_CLASS_HASH,
            start_beer_auction::TEST_CLASS_HASH,
            sell_beer::TEST_CLASS_HASH
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

        // hop auctions
        let auction_GALAXY = get!(world, (game_id, HOP_SEEDS::GALAXY).into(), (Auction));
        let auction_CHINOOK = get!(world, (game_id, HOP_SEEDS::CHINOOK).into(), (Auction));
        let auction_CITRA = get!(world, (game_id, HOP_SEEDS::CITRA).into(), (Auction));
        assert(auction_GALAXY.start_time > 0, 'auction not started');
        assert(auction_CHINOOK.start_time > 0, 'auction not started');
        assert(auction_CITRA.start_time > 0, 'auction not started');

        // beer auctions
        let dragonhide_ipa_market = get!(
            world, (game_id, BEERS::DRAGON_HIDE_BLAZE_IPA).into(), (TavernAuction)
        );
        let mithril_haze_market = get!(
            world, (game_id, BEERS::MITHRIL_HAZE).into(), (TavernAuction)
        );
        assert(dragonhide_ipa_market.start_time > 0, 'auction not started');
        assert(mithril_haze_market.start_time > 0, 'auction not started');

        (world, game_id, player_id)
    }

    fn player_buy_hops() -> (IWorldDispatcher, u64, ContractAddress) {
        let (world, game_id, player_id) = create_start();

        let buy_quantity = 10;

        // TODO: Make Better - we know it's just working basically
        world.execute('buy_hops', array![game_id.into(), HOP_SEEDS::GALAXY.into(), buy_quantity]);
        world.execute('buy_hops', array![game_id.into(), HOP_SEEDS::CITRA.into(), buy_quantity]);
        world.execute('buy_hops', array![game_id.into(), HOP_SEEDS::CHINOOK.into(), buy_quantity]);

        let player_balance = get!(world, (game_id, player_id, GOLD_ID).into(), (ItemBalance));
        assert(
            player_balance.balance < STARTING_BALANCE.try_into().unwrap(), 'balance not updated'
        );

        let galaxy_auction = get!(world, (game_id, HOP_SEEDS::GALAXY).into(), (Auction));
        assert(galaxy_auction.sold.into() == buy_quantity, 'auction not updated');

        let citra_auction = get!(world, (game_id, HOP_SEEDS::CITRA).into(), (Auction));
        assert(citra_auction.sold.into() == buy_quantity, 'auction not updated');

        let chinook_auction = get!(world, (game_id, HOP_SEEDS::CHINOOK).into(), (Auction));
        assert(chinook_auction.sold.into() == buy_quantity, 'auction not updated');

        (world, game_id, player_id)
    }

    fn player_build_farm() -> (IWorldDispatcher, u64, ContractAddress) {
        let (world, game_id, player_id) = player_buy_hops();

        let crop: felt252 = 0;

        let mut calldata = Default::default();
        Serde::serialize(@game_id, ref calldata);
        Serde::serialize(
            @array![
                HOP_SEEDS::GALAXY.into(),
                HOP_SEEDS::CITRA.into(),
                HOP_SEEDS::CHINOOK.into(),
                crop,
                crop,
                crop
            ],
            ref calldata
        );

        world.execute('build_farm', calldata);
        (world, game_id, player_id)
    }

    fn player_harvest_farm() -> (IWorldDispatcher, u64, ContractAddress) {
        let (world, game_id, player_id) = player_build_farm();

        let crop: felt252 = 0;

        let mut calldata = Default::default();
        Serde::serialize(@game_id, ref calldata);

        starknet::testing::set_block_timestamp(2000);

        world.execute('harvest_farm', calldata);
        (world, game_id, player_id)
    }

    fn player_brew_beer() -> (IWorldDispatcher, u64, ContractAddress) {
        let (world, game_id, player_id) = player_harvest_farm();

        world.execute('brew_beer', array![game_id.into(), 1]);
        (world, game_id, player_id)
    }

    fn player_bottle_beer() -> (IWorldDispatcher, u64, ContractAddress) {
        let (world, game_id, player_id) = player_brew_beer();

        starknet::testing::set_block_timestamp(4000);

        // game_id, beer_id, batch_id - hardcoded
        world.execute('bottle_beer', array![game_id.into(), 1]);

        let batch = get!(world, (game_id, player_id, 1).into(), (Brew));

        assert(batch.status == 2, 'batch not updated');

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
        let (world, game_id, player_id) = player_buy_hops();
    }

    #[test]
    #[available_gas(600000000)]
    fn test_build_farm() {
        let (world, game_id, player_id) = player_build_farm();
    }

    #[test]
    #[available_gas(600000000)]
    fn test_harvest_farm() {
        let (world, game_id, player_id) = player_harvest_farm();
    }

    #[test]
    #[available_gas(600000000)]
    fn test_brew_beer() {
        let (world, game_id, player_id) = player_brew_beer();
    }

    #[test]
    #[available_gas(600000000)]
    fn test_bottle_beer() {
        let (world, game_id, player_id) = player_bottle_beer();
    }

    #[test]
    #[available_gas(600000000)]
    fn test_sell_beer() {
        let (world, game_id, player_id) = player_bottle_beer();

        world.execute('sell_beer', array![game_id.into(), 1, 1]);
    }
}

