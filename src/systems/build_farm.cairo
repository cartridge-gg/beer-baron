#[system]
mod build_farm {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::{Into, TryInto};
    use dojo::world::Context;
    use option::OptionTrait;
    use starknet::{ContractAddress, get_block_timestamp, get_caller_address};

    use beer_barron::components::game::{Game, GameTracker};
    use beer_barron::components::player::{Player};
    use beer_barron::components::player::{FarmArea};

    use beer_barron::constants::{GAME_CONFIG, hops};


    fn execute(ctx: Context, game_id: u64, area_type: Array<u64>) {
        let mut game = get!(ctx.world, (game_id), (Game));
        assert(game.status, 'game is not running');
        // TODO: assert that caller is player 

        assert(area_type.len() == 6, 'you must submit 6 areas');

        // MAX AREAS = 6
        let mut area_id: usize = 0;

        // loop through all areas
        loop {
            if area_id >= area_type.len() {
                break;
            }

            if *area_type[area_id] != 0 {
                let area_type = *area_type[area_id];
                let time_built = get_block_timestamp();

                set!(
                    ctx.world,
                    FarmArea {
                        game_id,
                        player_id: ctx.origin,
                        area_id: area_id.into(),
                        area_type,
                        time_built
                    }
                );
            }

            area_id += 1;
        }
    }
}
