import { defineContractComponents } from './contractComponents';
import { world } from './world';
import { RPCProvider, Query } from '@dojoengine/core';
import { Account, num } from 'starknet';
import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../generated/graphql';
import manifest from '../../../contracts/target/dev/manifest.json';
import * as torii from '@dojoengine/torii-client';

export type SetupNetworkResult = Awaited<ReturnType<typeof setupNetwork>>;

export async function setupNetwork() {
    // Extract environment variables for better readability.
    const { VITE_PUBLIC_WORLD_ADDRESS, VITE_PUBLIC_NODE_URL, VITE_PUBLIC_TORII } = import.meta.env;

    const provider = new RPCProvider(VITE_PUBLIC_WORLD_ADDRESS, manifest, VITE_PUBLIC_NODE_URL);

    const createGraphSdk = () => getSdk(new GraphQLClient(VITE_PUBLIC_TORII + '/graphql'));

    const torii_client = await torii.createClient([], {
        rpcUrl: VITE_PUBLIC_NODE_URL,
        toriiUrl: VITE_PUBLIC_TORII + '/grpc',
        worldAddress: VITE_PUBLIC_WORLD_ADDRESS,
    });

    return {
        provider,
        world,

        torii_client,

        // torii client, add to sync
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
