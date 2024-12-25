import { getRandomNames } from '@/mocks/IconsData';
import Avatar from 'boring-avatars';
import { names } from '@/mocks/IconsData';

function Room() {
  const selectedNames = getRandomNames(names, 5);

  return (
    <div className='h-full w-full flex justify-center items-center flex-col overflow-y-auto'>
      <div className='flex items-center justify-between flex-col p-7 rounded-xl bg-purple-300 bg-opacity-50 backdrop-blur-sm shadow-2xl gap-y-7'>
        {selectedNames.map((name, index) => (
          <Avatar
            key={index}
            name={name}
            variant='beam'
            size={50}
            colors={['#251848', '#000860', '#310078', '#30bfc0', '#f0f0d8']}
          />
        ))}
      </div>
    </div>
  );
}

export default Room;
