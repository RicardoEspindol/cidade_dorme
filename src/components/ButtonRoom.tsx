import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import Group from '../../public/icons/Group';
import Door from '../../public/icons/Door';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Cookie from 'js-cookie';
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
import { useNavigate } from 'react-router-dom';
import { joinRoom } from '@/integration/Room';
import { toast } from '@/hooks/use-toast';
import { AxiosError } from 'axios';

interface IButtonRoom {
  name: string;
  quant: number | string;
  max: number | string;
  codigo: string; // Adicionado para navegação
}

const submitEnterSchema = z.object({
  nick: z.string().min(5, 'Digite um nick válido').toLowerCase(),
  password: z.string().min(5, 'A senha deve ter pelo menos 5 caracteres'),
});

type EnterFormData = z.infer<typeof submitEnterSchema>;

function ButtonRoom({ name, quant, max, codigo }: IButtonRoom) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate(); // Hook para navegação
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EnterFormData>({
    resolver: zodResolver(submitEnterSchema),
  });

  async function onSubmit(data: EnterFormData) {
    try {
      const payload = {
        nomeJogador: data.nick, // 🚀 Convertendo para o formato esperado
        senha: data.password,
      };
      const response = await joinRoom(codigo, payload);
      if (response.status === 200) {
        Cookie.set('codigoSala', codigo);
        Cookie.set('nick', data.nick);
        navigate(`/play`);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Erro ao entrar na sala:', axiosError);
      toast({
        title: 'Erro ao entrar na sala',
        description: 'Sala completa, senha incorreta ou nick já utilizado...',
      });
    }
  };

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

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <button className='flex items-center justify-between w-full min-h-10 bg-primaryMy rounded-lg px-3 font-space-regular text-sm text-white hover:bg-opacity-90'>
          <div className='flex gap-x-3 truncate'>
            <Door />
            <p>{name}</p>
          </div>
          <div className='flex gap-x-3'>
            <p>
              {quant}/{max}
            </p>
            <div className='mt-[1px]'>
              <Group />
            </div>
          </div>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent ref={dialogRef} className='w-72'>
        <AlertDialogHeader>
          <AlertDialogTitle className='font-space-regular'>
            Entrar na Sala
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className='text-gray-900 font-space-regular '>
              Para continuar, insira seu nome e senha da sala:
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='w-full gap-y-3 flex flex-col'
            >
              <div className='flex flex-col gap-y-3 w-full'>
                <InputText
                  label='Nick'
                  type='text'
                  register={register}
                  error={errors.nick?.message}
                  name='nick'
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
                Entrar
              </button>
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ButtonRoom;
