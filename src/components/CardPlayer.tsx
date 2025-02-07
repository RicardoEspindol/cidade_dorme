import Avatar from 'boring-avatars';

interface ICardPlayer {
  name: string; // Nome aleatório
  realName: string; // Nome real do player
}

function CardPlayer({ name, realName }: ICardPlayer) {
  return (
    <div className='flex items-center justify-start p-3 gap-x-3 hover:bg-purple-400 hover:bg-opacity-50 rounded-md mr-1'>
      <Avatar
        name={name}
        variant='beam'
        size={50}
        colors={['#251848', '#000860', '#310078', '#30bfc0', '#f0f0d8']}
      />
      <div>
        <p className='font-space-regular text-sm truncate font-bold'>{realName}</p>
        <p className='font-space-regular text-sm truncate text-gray-500'>({name})</p>
      </div>
    </div>
  );
}

export default CardPlayer;
