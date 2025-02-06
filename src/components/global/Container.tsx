import { ReactNode } from 'react';
import backgroundImage from '../../../public/images/bg.jpg';

interface ContainerI {
  children: ReactNode;
}

function Container({ children }: ContainerI) {
  return (
    <section
      className='overflow-auto w-full'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {children}
    </section>
  );
}

export default Container;
