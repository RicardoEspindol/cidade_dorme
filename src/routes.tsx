import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Instructions from './pages/Instructions';
import Home from './pages/Home';
import Base from './pages/Base';
import Room from './pages/Room';
import Play from './pages/Play';
import Game from './pages/Game';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Base />}>
          <Route index element={<Home />}></Route>
          <Route path='/instructions' element={<Instructions />}></Route>
          <Route path='/room' element={<Room />}></Route>
          <Route path='/play' element={<Play />}></Route>
          <Route path='/game' element={<Game />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
