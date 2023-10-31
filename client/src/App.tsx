import './App.css';
import { useQueryParams } from './dojo/useQueryParams';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DesktopDashboard } from './ui/screens/DesktopDashboard';
import { TopNavigationContainer } from './ui/containers/TopNavigationContainer';
import { Toaster } from '@/ui/elements/toaster';
import { LobbyScreen } from './ui/screens/LobbyScreen';

export const CoreScreen = () => {
    const { game_id } = useQueryParams();

    return (
        <>
            <TopNavigationContainer />
            {game_id ? <DesktopDashboard /> : <LobbyScreen />}
        </>
    );
};

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<CoreScreen />} />
                </Routes>
                <Toaster />
            </Router>
        </>
    );
}

export default App;
