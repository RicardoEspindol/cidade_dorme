import { getRandomNames } from '@/mocks/IconsData';
import { names } from '@/mocks/IconsData';
import CardPlayer from '@/components/CardPlayer';

function Play() {
  const selectedNames = getRandomNames(names, 16);
  return (
    <div className='h-full w-full flex justify-center items-center flex-col overflow-y-auto'>
      <div className='flex items-center justify-between flex-col p-7 rounded-xl bg-purple-300 bg-opacity-50 backdrop-blur-sm shadow-2xl w-[50%] max-h-[60%]'>
        <div className='grid grid-cols-3 w-full h-full overflow-y-auto'>
          {selectedNames.map((name, index) => (
            <CardPlayer key={index} name={name} />
          ))}
        </div>
        <div className='flex w-full gap-x-6 mt-5'>
          <button className='flex items-center justify-center w-full min-h-9 bg-primaryMy rounded-lg font-space-medium text-sm text-white hover:bg-opacity-90'>
            <p className='uppercase'>Destruir Sala</p>
          </button>
          <button className='flex items-center justify-center w-full min-h-9 bg-primaryMy rounded-lg font-space-medium text-sm text-white hover:bg-opacity-90'>
            <p className='uppercase'>Iniciar Jogo</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Play;
