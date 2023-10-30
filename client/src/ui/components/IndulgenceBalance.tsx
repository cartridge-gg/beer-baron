import { useDojo } from '@/DojoContext';
import { INDULGENCE_ID } from '@/dojo/gameConfig';
import { useQueryParams } from '@/dojo/useQueryParams';
import { getEntityIdFromKeys } from '@dojoengine/utils';
import { useComponentValue } from '@latticexyz/react';
import { TextContainer } from '../elements/TextContainer';
import Trophy from '../../icons/Kind=Pixel Trophy.svg?react';

export const IndulgencesBalance = () => {
    const { game_id } = useQueryParams();
    const {
        setup: {
            components: { ItemBalance },
        },
        account: { account },
    } = useDojo();

    const entityId = getEntityIdFromKeys([BigInt(game_id), BigInt(account.address), BigInt(INDULGENCE_ID)]);

    const indulgence_balance = useComponentValue(ItemBalance, entityId)?.balance.toString() || 0;

    console.log(indulgence_balance);

    return (
        <TextContainer>
            <span className="text-3xl flex">
                <Trophy className="h-10 fill-beer-100" />
                <span className="self-center">{indulgence_balance}</span>
            </span>
        </TextContainer>
    );
};
