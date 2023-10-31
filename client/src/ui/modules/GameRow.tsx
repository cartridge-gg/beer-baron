import { useDojo } from '@/DojoContext';
import { Entity, Game, Ownership } from '@/generated/graphql';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableCell, TableRow } from '../elements/table';
import { GameStatus } from '@/dojo/gameConfig';
import { localStartTime } from '@/utils';
import { Button } from '../elements/button';
import { Input } from '../elements/input';
import { Maybe } from 'graphql/jsutils/Maybe';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
} from '@/ui/elements/alert-dialog';
import { FancyTitle } from '../components/FancyTitle';

export const GameRow = ({ game }: { game: Maybe<Entity> | undefined }) => {
    const game_model = game?.models?.find((m) => m?.__typename == 'Game') as Game;
    const ownership = game?.models?.find((m) => m?.__typename == 'Ownership') as Ownership;

    const navigate = useNavigate();

    const {
        setup: {
            systemCalls: { start_game, join_game },
        },
        account: { account },
    } = useDojo();

    const [name, setName] = useState('');

    const handleSelectChange = (e: any) => {
        setName(e.target.value);
    };

    const setGameQueryParam = (id: string) => {
        navigate('?game=' + id, { replace: true });
    };

    return (
        <TableRow className=" m-1 text-white">
            <TableCell>{game_model.game_id}</TableCell>
            <TableCell>{GameStatus[game_model.status]}</TableCell>
            <TableCell>{game_model.entry_fee}</TableCell>
            <TableCell>{game_model.max_players}</TableCell>
            <TableCell>{game_model.number_players}</TableCell>
            <TableCell>{game_model.start_time != 0 ? localStartTime(game_model.start_time) : 'Not started'}</TableCell>
            <TableCell>{game_model.game_length / 60} minutes</TableCell>
            <TableCell className="flex space-x-2">
                {/* // TODO: Restrict to only joined games */}
                {game_model.status == GameStatus.Started.toString() && (
                    <Button
                        onClick={() => {
                            setGameQueryParam(game_model.game_id.toString());
                        }}
                    >
                        View
                    </Button>
                )}

                {game_model.status == GameStatus.Lobby.toString() && (
                    <>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button>join</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <FancyTitle title={'Join Game ' + game_model.game_id} />

                                    <Input type="text" name="password" placeholder="enter name" value={name} onChange={handleSelectChange} />
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel asChild>
                                        <Button
                                            disabled={!name}
                                            variant={'default'}
                                            onClick={() => {
                                                join_game({ account, game_id: game_model?.game_id, name });
                                            }}
                                        >
                                            Join Game
                                        </Button>
                                    </AlertDialogCancel>
                                    <AlertDialogCancel>close</AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
                )}
                {ownership?.owner == account.address && (
                    <Button
                        disabled={game_model?.number_players == 0}
                        variant={'secondary'}
                        onClick={() => start_game({ account, game_id: game_model.game_id })}
                    >
                        Start
                    </Button>
                )}
            </TableCell>
        </TableRow>
    );
};
