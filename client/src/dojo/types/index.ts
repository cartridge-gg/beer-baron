import { Account, num } from "starknet";
import { Beers } from "../gameConfig";

export interface SystemSigner {
    account: Account
}

export interface JoinGameProps extends SystemSigner {
    game_id: num.BigNumberish
    name: num.BigNumberish
}

export interface GameIdProps extends SystemSigner {
    game_id: number;
}

export interface JoinGameProps extends SystemSigner {
    game_id: num.BigNumberish;
    name: num.BigNumberish;
}

export interface ViewPriceProps {
    game_id: number;
    item_id: number;
}

export interface BuyHopsProps extends SystemSigner {
    game_id: number;
    item_id: number;
    amount: number;
}

export interface FarmProps extends SystemSigner {
    game_id: number;
    area_type: Array<num.BigNumberish>;
}

export interface BrewBeerProps extends SystemSigner {
    game_id: number;
    beer_id: Beers;
}

export interface BottleBeerProps extends BrewBeerProps {
    batch_id: number;
}

export interface SellBeerProps extends BrewBeerProps {
    amount: number;
}