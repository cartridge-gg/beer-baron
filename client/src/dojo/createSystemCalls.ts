import { SetupNetworkResult } from "./setupNetwork";
import { Event } from "starknet";
import { EntityIndex, setComponent, Components, Schema } from "@latticexyz/recs";
import { fromFixed } from "@/utils/fixed";
import { poseidonHashMany } from "micro-starknet";
import { BuyHopsProps, JoinGameProps, GameIdProps, ViewPriceProps, SystemSigner, FarmProps, BrewBeerProps, BottleBeerProps, SellBeerProps } from "./types";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
    { execute, contractComponents, call }: SetupNetworkResult,
    // { GoldBalance, ItemBalance, Player }: ClientComponents
) {

    const create_game = async ({ account }: SystemSigner) => {

        try {
            const tx = await execute(account, "create_game", []);
            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 })
            setComponentsFromEvents(contractComponents, getEvents(receipt));

        } catch (e) {
            console.log(e)
        }
    };

    const join_game = async ({ account, game_id, name }: JoinGameProps) => {

        try {
            const tx = await execute(account, "join_game", [game_id, name]);
            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 })
            setComponentsFromEvents(contractComponents, getEvents(receipt));

        } catch (e) {
            console.log(e)
        }
    };

    const start_game = async ({ account, game_id }: GameIdProps) => {

        try {
            const tx = await execute(account, "start_game", [game_id]);

            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 })
            setComponentsFromEvents(contractComponents, getEvents(receipt));

        } catch (e) {
            console.log(e)
        }
    };

    const view_hop_price = async ({ game_id, item_id }: ViewPriceProps) => {

        try {
            const tx: any = await call("view_hop_price", [game_id, item_id]);
            return fromFixed(tx[0])
        } catch (e) {
            console.log(e)
        }

    }
    const view_beer_price = async ({ game_id, item_id }: ViewPriceProps) => {

        try {
            const tx: any = await call("view_beer_price", [game_id, item_id]);
            return fromFixed(tx[0])
        } catch (e) {
            console.log(e)
        }

    }

    const buy_hops = async ({ account, game_id, item_id, amount }: BuyHopsProps) => {
        try {
            const tx = await execute(account, "buy_hops", [game_id, item_id, amount]);
            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 })
            setComponentsFromEvents(contractComponents, getEvents(receipt));
        } catch (e) {
            console.log(e)
        }
    }

    const build_farm = async ({ account, game_id, area_type }: FarmProps) => {

        try {
            const tx = await execute(account, "build_farm", [game_id, area_type.length, ...area_type]);
            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 })
            setComponentsFromEvents(contractComponents, getEvents(receipt));
        } catch (e) {
            console.log(e)
        }
    }

    const harvest_farm = async ({ account, game_id }: GameIdProps) => {
        try {
            const tx = await execute(account, "harvest_farm", [game_id]);
            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 })
            setComponentsFromEvents(contractComponents, getEvents(receipt));
        } catch (e) {
            console.log(e)
        }
    }

    const brew_beer = async ({ account, game_id, beer_id }: BrewBeerProps) => {
        try {
            const tx = await execute(account, "brew_beer", [game_id, beer_id]);
            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 })
            setComponentsFromEvents(contractComponents, getEvents(receipt));
        } catch (e) {
            console.log(e)
        }
    }

    const bottle_beer = async ({ account, game_id, beer_id, batch_id }: BottleBeerProps) => {
        try {
            const tx = await execute(account, "bottle_beer", [game_id, beer_id, batch_id]);
            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 })
            setComponentsFromEvents(contractComponents, getEvents(receipt));
        } catch (e) {
            console.log(e)
        }
    }

    const sell_beer = async ({ account, game_id, beer_id, amount }: SellBeerProps) => {
        try {
            const tx = await execute(account, "sell_beer", [game_id, beer_id, amount]);
            const receipt = await account.waitForTransaction(tx.transaction_hash, { retryInterval: 100 })
            setComponentsFromEvents(contractComponents, getEvents(receipt));
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
        buy_hops,
        build_farm,
        harvest_farm,
        brew_beer,
        bottle_beer,
        sell_beer
    };
}

export function getEvents(receipt: any): any[] {
    console.log(receipt.events)
    return receipt.events.filter((event: any) => {
        return event.keys.length === 1 &&
            event.keys[0] === import.meta.env.VITE_EVENT_KEY;
    });
}

export function setComponentsFromEvents(components: Components, events: Event[]) {
    events.forEach((event) => setComponentFromEvent(components, event.data));
}

export function setComponentFromEvent(components: Components, eventData: string[]) {
    // retrieve the component name
    const componentName = hexToAscii(eventData[0]);

    // retrieve the component from name
    const component = components[componentName];

    // get keys
    const keysNumber = parseInt(eventData[1]);
    let index = 2 + keysNumber + 1;

    const keys = eventData.slice(2, 2 + keysNumber).map((key) => BigInt(key));

    // get entityIndex from keys
    const entityIndex = getEntityIdFromKeys(keys);

    // get values
    let numberOfValues = parseInt(eventData[index++]);

    // get values
    const values = eventData.slice(index, index + numberOfValues);

    // create component object from values with schema
    const componentValues = Object.keys(component.schema).reduce((acc: Schema, key, index) => {
        const value = values[index];
        acc[key] = Number(value);
        return acc;
    }, {});

    console.log(componentName, entityIndex, componentValues)

    // set component
    setComponent(component, entityIndex, componentValues);

}

function hexToAscii(hex: string) {
    var str = '';
    for (var n = 2; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

function asciiToHex(ascii: string) {
    var hex = '';
    for (var i = 0; i < ascii.length; i++) {
        var charCode = ascii.charCodeAt(i);
        hex += charCode.toString(16).padStart(2, '0');
    }
    return `0x${hex}`;
}

function getEntityIdFromEvents(events: Event[], componentName: string): number {
    let entityId = 0;
    const event = events.find((event) => {
        return event.data[0] === asciiToHex(componentName);
    });
    if (event) {
        entityId = parseInt(event.data[2]);
    }
    return entityId;
}

export function getEntityIdFromKeys(keys: bigint[]): EntityIndex {
    if (keys.length === 1) {
        return parseInt(keys[0].toString()) as EntityIndex;
    }
    // calculate the poseidon hash of the keys
    let poseidon = poseidonHashMany([BigInt(keys.length), ...keys]);
    return parseInt(poseidon.toString()) as EntityIndex;
}
