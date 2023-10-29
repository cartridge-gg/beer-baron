import { FarmContainer } from '../containers/FarmContainer';
import { MarketContainer } from '../containers/MarketContainer';
import { BreweryContainer } from '../containers/BreweryContainer';
import { IndulgencesContainer } from '../containers/IndulgencesContainer';
import { PlayerGameStats } from '../modules/PlayerGameStats';

export const DesktopDashboard = () => {
    return (
        <div className="bg-dirt-400">
            <div className="grid grid-cols-7 gap-8 container mx-auto py-8">
                <div className="col-span-3 space-y-8 ">
                    <PlayerGameStats />
                    <MarketContainer />
                </div>
                <div className="col-span-4 space-y-8">
                    <IndulgencesContainer />
                    <FarmContainer />
                    <BreweryContainer />
                </div>
            </div>
        </div>
    );
};
