import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Link } from 'react-router-dom';

function Instructions() {
  return (
    <div className='h-full w-full flex justify-center items-center flex-col overflow-y-auto'>
      <div className='flex items-center justify-between flex-col rounded-xl bg-purple-300 bg-opacity-50 backdrop-blur-sm shadow-2xl gap-y-7'>
        <Carousel className='w-full'>
          <CarouselContent className='max-w-96'>
            <CarouselItem>
              <Card className='bg-transparent border-none shadow-none w-96 h-96'>
                <CardContent className='flex flex-col p-6 gap-y-6'>
                  <p className='font-space-medium text-2xl text-black pr-5'>
                    Objetivo do Jogo
                  </p>
                  <ol className='list-inside list-disc pr-5 font-space-regular'>
                    <li>
                      Os cidadãos devem identificar e eliminar os monstros antes
                      que eles dominem a cidade.
                    </li>
                    <li>
                      Os monstros precisam eliminar todos os cidadãos sem serem
                      descobertos.
                    </li>
                    <li>
                      Outros papéis, como detetive, anjo, e médico, têm funções
                      específicas para ajudar ou dificultar os objetivos das
                      equipes.
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card className='bg-transparent border-none shadow-none w-full h-96'>
                <CardContent className='flex flex-col p-6 gap-y-6 h-full w-full'>
                  <p className='font-space-medium text-2xl text-black pr-5'>
                    1. Como Jogar
                  </p>
                  <div className='overflow-y-auto'>
                    <p className='font-space-regular text-lg text-black pr-5 mb-2'>
                      1. Configuração do Jogo
                    </p>
                    <ol className='list-inside list-disc pr-2 font-space-regular'>
                      <li>
                        Número de Jogadores: De 6 a 15 (recomendado). O jogo se
                        adapta ao número de participantes para equilibrar os
                        papéis.
                      </li>
                      <li>
                        Distribuição de Papéis:
                        <ol className='list-inside list-disc ml-4'>
                          <li>
                            1 Monstro (2 ou mais, dependendo do número de
                            jogadores)
                          </li>
                          <li>1 Detetive</li>
                          <li>1 Anjo</li>
                          <li>Cidadãos para preencher o restante</li>
                        </ol>
                      </li>
                      <li>
                        O narrador é substituído por uma IA ou moderador online
                        que gerencia a rodada automaticamente.
                      </li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card className='bg-transparent border-none shadow-none w-full h-96'>
                <CardContent className='flex flex-col p-6 gap-y-6 h-full w-full'>
                  <p className='font-space-medium text-2xl text-black pr-5'>
                    2. Ciclo de Rodadas
                  </p>
                  <div className='overflow-y-auto'>
                    <p className='font-space-regular text-lg text-black pr-5 mb-2'>
                      O jogo alterna entre duas fases: Noite e Dia.
                    </p>
                    <p className='font-space-semibold mb-3 underline'>
                      Fase da Noite:
                    </p>
                    <ol className='list-inside list-decimal pr-2 font-space-regular '>
                      <li>
                        Todos os jogadores "dormem":
                        <ol className='list-inside list-disc ml-4'>
                          <li>
                            Cada jogador fecha os olhos ou fica inativo enquanto
                            a IA gerencia as ações.
                          </li>
                        </ol>
                      </li>
                      <li>
                        Ações dos papéis especiais:
                        <ol className='list-inside list-disc ml-4'>
                          <li>Monstro: Escolhe um jogador para eliminar.</li>
                          <li>Anjo: Escolhe um jogador para proteger.</li>
                          <li>
                            Detetive: Escolhe um jogador para investigar (recebe
                            uma resposta da IA se é monstro ou não).
                          </li>
                          <li>
                            Médico (se existir): Escolhe um jogador para curar.
                          </li>
                        </ol>
                      </li>
                      <li>
                        As ações são realizadas em segredo através de menus ou
                        botões dedicados na interface do jogo.
                      </li>
                    </ol>
                    <p className='font-space-semibold mb-3 underline mt-3'>
                      Fase do Dia:
                    </p>
                    <ol className='list-inside list-decimal pr-2 font-space-regular '>
                      <li>
                        Acordar:
                        <ol className='list-inside list-disc ml-4'>
                          <li>
                            A IA anuncia quem foi eliminado (se alguém foi) e se
                            houve proteção ou cura bem-sucedida.
                          </li>
                        </ol>
                      </li>
                      <li>
                        Discussão:
                        <ol className='list-inside list-disc ml-4'>
                          <li>
                            Os jogadores discutem e compartilham suas suspeitas
                            no chat ou por voz.
                          </li>
                        </ol>
                      </li>
                      <li>
                        Votação:
                        <ol className='list-inside list-disc ml-4'>
                          <li>
                            Cada jogador vota em quem acreditam ser o monstro. O
                            jogador mais votado é eliminado (em caso de empate,
                            a IA decide aleatoriamente ou deixa os votos
                            anularem).
                          </li>
                        </ol>
                      </li>
                      <li>
                        A IA revela se o jogador eliminado era monstro ou não.
                      </li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
            {/* 3. Vencer o Jogo */}
            <CarouselItem>
              <Card className='bg-transparent border-none shadow-none w-full h-96'>
                <CardContent className='flex flex-col p-6 gap-y-6 h-full w-full'>
                  <p className='font-space-medium text-2xl text-black pr-5'>
                    3. Vencer o Jogo
                  </p>
                  <div className='overflow-y-auto'>
                    <ol className='list-inside list-disc pr-2 font-space-regular'>
                      <li>
                        Os cidadãos vencem se todos os monstros forem
                        eliminados.
                      </li>
                      <li>
                        Os monstros vencem se o número de monstros igualar ou
                        superar o número de cidadãos.
                      </li>
                      <li>
                        Outros papéis têm objetivos secundários que podem
                        influenciar o resultado do jogo.
                      </li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card className='bg-transparent border-none shadow-none w-full h-96'>
                <CardContent className='flex flex-col p-6 gap-y-6 h-full w-full'>
                  <p className='font-space-medium text-2xl text-black pr-5'>
                    Regras
                  </p>
                  <div className='overflow-y-auto'>
                    <ol className='list-inside list-disc pr-2 font-space-regular'>
                      <li>
                        Os jogadores não podem revelar seus papéis diretamente
                        (exceto em circunstâncias específicas, como poderes
                        especiais que permitam isso).
                      </li>
                      <li>
                        Todas as comunicações devem ocorrer durante as fases
                        apropriadas (Noite ou Dia).
                      </li>
                      <li>
                        É proibido compartilhar capturas de tela, gravações ou
                        outros métodos externos para provar seu papel.
                      </li>
                      <li>
                        O uso de lógica, deduções e enganação são permitidos
                        para alcançar os objetivos do jogo.
                      </li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card className='bg-transparent border-none shadow-none w-full h-96'>
                <CardContent className='flex flex-col p-6 gap-y-6 h-full w-full'>
                  <p className='font-space-medium text-2xl text-black pr-5'>
                    Dicas
                  </p>
                  <div className='overflow-y-auto'>
                    <ol className='list-inside list-disc pr-2 font-space-regular'>
                      <li>
                        Como Cidadão: Observe o comportamento dos outros
                        jogadores e preste atenção em contradições.
                      </li>
                      <li>
                        Como Monstro: Tente agir de forma natural e desviar as
                        suspeitas para outros jogadores.
                      </li>
                      <li>
                        Use o chat estrategicamente, mas cuidado para não ser
                        muito insistente ou evasivo.
                      </li>
                      <li>
                        Trabalhe em equipe quando possível, mas lembre-se de que
                        nem todos os jogadores podem ser confiáveis.
                      </li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card className='bg-transparent border-none shadow-none w-full h-96'>
                <CardContent className='flex flex-col p-6 gap-y-6 h-full w-full'>
                  <p className='font-space-medium text-2xl text-black pr-5'>
                    Ferramentas
                  </p>
                  <div className='overflow-y-auto'>
                    <ol className='list-inside list-disc pr-2 font-space-regular'>
                      <li>
                        Sistema de IA para gerenciar rodadas, ações e resultados
                        automaticamente.
                      </li>
                      <li>
                        Chat de texto e/ou voz integrado para facilitar a
                        comunicação entre os jogadores.
                      </li>
                      <li>
                        Menus interativos para realizar ações (como escolher
                        alvos ou votar em suspeitos).
                      </li>
                      <li>
                        Histórico de ações e resultados para revisão e análise
                        durante o jogo.
                      </li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card className='bg-transparent border-none shadow-none w-full h-96'>
                <CardContent className='flex flex-col p-6 gap-y-6 h-full w-full'>
                  <p className='font-space-medium text-2xl text-black pr-5'>
                    Para onde ir agora?
                  </p>
                  <p className='font-space-regular text-black pr-2 mb-2'>
                    Decida seu destino pequeno gafanhoto
                  </p>
                  <div className='overflow-y-auto h-full w-full flex items-center justify-center flex-col gap-y-6'>
                    <Link
                      to={'/'}
                      className='w-full h-10 rounded-lg bg-primaryMy font-space-medium text-white uppercase hover:bg-opacity-90 flex items-center justify-center'
                    >
                      Jogar
                    </Link>
                    <Link
                      to={'/'}
                      className='w-full h-10 rounded-lg bg-primaryMy font-space-medium text-white uppercase hover:bg-opacity-90 flex items-center justify-center'
                    >
                      Ir para tela de Home
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className='bg-purple-300 bg-opacity-50 backdrop-blur-sm hover:bg-gray-100 hover:bg-opacity-50' />
          <CarouselNext className='bg-purple-300 bg-opacity-50 backdrop-blur-sm hover:bg-gray-100 hover:bg-opacity-50' />
        </Carousel>
      </div>
    </div>
  );
}

export default Instructions;
