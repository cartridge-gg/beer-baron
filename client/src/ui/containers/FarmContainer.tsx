import { useDojo } from "@/DojoContext";
import { Button } from "../elements/button"
import { FarmLandRow } from "../modules/FarmLandRow"
import { useQueryParams } from "@/dojo/useQueryParams";
import { IconTitle, Icons } from "../components/IconTitle";

export const FarmContainer = () => {
    const { game_id } = useQueryParams();
    const { setup: { systemCalls: { harvest_farm } }, account: { account } } = useDojo();

    return (
        <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
                <IconTitle title="Farm land" icon={Icons.PixelBeerMug} />
                <Button size={'sm'} onClick={() => harvest_farm({ account, game_id })}>
                    Harvest Farmland
                </Button>
            </div>
            <FarmLandRow />
        </div>
    )
}