const leaderboardData = [
    { "name": "DragonSlayer42", "beerBrewed": 180, "Shekels": 1250 },
    { "name": "MoonElfMage", "beerBrewed": 155, "Shekels": 1420 },
    { "name": "ThunderAxe007", "beerBrewed": 210, "Shekels": 1100 },
    { "name": "StarSorceress", "beerBrewed": 120, "Shekels": 1180 },
    { "name": "ShadowHunter88", "beerBrewed": 190, "Shekels": 1000 },
    { "name": "SilverSword", "beerBrewed": 165, "Shekels": 1400 },
    { "name": "TwilightAssassin", "beerBrewed": 175, "Shekels": 1300 },
    { "name": "OrcBane", "beerBrewed": 230, "Shekels": 1200 },
    { "name": "PhoenixRise", "beerBrewed": 125, "Shekels": 1260 },
];

export const LeaderBoard = () => {
    return (
        <>
            <img className="rounded" src="/images/people/victor_logo.png" alt="" />
            <h4 >Leaderboard</h4>
            <table className="min-w-full text-xs">
                <thead>
                    <tr>
                        <th className="py-2 px-6 ">Name</th>
                        {/* <th className="py-2 px-6 ">Beer Brewed</th> */}
                        <th className="py-2 px-6 ">Gold</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboardData.map((entry, index) => (
                        <tr key={index}>
                            <td className="py-2 px-6  ">{entry.name}</td>
                            {/* <td className="py-2 px-6 ">{entry.beerBrewed}</td> */}
                            <td className="py-2 px-6 text-right">{entry.Shekels}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};