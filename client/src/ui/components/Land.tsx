import { Chip } from "../elements/chip";

export enum LandType {
    EmptyDefaultOne,
    EmptyDefaultTwo,
    EmptyDefaultThree,
    EmptyDefaultFour,
    EmptyDefaultFive,
    FlowerChinookOne,
    FlowerCintraOne,
}

export const LandImagePaths: { [key in LandType]: string } = {
    [LandType.EmptyDefaultOne]: "/images/lands/State=Empty, Kind=Default, Num=1.png",
    [LandType.EmptyDefaultTwo]: "/images/lands/State=Empty, Kind=Default, Num=2.png",
    [LandType.EmptyDefaultThree]: "/images/lands/State=Empty, Kind=Default, Num=3.png",
    [LandType.EmptyDefaultFour]: "/images/lands/State=Empty, Kind=Default, Num=4.png",
    [LandType.EmptyDefaultFive]: "/images/lands/State=Empty, Kind=Default, Num=5.png",
    [LandType.FlowerChinookOne]: "/images/lands/State=Flower, Kind=Chinook, Num=1.png",
    [LandType.FlowerCintraOne]: "/images/lands/State=Flower, Kind=Cintra, Num=1.png",
};

interface Props {
    landType: LandType;
    active?: boolean;
}

export const Land = (props: Props) => {
    return (
        <div className={`relative`}>
            <Chip title="ready" position="top-right" color="green" />
            <img src={LandImagePaths[props.landType]} alt="" />
        </div>
    )
}
