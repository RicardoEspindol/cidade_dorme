import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import Group from '../../public/icons/Group';
import Door from '../../public/icons/Door';
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

interface IButtonRoom {
  name: string;
  quant: number | string;
  max: number | string;
}
const submitEnterSchema = z.object({
  nick: z.string().min(5, 'Digite um nick válido').toLowerCase(),
  password: z.string().min(5, 'A senha deve ter pelo menos 5 caracteres'),
});

type EnterFormData = z.infer<typeof submitEnterSchema>;

function ButtonRoom({ name, quant, max }: IButtonRoom) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EnterFormData>({
    resolver: zodResolver(submitEnterSchema),
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
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <button className='flex items-center justify-between w-full min-h-10 bg-primaryMy rounded-lg px-3 font-space-regular text-sm text-white hover:bg-opacity-90'>
          <div className='flex gap-x-3'>
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
          <AlertDialogTitle className='font-space-regular'>Entrar na Sala</AlertDialogTitle>
          <AlertDialogDescription>
            <div className='text-gray-800 font-space-regular'>Para continuar precisaremos de algumas informações:</div>
            <form
              onSubmit={handleSubmit(() => console.log('wwe'))}
              className='w-full gap-y-3 flex flex-col'
            >
              <div className='flex flex-col gap-y-3 w-full'>
                <InputPassword
                  label='Senha'
                  register={register}
                  error={errors.password?.message}
                  name='password'
                />
                <InputText
                  label='Email'
                  type='email'
                  register={register}
                  error={errors.nick?.message}
                  name='nick'
                />
              </div>
              <button
                type='submit'
                className={`mt-3 mb-3 rounded text-center h-9 w-full font-rajdhani-semibold text-white bg-primaryMy hover:bg-opacity-90`}
              >
                bota
              </button>
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ButtonRoom;
