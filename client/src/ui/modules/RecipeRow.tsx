import { BeerID, BeerRecipeCard } from "../components/BeerCard";

export const RecipeRow = () => {
    return (
        <div>
            <div className="uppercase text-dirt-100">Brewing Recipes</div>
            <div className="grid grid-cols-1 gap-3">
                {Object.values(BeerID).filter(value => typeof value === 'number').map((beerType) => (
                    <BeerRecipeCard key={beerType} beer={beerType as BeerID} seed={1} />
                ))}
            </div>
        </div>
    )
}