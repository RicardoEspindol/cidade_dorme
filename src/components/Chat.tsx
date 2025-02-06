import { messages } from '@/mocks/MessageData';
import Message from './Message';
import Send from '../../public/icons/Send';

function Chat() {
  return (
    <div className='w-full h-full flex flex-col items-start pr-1  border border-primaryMy rounded-lg'>
      <p className='m-2 font-space-bold text-lg'>Chat</p>
      <div className='p-1 flex flex-col overflow-y-auto'>
        {messages.map((msg, index) => (
          <Message
            key={index}
            author={msg.author}
            message={msg.message}
            mine={msg.mine}
          />
        ))}
      </div>
      <div className='w-full min-h-9 my-[9px] flex items-center justify-center ml-[3px]'>
        <div className='border border-primaryMy rounded-lg w-[95%] h-full p-1 pl-2 flex items-center justify-between '>
          <input
            placeholder='Digite aqui...'
            type='text'
            className='bg-inherit focus:outline-none text-sm font-space-regular text-black placeholder-black'
          ></input>
          <button className=' w-8 h-full flex items-center justify-center'>
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
