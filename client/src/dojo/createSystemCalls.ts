import { SetupNetworkResult } from "./setupNetwork";
import { Account, InvokeTransactionReceiptResponse, shortString } from "starknet";
import { EntityIndex, getComponentValue, setComponent } from "@latticexyz/recs";
import { uuid } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { updatePositionWithDirection } from "../utils";
import { fromFixed } from "@/utils/fixed";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
    { execute, contractComponents, call }: SetupNetworkResult,
    // { Position, Moves }: ClientComponents
) {

    const create_game = async (signer: Account) => {

        try {
            const tx = await execute(signer, "create_game", []);
            console.log(tx)

            const receipt = await signer.waitForTransaction(tx.transaction_hash, { retryInterval: 100 })
            console.log(receipt)

        } catch (e) {
            console.log(e)
        }
    };

    const join_game = async (signer: Account, game_id: number, name: string) => {

        try {
            const tx = await execute(signer, "join_game", [game_id, name]);
            console.log('join_game', tx)
            const receipt = await signer.waitForTransaction(tx.transaction_hash, { retryInterval: 100 })
            console.log('join_game', receipt)

        } catch (e) {
            console.log(e)
        }
    };

    const start_game = async (signer: Account, game_id: number) => {

        try {
            const tx = await execute(signer, "start_game", [game_id]);
            console.log('start_game', tx)
            const receipt = await signer.waitForTransaction(tx.transaction_hash, { retryInterval: 100 })
            console.log('start_game', receipt)

        } catch (e) {
            console.log(e)
        }
    };

    const view_hop_price = async (game_id: number, item_id: number) => {

        try {
            const tx = await call("view_hop_price", [game_id, item_id]);
            console.log('view_hop_price', fromFixed(tx[0]))
            return fromFixed(tx[0])
        } catch (e) {
            console.log(e)
        }

    }
    const view_beer_price = async (game_id: number, item_id: number) => {

        try {
            const tx = await call("view_beer_price", [game_id, item_id]);
            console.log('view_beer_price', fromFixed(tx[0]))
            return fromFixed(tx[0])
        } catch (e) {
            console.log(e)
        }

    }

    const buy_hops = async (signer: Account, game_id: number, item_id: number, amount: number) => {
        try {
            const tx = await execute(signer, "buy_hops", [game_id, item_id, amount]);
            console.log(tx)

            const receipt = await signer.waitForTransaction(tx.transaction_hash, { retryInterval: 100 })
            console.log(receipt)

        } catch (e) {
            console.log(e)
        }

    }

    return {
        create_game,
        join_game,
        start_game,
        view_hop_price,
        view_beer_price,
        buy_hops
    };
}


// TODO: Move types and generalise this

export enum Direction {
    Left = 0,
    Right = 1,
    Up = 2,
    Down = 3,
}

export enum ComponentEvents {
    Moves = "Moves",
    Position = "Position",
}

export interface BaseEvent {
    type: ComponentEvents;
    entity: string;
}

export interface Moves extends BaseEvent {
    remaining: number;
}

export interface Position extends BaseEvent {
    x: number;
    y: number;
}

export const parseEvent = (
    receipt: InvokeTransactionReceiptResponse
): Array<Moves | Position> => {
    if (!receipt.events) {
        throw new Error(`No events found`);
    }

    let events: Array<Moves | Position> = [];

    for (let raw of receipt.events) {
        const decodedEventType = shortString.decodeShortString(raw.data[0]);

        switch (decodedEventType) {
            case ComponentEvents.Moves:
                if (raw.data.length < 6) {
                    throw new Error('Insufficient data for Moves event.');
                }

                const movesData: Moves = {
                    type: ComponentEvents.Moves,
                    entity: raw.data[2],
                    remaining: Number(raw.data[5]),
                };

                events.push(movesData);
                break;

            case ComponentEvents.Position:
                if (raw.data.length < 7) {
                    throw new Error('Insufficient data for Position event.');
                }

                const positionData: Position = {
                    type: ComponentEvents.Position,
                    entity: raw.data[2],
                    x: Number(raw.data[5]),
                    y: Number(raw.data[6]),
                };

                events.push(positionData);
                break;

            default:
                throw new Error('Unsupported event type.');
        }
    }

    return events;
};