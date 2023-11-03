import { GameTimer } from '../components/GameTimer';
import { GoldBalance } from '../components/GoldBalance';
import { IndulgencesBalance } from '../components/IndulgenceBalance';

export const PlayerGameStats = () => {
    return (
        <div className="flex justify-between">
            <GameTimer />
            <GoldBalance />
            <IndulgencesBalance />
        </div>
    );
};
