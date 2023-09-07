import { useDojo } from "@/DojoContext";
import { getEntityIdFromKeys } from "@/dojo/createSystemCalls";
import {
    Component,
    EntityIndex,
    Metadata,
    Schema,
    setComponent,
} from "@latticexyz/recs";
import { useEffect, useMemo } from "react";

export function useSync<S extends Schema>(
    component: Component<S, Metadata, undefined>,
    keys: any[]
) {
    const { setup: { network: { entity } } } = useDojo();

    const entityIndex = useMemo(() => {
        return getEntityIdFromKeys(keys);
    }, [keys]);

    async function syncEntity() {

        const data = await entity(component.metadata?.name as string, { keys }, 0, component.metadata?.length as number);

        // get values
        const values = data.slice(1);

        // create component object from values with schema
        const componentValues = Object.keys(component.schema).reduce((acc: Schema, key, index) => {
            const value = values[index];
            acc[key] = Number(value);
            return acc;
        }, {});

        console.log(component.metadata?.name, entityIndex, componentValues);

        // set component
        setComponent(component, entityIndex as EntityIndex, componentValues as any);
    }

    useEffect(() => {
        syncEntity();
        console.log('sync');
    }, [component, entityIndex]);
}