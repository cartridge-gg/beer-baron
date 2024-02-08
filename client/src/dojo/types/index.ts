import { Account, num } from 'starknet';
import { BeerID } from '@/ui/components/BeerCard';

export interface SystemSigner {
    account: Account;
}

export interface CreateGameProps extends SystemSigner {
    max_players: num.BigNumberish;
    game_length: num.BigNumberish;
    password: num.BigNumberish;
    entry_fee: num.BigNumberish;
}

export interface JoinGameProps extends SystemSigner {
    game_id: num.BigNumberish;
    name: num.BigNumberish;
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
    beer_id: BeerID;
}

export interface BottleBeerProps extends BrewBeerProps {
    batch_id: number;
}

export interface SellBeerProps extends BrewBeerProps {
    amount: number;
}

export interface MakeTradeProps extends SystemSigner {
    game_id: number;
    item_id: number;
    quantity: number;
    price: number;
}

export interface AcceptTradeProps extends SystemSigner {
    game_id: number;
    trade_id: number;
}

export interface CancelTradeProps extends SystemSigner {
    game_id: number;
    trade_id: number;
}

export interface PlaceIndulgencesBidProps extends SystemSigner {
    game_id: number;
    price: number;
}

export interface ClaimIndulgenceProps extends SystemSigner {
    game_id: number;
}
