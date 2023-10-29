import { IconTitle, Icons } from '../components/IconTitle';
import { BreweryRow } from '../modules/BreweryRow';
import { RecipeRow } from '../modules/RecipeRow';

export const BreweryContainer = () => {
    return (
        <div className="flex flex-col space-y-2">
            <IconTitle title="Brewery" icon={Icons.PixelBeerMug} />
            <div className="grid grid-cols-2 gap-4">
                <RecipeRow />
                <BreweryRow />
            </div>
        </div>
    );
};
