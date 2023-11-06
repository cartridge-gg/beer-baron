import { getEntityIdFromKeys } from '@dojoengine/utils';
import { Component, Entity, Metadata, Schema, setComponent } from '@latticexyz/recs';
import { useEffect, useMemo } from 'react';
import { Type as RecsType } from '@latticexyz/recs';
import { Client } from '@dojoengine/torii-client';

export function useSubscribeEntity<S extends Schema>(client: Client, component: Component<S, Metadata, undefined>, keys: any[]) {
    const entityIndex = useMemo(() => {
        return getEntityIdFromKeys(keys);
    }, [keys]);

    const componentName = useMemo(() => component.metadata?.name, [component.metadata?.name]);

    const keys_to_strings = useMemo(() => keys.map((key) => key.toString()), [keys]);

    const setModelValue = async () => {
        try {
            const values = await client.getModelValue(componentName as string, keys_to_strings);

            const componentValues = Object.keys(component.schema).reduce((acc, key) => {
                acc[key] = component.schema[key] === RecsType.BigInt ? BigInt(values[key]) : Number(values[key]);
                return acc;
            }, {});

            console.log(values);

            setComponent(component, entityIndex as Entity, componentValues as any);
        } catch (error) {
            console.error('Failed to fetch or set model value:', error);
        }
    };

    useEffect(() => {
        client.onSyncEntityChange({ model: componentName as string, keys: keys_to_strings }, setModelValue);
    });
}
