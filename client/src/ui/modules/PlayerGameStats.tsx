import { GoldBalance } from '../components/GoldBalance';
import { IndulgencesBalance } from '../components/IndulgenceBalance';

export const PlayerGameStats = () => {
    return (
        <div>
            <GoldBalance />
            <IndulgencesBalance />
        </div>
    );
};
