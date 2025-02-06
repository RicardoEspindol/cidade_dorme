import { useEffect, useState } from 'react';
import AppRoutes from './routes';
import { Toaster } from './components/ui/toaster';
import NoResponsive from './pages/Responsive';

function App() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 900);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 900);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <Toaster />
      {isLargeScreen ? <AppRoutes /> : <NoResponsive />}
    </>
  );
}

export default App;
