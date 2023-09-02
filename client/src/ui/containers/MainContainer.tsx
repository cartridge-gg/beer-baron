import { BeerMarket } from "./modules/BeerMarket"
import { FarmLand } from "./modules/FarmLand"
import { HopMarket } from "./modules/HopMarket"
import { LeaderBoard } from "./modules/LeaderBoard"
import { TopNavigation } from "./modules/TopNavigation"

export const MainContainer = () => {
    return <div className="grid grid-cols-4">
        <div className="bg-gray-100 h-screen p-2">
            <HopMarket />
        </div>
        <div className="bg-gray-200 h-screen col-span-2 flex-col flex">
            <div className="bg-blue-100 h-16 flex-none p-2">
                <TopNavigation />
            </div>
            <div className="bg-blue-200 h-32 flex-none p-2">
                <BeerMarket />
            </div>
            <div className="bg-green-300 grow p-2">
                <FarmLand />
            </div>
        </div>
        <div className="bg-gray-300 h-screen p-2">
            <LeaderBoard />
        </div>
    </div>
}