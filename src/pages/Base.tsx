import Container from '@/components/global/Container';
import { Outlet } from 'react-router-dom';

function Base() {
  return (
    <div className='flex justify-start flex-row w-full h-screen'>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}

export default Base;
