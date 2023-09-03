import { ReactNode } from "react"
import { BeerMarket } from "../modules/BeerMarket"
import { Brewing } from "../modules/Brewing"
import { FarmLand } from "../modules/FarmLand"
import { HopMarket } from "../modules/HopMarket"
import { Inventory } from "../modules/Inventory"
import { LeaderBoard } from "../modules/LeaderBoard"
import { TopNavigation } from "../modules/TopNavigation"

export const MainContainer = () => {
    return <div className="grid grid-cols-4 bg-tavern bg-cover">
        <div className="h-screen p-4 space-y-4">
            <Frame>
                <HopMarket />
            </Frame>
            <Frame>
                <BeerMarket />
            </Frame>
            <Frame>
                <Inventory />
            </Frame>

        </div>
        <div className=" h-screen col-span-2 flex-col flex  p-4">
            <div className=" flex-none">
                <Frame>
                    <TopNavigation />
                </Frame>
            </div>
            <div className=" p-4">
                <Frame>
                    <FarmLand />
                </Frame>
            </div>
            <div className=" grow p-4">
                <Frame>
                    <Brewing />
                </Frame>
            </div>
        </div>
        <div className="h-screen p-4 ">
            <Frame>
                <LeaderBoard />
            </Frame>
        </div>
    </div>
}

type Props = {
    children: ReactNode;
};
export const Frame = ({ children }: Props) => {
    return <div className=" duration-150 border-4 rounded-2xl bg-black/90 p-4 text-gray-200 border-black hover:bg-black transform ">
        {children}
    </div>
}