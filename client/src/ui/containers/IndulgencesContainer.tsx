import { IconTitle, Icons } from '../components/IconTitle';
import { IndulgenceAuctionTable } from '../modules/IndulgenceAuctionTable';

export const IndulgencesContainer = () => {
    return (
        <div className="flex flex-col space-y-2">
            <IconTitle title="Indulgences" icon={Icons.Trophy} />
            <IndulgenceAuctionTable />
        </div>
    );
};
