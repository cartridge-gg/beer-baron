import PixelBeerMug from '../../icons/Pixel-Beer-Mug.svg?react';
import PixelCart from '../../icons/Kind=Pixel Cart.svg?react';
import Home from '../../icons/Kind=Pixel Home.svg?react';
import Market from '../../icons/Kind=Pixel Market.svg?react';
import Trophy from '../../icons/Kind=Pixel Trophy.svg?react';

interface IconTitleProps {
    title: string;
    icon: Icons;
}

export enum Icons {
    PixelBeerMug,
    PixelCart,
    Home,
    Market,
    Trophy,
}

export const ItemIcons: { [key in Icons]: any } = {
    [Icons.PixelBeerMug]: <PixelBeerMug className="w-12 fill-current" />,
    [Icons.PixelCart]: <PixelCart className="w-12 fill-current" />,
    [Icons.Home]: <Home className="w-12 fill-current" />,
    [Icons.Market]: <Market className="w-12 fill-current" />,
    [Icons.Trophy]: <Trophy className="w-12 fill-current" />,
};

export const IconTitle = ({ icon, title }: IconTitleProps) => {
    return (
        <div className="flex fill-beer-100 text-beer-100">
            {ItemIcons[icon]}
            <div className="px-2 capitalise ">
                <h3>{title}</h3>
            </div>
        </div>
    );
};
