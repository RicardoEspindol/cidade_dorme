import { Link } from 'react-router-dom';
import Image404 from '../../public/images/404.png';

function Page404() {
  return (
    <div className='h-full w-full flex justify-center items-center flex-col overflow-y-auto'>
      <div className='flex items-center justify-between flex-col p-7 rounded-xl bg-purple-300 bg-opacity-50 backdrop-blur-sm shadow-2xl border border-primaryMy'>
        <img
          src={Image404}
          alt='Imagem relativa ao erro 404'
          className='w-80'
        ></img>
        <p className='font-space-medium text-2xl text-black mb-4'>
          Página não encontrada
        </p>
        <Link
          to={'/'}
          className='w-full h-10 rounded-lg bg-primaryMy font-space-medium text-white uppercase hover:bg-opacity-90 flex items-center justify-center'
        >
          Voltar
        </Link>
      </div>
    </div>
  );
}

export default Page404;
