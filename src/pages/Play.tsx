import { getRandomNames } from '@/mocks/IconsData';
import { names } from '@/mocks/IconsData';
import CardPlayer from '@/components/CardPlayer';
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import { getRoomId } from '@/integration/Room';

interface Player {
  nome: string;
  conexaoId: string;
  papel: string | null;
  vivo: boolean;
}

function Play() {
  const id = Cookie.get('codigoSala');
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerNames, setPlayerNames] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  if (!id) {
    throw new Error('Sala não encontrada.');
  }

  useEffect(() => {
    const fetchPlayers = async () => {
      setIsLoading(true);
      try {
        const response = await getRoomId(id);
        console.log('API Response:', response); // <-- Verifica o formato da resposta

        // Verifica se o campo 'jogadores' existe e é um array
        const playerList: Player[] = Array.isArray(response.jogadores) ? response.jogadores : [];

        setPlayers(playerList);

        // Sorteia nomes aleatórios para os jogadores
        const selectedNames = getRandomNames(names, playerList.length);

        // Atribui nomes aleatórios para cada jogador, usando 'conexaoId' como chave
        const assignedNames: { [key: string]: string } = playerList.reduce((acc, player, index) => {
          acc[player.conexaoId] = selectedNames[index]; // Atribui o nome aleatório
          return acc;
        }, {} as { [key: string]: string });  // Tipagem explicita do objeto

        setPlayerNames(assignedNames);
      } catch (error) {
        console.error('Erro ao buscar salas:', error);
        setPlayers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, [id]);

  console.log(players);
  console.log(isLoading);

  return (
    <div className="h-full w-full flex justify-center items-center flex-col overflow-y-auto">
      <div className="flex items-center justify-between flex-col p-7 rounded-xl bg-purple-300 bg-opacity-50 backdrop-blur-sm shadow-2xl w-[50%] max-h-[65%] border border-primaryMy">
        <p className="font-space-medium text-2xl text-black pr-5 w-full mb-2">
          Iniciar Partida
        </p>
        <div className="grid grid-cols-3 w-full h-full overflow-y-auto">
          {players.map((player) => (
            <CardPlayer
              key={player.conexaoId}
              name={playerNames[player.conexaoId] || 'Desconhecido'}
              realName={player.nome} // Exibimos o nome real também
            />
          ))}
        </div>
        <div className="flex w-full gap-x-6 mt-5">
          <Link
            to={'/room'}
            className="flex items-center justify-center w-full min-h-9 bg-primaryMy rounded-lg font-space-medium text-sm text-white hover:bg-opacity-90"
          >
            <p className="uppercase">Destruir Sala</p>
          </Link>
          <Link
            to={'/game'}
            className="flex items-center justify-center w-full min-h-9 bg-primaryMy rounded-lg font-space-medium text-sm text-white hover:bg-opacity-90"
          >
            <p className="uppercase">Iniciar Jogo</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Play;
