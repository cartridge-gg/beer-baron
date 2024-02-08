import manifest from '../contracts/target/dev/manifest.json';
import release_manifest from '../contracts/target/release/manifest.json';
import { createDojoConfig } from '@dojoengine/core';

export const dojoConfig = createDojoConfig({
    rpcUrl: import.meta.env.VITE_PUBLIC_NODE_URL,
    toriiUrl: import.meta.env.VITE_PUBLIC_TORII,
    masterAddress: import.meta.env.VITE_PUBLIC_MASTER_ADDRESS,
    masterPrivateKey: import.meta.env.VITE_PUBLIC_MASTER_PRIVATE_KEY,
    manifest: import.meta.env.VITE_PUBLIC_ENV === 'production' ? release_manifest : manifest,
});
