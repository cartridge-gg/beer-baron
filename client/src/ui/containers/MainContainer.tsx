import { BeerMarket } from "../modules/BeerMarket"
import { Brewing } from "../modules/Brewing"
import { FarmLand } from "../modules/FarmLand"
import { HopMarket } from "../modules/HopMarket"
import { Inventory } from "../modules/Inventory"
import { LeaderBoard } from "../modules/LeaderBoard"
import { TopNavigation } from "../modules/TopNavigation"

export const MainContainer = () => {
    return <div className="grid grid-cols-4">
        <div className="bg-gray-100 h-screen p-2">
            <HopMarket />
            <Inventory />
        </div>
        <div className="bg-gray-200 h-screen col-span-2 flex-col flex">
            <div className="bg-blue-100 flex-none p-2">
                <TopNavigation />
            </div>
            <div className="bg-blue-200 flex-none p-4">
                <BeerMarket />
            </div>
            <div className="bg-green-300 p-4">
                <FarmLand />
            </div>
            <div className="bg-red-300 grow p-4">
                <Brewing />
            </div>
        </div>
        <div className="bg-gray-300 h-screen p-2">
            <LeaderBoard />
        </div>
    </div>
}