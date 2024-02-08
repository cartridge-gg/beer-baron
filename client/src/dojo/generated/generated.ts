import { DojoProvider } from '@dojoengine/core';

export type IWorld = Awaited<ReturnType<typeof setupWorld>>;

export async function setupWorld(provider: DojoProvider) {
    return {};
}
