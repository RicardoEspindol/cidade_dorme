import ButtonRoom from '@/components/ButtonRoom';
import CreateRoom from '@/components/CreateRoom';
import { getRooms } from '@/integration/Room';
import { useEffect, useState, useRef } from 'react';
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
  jogadores: unknown[];
  jogoIniciado: boolean;
  estado: Estado;
  quantidadeJogadores: number;
}

function Room() {
  const [rooms, setRooms] = useState<Sala[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Começa carregando na primeira renderização
  const isFirstLoad = useRef(true); // Referência para identificar a primeira chamada

  useEffect(() => {
    const fetchGetRooms = async () => {
      try {
        const response = await getRooms();
        setRooms(response);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Erro ao buscar salas:', error);
        }
        setRooms([]);
      } finally {
        if (isFirstLoad.current) {
          setIsLoading(false); // Desativa o loading apenas na primeira vez
          isFirstLoad.current = false; // Marca que a primeira chamada já aconteceu
        }
      }
    };

    fetchGetRooms(); // Chamada inicial

    const interval = setInterval(fetchGetRooms, 4000); // Atualização periódica

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
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
                  quant={item.jogadores.length}
                  max={item.quantidadeJogadores}
                  codigo={item.codigo}
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
