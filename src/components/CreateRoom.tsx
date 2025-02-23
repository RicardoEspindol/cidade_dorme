import HousePlus from '../../public/icons/HousePlus';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import InputPassword from './inputs/Password';
import InputText from './inputs/Text';
import { createRoom } from '@/integration/Room';
import { toast } from '../hooks/use-toast';
import { Sala } from '@/pages/Room';

const submitCreateRoomSchema = z.object({
  name: z
    .string()
    .min(5, 'Digite um nick válido')
    .toLowerCase()
    .max(15, 'Menos de 15 dígitos por favor')
    .toLowerCase(),
  password: z.string().min(5, 'A senha deve ter pelo menos 5 caracteres'),
});

type CreateRoomFormData = z.infer<typeof submitCreateRoomSchema>;
function CreateRoom({
  setRooms,
}: {
  setRooms: React.Dispatch<React.SetStateAction<Sala[]>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateRoomFormData>({
    resolver: zodResolver(submitCreateRoomSchema),
  });

  // Detecta o clique fora do diálogo
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const postCreateRoom = async (data: CreateRoomFormData) => {
    setIsLoading(true);
    try {
      const response = await createRoom({
        nome: data.name,
        senha: data.password,
        quantidadeJogadores: 6,
      });

      if (response.status === 200) {
        const newRoom = {
          nome: data.name,
          codigo: response.data.codigo, // Pegue o código da resposta, se existir
          senha: data.password,
          jogadores: [],
          jogoIniciado: false,
          estado: {
            fase: 'espera',
            vitima: null,
            protegido: null,
            investigado: null,
            votos: {},
          },
          quantidadeJogadores: 6,
        };

        // Atualiza a lista de salas sem recarregar a página
        setRooms((prevRooms) => [...prevRooms, newRoom]);

        toast({
          title: 'Sala criada',
          description: 'Entre com Nick e senha cadastrada...',
        });

        setIsOpen(false);
        reset();
      }
    } catch (error) {
      console.error('Erro ao criar sala:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <button className='flex gap-x-3 items-center justify-center w-full min-h-10 bg-primaryMy rounded-lg font-space-medium text-sm text-white hover:bg-opacity-90 mt-4'>
          <HousePlus />
          <p className='uppercase'>Criar Sala</p>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent ref={dialogRef} className='w-72'>
        <AlertDialogHeader>
          <AlertDialogTitle className='font-space-regular'>
            Criar Sala
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className='text-gray-900 font-space-regular '>
              Forneça as informações necessárias:
            </div>
            <form
              onSubmit={handleSubmit(postCreateRoom)}
              className='w-full gap-y-3 flex flex-col'
            >
              <div className='flex flex-col gap-y-3 w-full'>
                <InputText
                  label='Nome'
                  type='text'
                  register={register}
                  error={errors.name?.message}
                  name='name'
                />
                <InputPassword
                  label='Senha'
                  register={register}
                  error={errors.password?.message}
                  name='password'
                />
              </div>
              <button
                type='submit'
                className={`mt-4 mb-2 rounded text-center h-9 w-full font-space-semibold text-white bg-primaryMy hover:bg-opacity-90`}
              >
                {isLoading ? 'Criando' : 'Criar'}
              </button>
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CreateRoom;
