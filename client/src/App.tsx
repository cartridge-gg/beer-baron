import './App.css';
import { useQueryParams } from './dojo/useQueryParams';
import { LobbyContainer } from './ui/containers/LobbyContainer';
import { MainContainer } from './ui/containers/MainContainer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CoreScreen = () => {
  const { game_id } = useQueryParams();
  if (game_id) {
    return <MainContainer />;
  } else {
    return <LobbyContainer />;
  }
}

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CoreScreen />} />
        </Routes>
        <ToastContainer />
      </Router>

    </>
  );
}

export default App;
