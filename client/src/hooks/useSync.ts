import { useDojo } from '@/DojoContext';
import { getEntityIdFromKeys } from '@dojoengine/utils';
import { Component, Entity, Metadata, Schema, setComponent } from '@latticexyz/recs';
import { useEffect, useMemo } from 'react';

export function useSync<S extends Schema>(component: Component<S, Metadata, undefined>, keys: any[]) {
    const {
        setup: {
            network: { torii_client },
        },
    } = useDojo();

    const entityIndex = useMemo(() => {
        return getEntityIdFromKeys(keys);
    }, [keys]);

    const keys_to_strings = keys.map((key) => key.toString());

    const componentValue = () => {
        const balance = torii_client.getModelValue(component.metadata?.name, [entityIndex]);
        console.log(balance);
    };

    console.log(component.metadata?.name);

    async function syncEntity() {
        if (!torii_client) return;

        await torii_client.addEntitiesToSync([{ model: component.metadata?.name, keys: keys_to_strings }]);

        torii_client.onSyncEntityChange({ model: component.metadata?.name, keys: keys_to_strings }, componentValue);

        // // const data = await entity(component.metadata?.name as string, { keys }, 0, component.metadata?.length as number);

        // console.log(data);

        // // get values
        // const values = data.slice(1);

        // create component object from values with schema
        // const componentValues = Object.keys(component.schema).reduce((acc: Schema, key, index) => {
        //     const value = values[index];
        //     acc[key] = Number(value);
        //     return acc;
        // }, {});

        // console.log(component.metadata?.name, entityIndex, componentValues);

        // // set component
        // setComponent(component, entityIndex as Entity, componentValues as any);
    }

    useEffect(() => {
        syncEntity();
        console.log('sync');
    }, [component]);
}
