import { IconTitle, Icons } from '../components/IconTitle';
import { IndulgenceAuctionTable } from '../modules/IndulgenceAuctionTable';
import { LeaderBoardTable } from '../modules/LeaderBoardTable';

export const IndulgencesContainer = () => {
    return (
        <div className="flex flex-col space-y-2">
            <LeaderBoardTable />
            <IconTitle title="Indulgences" icon={Icons.Trophy} />
            <IndulgenceAuctionTable />
        </div>
    );
};
