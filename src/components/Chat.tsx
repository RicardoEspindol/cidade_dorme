import { useState } from 'react';
import Message from './Message';
import Send from '../../public/icons/Send';
import Cookie from 'js-cookie';
import { sendMessage } from '../integration/Room';

interface IMessage {
  author: string;
  message: string;
}

interface ChatProps {
  mensagens: IMessage[];
  ican: string;
}

function Chat({ mensagens, ican }: ChatProps) {
  const [inputMessage, setInputMessage] = useState('');
  const codRoom = Cookie.get('codigoSala');
  const nick = Cookie.get('nick');

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return; // Evita mensagens vazias

    if (codRoom && nick) {
      try {
        await sendMessage(codRoom, {
          nomeJogador: nick,
          conteudo: inputMessage,
        });
        setInputMessage(''); // Limpa o input após envio
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }
    }
  };

  return (
    <div className='w-full h-full flex flex-col items-start pr-1 border border-primaryMy rounded-lg justify-between'>
      <div className='p-1 flex flex-col overflow-y-auto w-full'>
        <p className='m-2 font-space-bold text-lg'>Chat</p>
        {mensagens
          .filter((msg) => msg.author !== 'Sistema') // Filtra mensagens do sistema
          .map((msg, index) => (
            <Message
              key={index}
              author={msg.author}
              message={msg.message}
              mine={msg.author === nick}
            />
          ))}
      </div>
      <div className='w-full min-h-9 my-[9px] flex items-center justify-center ml-[3px]'>
        <div className='border border-primaryMy rounded-lg w-[95%] h-full p-1 pl-2 flex items-center justify-between'>
          <input
            disabled={ican === 'Noite'}
            placeholder='Digite aqui...'
            type='text'
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className='bg-inherit focus:outline-none text-sm font-space-regular text-black placeholder-black'
          />
          <button
            className='w-8 h-full flex items-center justify-center'
            disabled={ican === 'Noite'}
            onClick={handleSendMessage}
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
