import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTrigger } from '@/ui/elements/alert-dialog';
import { useEffect, useState } from 'react';
import { Input } from '../elements/input';
import { Button } from '../elements/button';
import { useDojo } from '@/dojo/useDojo';
import { FancyTitle } from '../components/FancyTitle';

export const CreateGame = () => {
    const {
        setup: {
            systemCalls: { create_game },
        },
        account: { account },
    } = useDojo();

    useEffect(() => {
        console.log('account changed create', account);
    }, [account]);

    const [formData, setFormData] = useState({
        max_players: 10,
        game_length: 6000,
        password: '1234',
        entry_fee: 0,
    });

    // Event handler for form changes
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Event handler for form submission
    const handleSubmit = (event: any) => {
        event.preventDefault();
        create_game({ account, ...formData });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={'default'} size={'lg'}>
                    Create Game
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <FancyTitle title="Create Game" />

                    <div className="flex  text-beer-100">
                        <form className="flex w-full flex-col space-y-2" onSubmit={handleSubmit}>
                            <label>
                                Max Players:
                                <Input
                                    type="number"
                                    placeholder="Email"
                                    name="max_players"
                                    value={formData.max_players}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Game Length:
                                <Input type="number" name="game_length" value={formData.game_length} onChange={handleInputChange} />
                            </label>
                            <label>
                                Password:
                                <Input type="text" name="password" value={formData.password} onChange={handleInputChange} />
                            </label>
                            <label>
                                Entry Fee:
                                <Input type="number" name="entry_fee" value={formData.entry_fee} onChange={handleInputChange} />
                            </label>
                            <AlertDialogCancel asChild>
                                <Button type="submit">Create Game</Button>
                            </AlertDialogCancel>
                        </form>
                    </div>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
};
