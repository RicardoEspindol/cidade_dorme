import ButtonRoom from '@/components/ButtonRoom';
import CreateRoom from '@/components/CreateRoom';
import { getRooms } from '@/integration/Room';
import { useEffect, useState } from 'react';
import LoadingIcon from '../../public/icons/Loading';
interface Estado {
  fase: string;
  vitima: string | null;
  protegido: string | null;
  investigado: string | null;
  votos: Record<string, number>;
}

export interface Sala {
  nome: string;
  codigo: string;
  senha: string;
  jogadores: unknown[]; // Substitua `any[]` por uma interface mais específica se souber a estrutura dos jogadores
  jogoIniciado: boolean;
  estado: Estado;
  quantidadeJogadores: number;
}
function Room() {
  const [rooms, setRooms] = useState<Sala[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchGetLoan = async () => {
      setIsLoading(true);
      try {
        const response = await getRooms();
        setRooms(response);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Erro ao buscar salas:', error);
        }
        setRooms([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGetLoan();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center flex-row w-full h-screen items-center gap-x-4 font-inter-medium text-clt-2 bg-backgroundMy'>
          <div className='animate-spin'>
            <LoadingIcon />
          </div>
          Carregando...
        </div>
      ) : rooms ? (
        <div className='h-full w-full flex justify-center items-center flex-col overflow-y-auto'>
          <div className='flex items-center justify-between flex-col px-7 py-6 rounded-xl bg-purple-300 bg-opacity-50 backdrop-blur-sm shadow-2xl w-96 h-96 border border-primaryMy'>
            <p className='font-space-medium text-2xl text-black pr-5 w-full'>
              Selecione uma Sala
            </p>
            <div className='overflow-y-auto w-full h-full flex flex-col gap-y-3 pr-1 mt-3'>
              {rooms.map((item, index) => (
                <ButtonRoom
                  key={index}
                  name={item.nome}
                  quant={item.quantidadeJogadores}
                  max={item.quantidadeJogadores}
                  codigo={item.codigo} // Passando o código da sala
                />
              ))}
            </div>
            <CreateRoom setRooms={setRooms} />
          </div>
        </div>
      ) : (
        <div className='w-full flex min-h-screen justify-center items-center flex-col overflow-y-auto bg-backgroundMy font-inter-regular text-lg'>
          <p>Erro durante requisição.</p>
        </div>
      )}
    </>
  );
}
export default Room;
