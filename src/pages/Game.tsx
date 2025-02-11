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
import { angelSave, cityVote, countVotes, detectiveAccuse, monsterAttack, processTurn } from '@/integration/Vote';
import { toast } from '@/hooks/use-toast';

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

export interface GameData {
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
        setSala(response);

        if (response && response.jogadores) {
          const vivos: Player[] = response.jogadores.filter((player: Player) => player.vivo);
          const eliminados: Player[] = response.jogadores.filter((player: Player) => !player.vivo);

          setPlayersAlive(vivos);
          setPlayersEliminated(eliminados);
        }

        // Lista de papéis que têm ações durante a noite
        const poderes = ["Monstro", "Anjo", "Detetive"];

        // Jogadores com poderes que ainda estão vivos
        const jogadoresComPoderVivos = response?.jogadores?.filter(
          (player: Player) => player.vivo && poderes.includes(player.papel)
        );

        // Contar quantos desses já votaram
        const votosNoturnos = [
          response?.estado?.vitima,
          response?.estado?.protegido,
          response?.estado?.investigado
        ].filter(voto => voto !== null).length;

        // Se todos os jogadores com poderes VIVOS já votaram, processamos o turno
        if (
          response?.estado?.fase === 'Noite' &&
          votosNoturnos === jogadoresComPoderVivos.length
        ) {
          await processTurn(id);
        }

        // Verifica se todos os jogadores vivos votaram durante o dia e apura os votos
        const totalJogadoresVivos = response?.jogadores?.filter((player: Player) => player.vivo).length || 0;
        const totalVotos = Object.keys(response?.estado?.votos || {}).length;

        if (response?.estado?.fase === 'Dia' && totalVotos === totalJogadoresVivos) {
          await countVotes(id);
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
      return;
    }
    try {
      if (sala?.estado.fase === 'Dia') {
        // Durante o dia, todos usam cityVote
        const response = await cityVote(id, {
          nomeJogador: nick!,
          nomeVotado: value,
        });
        if (response.status === 200) {
          toast({
            title: 'Voto captado',
            description: 'Aguardando apuração...',
          });
        }
      } else {
        // Durante a noite, a rota depende do papel do jogador
        let response;
        const nomeJogador = { vote: value };

        switch (jogadorReal?.papel) {
          case 'Monstro':
            response = await monsterAttack(id, nomeJogador);
            if (response.status === 200) {
              toast({
                title: 'Voto captado',
                description: 'Monstro atacou...',
              });
            }
            break;
          case 'Detetive':
            response = await detectiveAccuse(id, nomeJogador);
            if (response.status === 200) {
              toast({
                title: 'Voto captado',
                description: 'Detetive acusou...',
              });
            }
            break;
          case 'Anjo':
            response = await angelSave(id, nomeJogador);
            if (response.status === 200) {
              toast({
                title: 'Voto captado',
                description: 'Anjo salvou...',
              });
            }
            break;
          default:
            return;
        }
      }
    } catch (error) {
      console.error('Erro ao enviar voto:', error);
    }
  };

  const ultimaMensagemSistema = sala?.estado?.mensagens
    ?.filter((msg) => msg.nomeJogador === 'Sistema')
    ?.at(-1); // Pegando a última mensagem
  const monstro = sala?.jogadores.find((jogador) => jogador.papel === "Monstro");
  const cidadeVenceu = monstro && !monstro.vivo;
  const jogoFinalizado = sala?.estado?.fase === "Finalizado";

  const mensagemFinal = jogoFinalizado
    ? cidadeVenceu
      ? "A cidade conseguiu derrotar o monstro! Vitória dos cidadãos! 🎉"
      : "O monstro eliminou todos! Ele venceu! 😈"
    : ultimaMensagemSistema?.conteudo || "Nenhuma mensagem do sistema";


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
            {mensagemFinal}
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
                  {(sala?.estado.fase === 'Dia' ||
                    (['Monstro', 'Detetive', 'Anjo'].includes(
                      jogadorReal?.papel ?? ''
                    ) &&
                      jogadorReal?.vivo)) && (
                    <div className='flex flex-col items-start justify-start w-1/2 pl-4'>
                      <p className='font-space-medium text-black text-lg'>Votação:</p>
                      <div className='flex items-center justify-between w-full'>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild className='h-8'>
                            <button className='w-full h-8 bg-transparent border border-primaryMy justify-between text-start px-3 rounded-sm text-black font-space-medium text-sm mr-4'>
                              {value
                                ? playersAlive.find((framework) => framework.nome === value)?.nome
                                : 'Selecione um player...'}
                            </button>
                          </PopoverTrigger>
                          <button
                            onClick={handleVote}
                            className='w-12 h-8 rounded-sm bg-primaryMy font-space-medium text-white uppercase hover:bg-opacity-90 flex items-center justify-center disabled:cursor-not-allowed'
                            disabled={!value}
                          >
                            <Send fill='#fff' />
                          </button>
                          <PopoverContent className='w-[200px] p-0'>
                            <Command>
                              <CommandInput placeholder='Selecione um player...' className='h-9' />
                              <CommandList>
                                <CommandEmpty>Nada corresponde...</CommandEmpty>
                                <CommandGroup>
                                  {playersAlive.map((framework) => (
                                    <CommandItem
                                      key={framework.conexaoId}
                                      value={framework.nome}
                                      onSelect={(currentValue) => {
                                        setValue(currentValue === value ? '' : currentValue);
                                        setOpen(false);
                                      }}
                                      className='capitalize'
                                    >
                                      {framework.nome}
                                      <CheckIcon
                                        className={cn(
                                          'ml-auto',
                                          value === framework.nome ? 'opacity-100' : 'opacity-0'
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
                  )}
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
