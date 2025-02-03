import Avatar from 'boring-avatars';

interface IAvatarGame {
  name: string;
}

function AvatarGame({ name }: IAvatarGame) {
  return (
    <div className='flex flex-col items-center justify-center gap-y-1 w-28 p-2 rounded-md hover:bg-purple-400 hover:bg-opacity-50'>
      <Avatar
        name={name}
        variant='beam'
        size={50}
        colors={['#251848', '#000860', '#310078', '#30bfc0', '#f0f0d8']}
      />
      <p className='font-space-regular text-xs text-black truncate w-full text-center'>
        {name}
      </p>
    </div>
  );
}

export default AvatarGame;
