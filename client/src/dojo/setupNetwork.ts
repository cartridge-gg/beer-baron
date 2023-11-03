import { defineContractComponents } from './contractComponents';
import { world } from './world';
import { RPCProvider } from '@dojoengine/core';
import { Account, num } from 'starknet';
import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../generated/graphql';
import dev_manifest from '../../../contracts/target/dev/manifest.json';
import prod_manifest from '../../../contracts/target/release/manifest.json';

import * as torii from '@dojoengine/torii-client';

export type SetupNetworkResult = Awaited<ReturnType<typeof setupNetwork>>;

export async function setupNetwork() {
    const { VITE_PUBLIC_WORLD_ADDRESS, VITE_PUBLIC_NODE_URL, VITE_PUBLIC_TORII, VITE_PUBLIC_ENV } = import.meta.env;

    const manifest = VITE_PUBLIC_ENV === 'development' ? dev_manifest : prod_manifest;

    const provider = new RPCProvider(VITE_PUBLIC_WORLD_ADDRESS, manifest, VITE_PUBLIC_NODE_URL);

    const createGraphSdk = () => getSdk(new GraphQLClient(VITE_PUBLIC_TORII + '/graphql'));

    const torii_client = await torii.createClient([], {
        rpcUrl: VITE_PUBLIC_NODE_URL,
        toriiUrl: VITE_PUBLIC_TORII + '/grpc',
        worldAddress: VITE_PUBLIC_WORLD_ADDRESS,
    });

    // getComponent

    // screen -> values
    // addEntitiesBatch
    // components -> getModelValue
    // nagavting away -> removeEntitiesBatch

    // --- torii client
    // resources: 25 values
    // resource production: 8

    // caravans: graphql
    // combat: graphql

    return {
        provider,
        world,

        torii_client,

        addEntitiesToSync: async (model: string, keys: string[]) => {
            await torii_client.addEntitiesToSync([{ model, keys }]);
        },

        // done
        getModelValue: async (model: string, keys: string[]) => {
            return await torii_client.getModelValue(model, keys);
        },

        // useComponentValue

        // Define contract components for the world.
        contractComponents: defineContractComponents(world),

        // Define the graph SDK instance.
        graphSdk: createGraphSdk(),

        // Entity query function.
        execute: async (signer: Account, contract: string, system: string, call_data: num.BigNumberish[]) => {
            return provider.execute(signer, contract, system, call_data);
        },

        call: async (contract: string, system: string, call_data: num.BigNumberish[]) => {
            return provider.call(contract, system, call_data);
        },
    };
}
