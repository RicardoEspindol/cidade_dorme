import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='h-full w-full flex justify-center items-center flex-col overflow-y-auto'>
      <div className='flex items-center justify-between flex-col p-7 rounded-xl bg-purple-300 bg-opacity-50 backdrop-blur-sm shadow-2xl border border-primaryMy'>
        <h1 className='h-20 flex items-center justify-center font-space-bold text-5xl text-white underline decoration-white'>
          CIDADE DORME
        </h1>
        <div className='w-full h-36 flex flex-col justify-center items-center gap-y-6 mt-14'>
          <Link
            to={'/room'}
            className='w-full h-10 rounded-lg bg-primaryMy font-space-medium text-white uppercase hover:bg-opacity-90 flex items-center justify-center'
          >
            Jogar
          </Link>
          <Link
            to={'/instructions'}
            className='w-full h-10 rounded-lg bg-primaryMy font-space-medium text-white uppercase hover:bg-opacity-90 flex items-center justify-center'
          >
            Instruções
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
