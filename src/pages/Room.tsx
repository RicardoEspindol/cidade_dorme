import ButtonRoom from '@/components/ButtonRoom';
import CreateRoom from '@/components/CreateRoom';

function Room() {
  return (
    <div className='h-full w-full flex justify-center items-center flex-col overflow-y-auto'>
      <div className='flex items-center justify-between flex-col p-7 rounded-xl bg-purple-300 bg-opacity-50 backdrop-blur-sm shadow-2xl gap-y-7 w-96 h-96'>
        <p className='font-space-medium text-2xl text-black pr-5 w-full'>
          Selecione uma Sala
        </p>
        <div className='overflow-y-auto w-full h-full flex flex-col gap-y-3 pr-1'>
          <ButtonRoom name='Sala de Reboco' quant={3} max={5} />
          <ButtonRoom name='Ximba de Maria do balcão' quant={5} max={6} />
          <ButtonRoom name='Cabaré da Nice' quant={2} max={9} />
          <ButtonRoom name='Prainha do Soró' quant={7} max={7} />
          <ButtonRoom name='Fundo de Quintal' quant={4} max={2} />
          <ButtonRoom name='Sala de Reboco' quant={3} max={5} />
          <ButtonRoom name='Ximba de Maria do balcão' quant={5} max={6} />
          <ButtonRoom name='Cabaré da Nice' quant={2} max={9} />
          <ButtonRoom name='Prainha do Soró' quant={7} max={7} />
          <ButtonRoom name='Fundo de Quintal' quant={4} max={2} />
          <CreateRoom />
        </div>
      </div>
    </div>
  );
}

export default Room;
