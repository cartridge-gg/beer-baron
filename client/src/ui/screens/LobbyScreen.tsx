import { Button } from '@/ui/elements/button';
import BeerBaronLogo from '../../icons/BeerBaronLogo.svg?react';
import { CreateGame } from '../modules/CreateGame';
import { IconTitle, Icons } from '../components/IconTitle';
import { GamesTable } from '../modules/GamesTable';
import { MyGames } from '../modules/MyGames';
import { useDojo } from '@/dojo/useDojo';

export const LobbyScreen = () => {
    const {
        account: { account },
    } = useDojo();

    return (
        <div className="bg-dirt-400 h-screen">
            <div className="container grid grid-cols-12 gap-8 mx-auto">
                <div className="p-10 col-span-4 text-center text-beer-100">
                    <BeerBaronLogo className="mx-auto" />
                    <h1>Beer Baron</h1>
                    <Button variant={'default'} size={'lg'}>
                        Tutorial
                    </Button>
                </div>
                <div className="p-10 col-span-8 ">
                    <div className=" flex justify-between">
                        <div>
                            <IconTitle icon={Icons.PixelBeerMug} title="Games" />
                        </div>
                        <div>
                            <CreateGame />
                        </div>
                    </div>

                    <MyGames />
                    <GamesTable />
                </div>
            </div>
        </div>
    );
};
