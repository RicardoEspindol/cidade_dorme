import Chat from '@/components/Chat';
import Avatar from 'boring-avatars';
import Swords from '../../public/icons/Swords';
import AvatarGame from '@/components/AvatarGame';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CheckIcon } from '@radix-ui/react-icons';
import Send from '../../public/icons/Send';
import { getRoomId } from '@/integration/Room';
import Cookie from 'js-cookie';
import LoadingIcon from '../../public/icons/Loading';
import { cityVote } from '@/integration/Vote';

interface Player {
  conexaoId: string;
  nome: string;
  papel: string;
  vivo: boolean;
}
interface IMensagem {
  conteudo: string;
  nomeJogador: string;
  timestamp: Date;
}

interface GameState {
  fase: string;
  investigado: string | null;
  protegido: string | null;
  mensagens: IMensagem[]; // ✅ CORRIGIDO
  vitima: string | null;
  votos: Record<string, number>;
}

interface GameData {
  nome: string;
  codigo: string;
  senha: string;
  jogadores: Player[];
  jogoIniciado: boolean;
  quantidadeJogadores: number;
  estado: GameState;
}
function Game() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [playersAlive, setPlayersAlive] = useState<Player[]>([]);
  const [playersEliminated, setPlayersEliminated] = useState<Player[]>([]);
  const [sala, setSala] = useState<GameData>()!;
  const nick = Cookie.get('nick'); // Obtendo o nome do jogador salvo no cookie

  // Filtrando o jogador correspondente na lista de jogadores
  const jogadorReal = sala?.jogadores?.find((player) => player.nome === nick);

  const id = Cookie.get('codigoSala');
  if (!id) {
    throw new Error('Sala não encontrada.');
  }

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await getRoomId(id);
        console.log('API Response:', response);
        setSala(response);

        if (response && response.jogadores) {
          // Separando jogadores vivos e eliminados com tipagem explícita
          const vivos: Player[] = response.jogadores.filter(
            (player: Player) => player.vivo
          );
          const eliminados: Player[] = response.jogadores.filter(
            (player: Player) => !player.vivo
          );

          setPlayersAlive(vivos);
          setPlayersEliminated(eliminados);
        }
      } catch (error) {
        console.error('Erro ao buscar jogadores:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayers();
    const interval = setInterval(fetchPlayers, 2000); // Atualização periódica

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [id, setSala]);

  const handleVote = async () => {
    if (!value) {
      alert('Selecione um jogador antes de votar.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await cityVote(id, {
        nomeJogador: nick!,
        nomeVotado: value,
      });

      console.log('Voto enviado com sucesso:', response.data);
      alert('Voto registrado!');
    } catch (error) {
      console.error('Erro ao enviar voto:', error);
      alert('Erro ao registrar o voto. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const ultimaMensagemSistema = sala?.estado?.mensagens
    ?.filter((msg) => msg.nomeJogador === 'Sistema')
    ?.at(-1); // Pegando a última mensagem

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center flex-row w-full h-screen items-center gap-x-4 font-inter-medium text-clt-2 bg-backgroundMy'>
          <div className='animate-spin'>
            <LoadingIcon />
          </div>
          Carregando...
        </div>
      ) : (
        <div className='h-full w-full flex justify-center items-center flex-col overflow-y-auto'>
          <div className='w-[70%] h-12 bg-purple-300 bg-opacity-50 backdrop-blur-sm shadow-2xl text-center flex items-center justify-center font-space-medium mb-5 rounded-md border border-primaryMy text-nowrap line-clamp-1 truncate uppercase'>
            {ultimaMensagemSistema?.conteudo || 'Nenhuma mensagem do sistema'}
          </div>
          <div className='flex items-center justify-between flex-col p-7 rounded-lg bg-purple-300 bg-opacity-50 backdrop-blur-sm shadow-2xl w-[70%] h-[75%] border border-primaryMy'>
            <div className='w-full h-full flex'>
              <div className='w-full h-full flex flex-col pr-4'>
                <div className='w-full h-[15%] flex items-center justify-between'>
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
                      <p className='font-space-bold text-2xl text-black capitalize'>
                        {jogadorReal?.nome || 'Nome não encontrado'}
                      </p>
                      <p className='font-space-regular text-sm text-black capitalize'>
                        {jogadorReal?.papel || 'Papel não encontrado'}
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
                    <p className='font-space-regular text-sm text-black'>
                      {playersEliminated.length + 1}
                    </p>
                  </div>
                </div>
                <div className='w-full h-[60%] flex items-center justify-between gap-x-4 mt-4'>
                  {/* Jogadores vivos */}
                  <div className='w-[50%] h-full border border-primaryMy rounded-lg flex items-center justify-center flex-col pb-1'>
                    <div className='font-space-semibold text-lg text-start w-full mt-2 flex justify-between pl-[15px]'>
                      <p>Jogando:</p>
                      <p className='pr-6'>{playersAlive.length}</p>
                    </div>
                    <div className='w-[98%] p-3 pt-0 overflow-y-auto flex items-center justify-between gap-2 flex-wrap h-[98%]'>
                      {playersAlive.map((player: Player) => (
                        <AvatarGame key={player.conexaoId} name={player.nome} />
                      ))}
                    </div>
                  </div>

                  {/* Jogadores eliminados */}
                  <div className='w-[50%] h-full border border-primaryMy rounded-lg flex items-center justify-center flex-col pb-1'>
                    <div className='font-space-semibold text-lg text-start w-full mt-2 flex justify-between pl-[15px]'>
                      <p>Eliminados:</p>
                      <p className='pr-6'>{playersEliminated.length}</p>
                    </div>
                    <div className='w-[98%] p-3 pt-0 overflow-y-auto flex items-center justify-between gap-2 flex-wrap h-[98%]'>
                      {playersEliminated.map((player: Player) => (
                        <AvatarGame key={player.conexaoId} name={player.nome} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className='w-full h-[20%] border border-primaryMy rounded-lg mt-4 flex items-center justify-between gap-x-4 px-4'>
                  <div className='flex flex-col items-start justify-start w-1/2'>
                    <p className='font-space-medium text-black text-lg'>
                      Status:
                    </p>
                    <p className='font-space-regular text-sm text-black'>
                      Cidade
                      {sala?.estado.fase === 'Noite'
                        ? ' Dormindo'
                        : ' Acordada'}
                    </p>
                  </div>
                  {jogadorReal?.papel === 'Monstro' ||
                  jogadorReal?.papel === 'Detetive' ||
                  jogadorReal?.papel === 'Anjo' ? (
                    <div className='flex flex-col items-start justify-start w-1/2 pl-4'>
                      <p className='font-space-medium text-black text-lg'>
                        Votação:
                      </p>
                      <div className='flex items-center justify-between w-full'>
                        <Popover open={open} onOpenChange={setOpen} >
                          <PopoverTrigger asChild className='h-8'>
                            <button className='w-full h-8 bg-transparent border border-primaryMy justify-between text-start px-3 rounded-sm text-black font-space-medium text-sm mr-4'>
                              {value
                                ? playersAlive.find(
                                    (framework) => framework.nome === value
                                  )?.nome
                                : 'Selecione um player...'}
                            </button>
                          </PopoverTrigger>
                          <button
                            onClick={handleVote}
                            className='w-12 h-8 rounded-sm bg-primaryMy font-space-medium text-white uppercase hover:bg-opacity-90 flex items-center justify-center disabled:cursor-not-allowed'

                          >
                            <Send fill='#fff' />
                          </button>
                          <PopoverContent className='w-[200px] p-0'>
                            <Command>
                              <CommandInput
                                placeholder='Selecione um player...'
                                className='h-9'
                              />
                              <CommandList>
                                <CommandEmpty>Nada corresponde...</CommandEmpty>
                                <CommandGroup>
                                  {playersAlive.map((framework) => (
                                    <CommandItem
                                      key={framework.conexaoId}
                                      value={framework.nome}
                                      onSelect={(currentValue) => {
                                        setValue(
                                          currentValue === value
                                            ? ''
                                            : currentValue
                                        );
                                        setOpen(false);
                                      }}
                                      className='capitalize'
                                    >
                                      {framework.nome}
                                      <CheckIcon
                                        className={cn(
                                          'ml-auto',
                                          value === framework.nome
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className='h-full min-w-56'>
                <Chat
                  mensagens={(sala?.estado?.mensagens || []).map((msg) => ({
                    author: msg.nomeJogador, // Ajuste aqui para o nome correto
                    message: msg.conteudo, // Ajuste conforme necessário
                    time: msg.timestamp,
                  }))}
                  ican={sala?.estado.fase ? sala?.estado.fase : 'oloko'}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Game;
