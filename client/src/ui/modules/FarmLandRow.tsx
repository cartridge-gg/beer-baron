import { Land } from '../components/Land';

export const FarmLandRow = () => {
    const numberOfLands = 6;

    return (
        <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: numberOfLands }).map((_, index) => (
                <Land key={index} index={index} />
            ))}
        </div>
    );
};
