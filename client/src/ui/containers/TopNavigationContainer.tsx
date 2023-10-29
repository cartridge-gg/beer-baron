import { useQueryParams } from "@/dojo/useQueryParams";
import { WalletButton } from "../components/WalletButton"
import { Button } from "../elements/button"

export const TopNavigationContainer = () => {
    const { clear, game_id } = useQueryParams();

    return (
        <div className="w-full bg-dirt-300 ">
            <div className="flex justify-between p-2 container">
                <Button onClick={clear} variant="default">Home</Button>
                <div className="text-beer-100 self-center text-3xl font-display">
                    Beer Baron {game_id ? "| Game " + game_id : ''}
                </div>
                <WalletButton />
            </div>
        </div>
    )
}