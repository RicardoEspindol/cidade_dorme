import Chat from '@/components/Chat';
import Avatar from 'boring-avatars';
import Swords from '../../public/icons/Swords';
import AvatarGame from '@/components/AvatarGame';
import { getRandomNames } from '@/mocks/IconsData';
import { names } from '@/mocks/IconsData';
import { useState } from 'react';
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

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];

function Game() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const selectedNames = getRandomNames(names, 9);
  const selectedNamesExclude = getRandomNames(names, 5);

  return (
    <div className='h-full w-full flex justify-center items-center flex-col overflow-y-auto'>
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
                  <p className='font-space-bold text-2xl text-black'>
                    Sally Rid
                  </p>
                  <p className='font-space-regular text-sm text-black'>
                    Monstro
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
                <p className='font-space-regular text-sm text-black'>6</p>
              </div>
            </div>
            <div className='w-full h-[60%] flex items-center justify-between gap-x-4 mt-4'>
              <div className='w-[50%] h-full border border-primaryMy rounded-lg flex items-center justify-center flex-col pb-1'>
                <div className='font-space-semibold text-lg text-start w-full mt-2 flex justify-between pl-[15px]'>
                  <p>Jogando:</p>
                  <p className='pr-6'>9</p>
                </div>
                <div className='w-[98%] p-3 pt-0 overflow-y-auto flex items-center justify-between gap-2 flex-wrap h-[98%]'>
                  {selectedNames.map((name, index) => (
                    <AvatarGame key={index} name={name} />
                  ))}
                </div>
              </div>
              <div className='w-[50%] h-full border border-primaryMy rounded-lg flex items-center justify-center flex-col pb-1'>
                <div className='font-space-semibold text-lg text-start w-full mt-2 flex justify-between pl-[15px]'>
                  <p>Eliminados:</p>
                  <p className='pr-6'>5</p>
                </div>
                <div className='w-[98%] p-3 pt-0 overflow-y-auto flex items-center justify-between gap-2 flex-wrap h-[98%]'>
                  {selectedNamesExclude.map((name, index) => (
                    <AvatarGame key={index} name={name} />
                  ))}
                </div>
              </div>
            </div>
            <div className='w-full h-[20%] border border-primaryMy rounded-lg mt-4 flex items-center justify-between gap-x-4 px-4'>
              <div className='flex flex-col items-start justify-start w-1/2'>
                <p className='font-space-medium text-black text-lg'>Status:</p>
                <p className='font-space-regular text-sm text-black'>
                  Cidade Dormindo...
                </p>
              </div>
              <div className='flex flex-col items-start justify-start w-1/2 pl-4'>
                <p className='font-space-medium text-black text-lg'>Votação:</p>
                <div className='flex items-center justify-between w-full'>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild className='h-8'>
                      <button className='w-full h-8 bg-transparent border border-primaryMy justify-between text-start px-3 rounded-sm text-black font-space-medium text-sm mr-4'>
                        {value
                          ? frameworks.find(
                              (framework) => framework.value === value
                            )?.label
                          : 'Selecione um player...'}
                      </button>
                    </PopoverTrigger>
                    <button className='w-12  h-8 rounded-sm bg-primaryMy font-space-medium text-white uppercase hover:bg-opacity-90 flex items-center justify-center'>
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
                            {frameworks.map((framework) => (
                              <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                  setValue(
                                    currentValue === value ? '' : currentValue
                                  );
                                  setOpen(false);
                                }}
                              >
                                {framework.label}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto',
                                    value === framework.value
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
            </div>
          </div>
          <div className='h-full min-w-56'>
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
