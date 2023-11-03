import { useDojo } from '@/DojoContext';
import { getEntityIdFromKeys } from '@dojoengine/utils';
import { Component, Entity, Metadata, Schema, setComponent } from '@latticexyz/recs';
import { useEffect, useMemo } from 'react';
import { Type as RecsType } from '@latticexyz/recs';

export function useSync<S extends Schema>(component: Component<S, Metadata, undefined>, keys: any[]) {
    const {
        setup: {
            network: { addEntitiesToSync, getModelValue },
        },
    } = useDojo();

    const entityIndex = useMemo(() => {
        return getEntityIdFromKeys(keys);
    }, [keys]);

    const keys_to_strings = keys.map((key) => key.toString());

    const setModelValue = async <S extends Schema>(component: Component<S, Metadata, undefined>, keys: any[]) => {
        // Fetch values from torii_client
        const values = await getModelValue(component.metadata?.name as string, keys);

        // Create component object from values with schema
        const componentValues = Object.keys(component.schema).reduce((acc, key) => {
            if (key in values) {
                // Convert value to Number if necessary, adjust based on type
                const value = values[key];
                acc[key] = component.schema[key] === RecsType.BigInt ? BigInt(value) : Number(value);
            }
            return acc;
        }, {});

        setComponent(component, entityIndex as Entity, componentValues as any);
    };

    useEffect(() => {
        addEntitiesToSync(component.metadata?.name as string, keys_to_strings);

        setModelValue(component, keys_to_strings);
    }, []);
}
