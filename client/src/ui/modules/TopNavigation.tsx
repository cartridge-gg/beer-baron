import { useDojo } from "../../DojoContext"

export const TopNavigation = () => {

    const {
        setup: {
            systemCalls: { create_game },
            // components: { Moves, Position },
            // network: { graphSdk, call }
        },
        account: { account }
    } = useDojo();

    return (<>
        <h1>Beer Barron - Game 1</h1>
    </>)
}