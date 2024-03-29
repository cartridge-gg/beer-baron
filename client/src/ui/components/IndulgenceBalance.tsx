import { useDojo } from '@/dojo/useDojo';
import { INDULGENCE_ID } from '@/dojo/gameConfig';
import { useQueryParams } from '@/dojo/useQueryParams';
import { getEntityIdFromKeys } from '@dojoengine/utils';
import { useComponentValue } from '@dojoengine/react';
import { TextContainer } from '../elements/TextContainer';
import Trophy from '../../icons/Kind=Pixel Trophy.svg?react';
import { useSync } from '@dojoengine/react';

export const IndulgencesBalance = () => {
    const { game_id } = useQueryParams();
    const {
        setup: {
            clientComponents: { ItemBalance },
        },
        account: { account },
    } = useDojo();

    const entityId = getEntityIdFromKeys([BigInt(game_id), BigInt(account.address), BigInt(INDULGENCE_ID)]);

    const indulgence_balance = useComponentValue(ItemBalance, entityId)?.balance.toString() || 0;

    return (
        <TextContainer>
            <span className="text-2xl flex">
                <Trophy className="h-8 fill-beer-100" />
                <span className="self-center">{indulgence_balance}</span>
            </span>
        </TextContainer>
    );
};
