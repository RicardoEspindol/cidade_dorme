import Chat from '@/components/Chat';
import Avatar from 'boring-avatars';
import Swords from '../../public/icons/Swords';

function Game() {
  return (
    <div className='h-full w-full flex justify-center items-center flex-col overflow-y-auto'>
      <div className='flex items-center justify-between flex-col p-7 rounded-xl bg-purple-300 bg-opacity-50 backdrop-blur-sm shadow-2xl w-[70%] h-[70%]'>
        <div className='w-full h-full flex'>
          <div className='w-full h-full flex flex-col pr-4'>
            <div className='w-full flex items-center justify-between'>
              <div className='flex items-center justify-center gap-x-4'>
                <Avatar
                  name={'Sally Rid'}
                  variant='beam'
                  size={60}
                  colors={[
                    '#251848',
                    '#000860',
                    '#310078',
                    '#30bfc0',
                    '#f0f0d8',
                  ]}
                />
                <div className='flex flex-col items-start'>
                  <p className='font-space-bold text-2xl text-black'>
                    Sally Rid
                  </p>
                  <p className='font-space-regular text-sm text-black'>
                    Monstro
                  </p>
                </div>
              </div>
              <div className='flex flex-col items-end'>
                <div className='font-space-bold text-2xl text-black flex'>
                  <p>Round</p>
                  <span className='mt-1 ml-2'>
                    <Swords />
                  </span>
                </div>
                <p className='font-space-regular text-sm text-black'>10</p>
              </div>
            </div>
            <div className='w-full h-52 flex items-center justify-between gap-x-5 mt-8'>
              <div className='w-[50%] h-full border border-black rounded-md'></div>
              <div className='w-[50%] h-full border border-black rounded-md'></div>
            </div>
          </div>
          <div className='h-full min-w-56'>
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
