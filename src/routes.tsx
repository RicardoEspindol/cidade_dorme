import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Instructions from './pages/Instructions';
import Home from './pages/Home';
import Base from './pages/Base';
import Room from './pages/Room';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Base />}>
          <Route index element={<Home />}></Route>
          <Route path='/instructions' element={<Instructions />}></Route>
          <Route path='/room' element={<Room />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
