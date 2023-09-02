import { useDojo } from "../../DojoContext"
import { Button } from "@/components/ui/button"

export const LobbyContainer = () => {
    const {
        setup: {
            systemCalls: { create_game, join_game, start_game },
        },
        account: { account }
    } = useDojo();

    return <div className="fixed h-screen w-screen bg-blue-200 p-20">
        <Button onClick={() => create_game(account)}>Create Game</Button>
        <Button onClick={() => join_game(account, 1, 'loaf')}>Join Game</Button>
        <Button onClick={() => start_game(account, 1)}>Start Game</Button>
    </div>
}