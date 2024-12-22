import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Base from './pages/Base';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Base />}>
          <Route index element={<Home />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
