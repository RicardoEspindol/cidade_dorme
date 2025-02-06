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

const submitCreateRoomSchema = z.object({
  name: z.string().min(5, 'Digite um nick válido').toLowerCase(),
  quant: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => Number.isInteger(val) && val > 0, {
      message: 'Quantidade deve ser um inteiro positivo.',
    })
    .refine((val) => val >= 6 && val <= 10, {
      message: 'Quantidade deve estar entre 6 e 10.',
    }),
  password: z.string().min(5, 'A senha deve ter pelo menos 5 caracteres'),
});

type CreateRoomFormData = z.infer<typeof submitCreateRoomSchema>;
function CreateRoom() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const {
    register,
    handleSubmit,
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
          <AlertDialogTitle className='font-space-regular'>Criar Sala</AlertDialogTitle>
          <AlertDialogDescription>
            <div className='text-gray-900 font-space-regular '>Forneça as informações necessárias:</div>
            <form
              onSubmit={handleSubmit(() => console.log('wwe'))}
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
                <InputText
                  label='Quantidade de Participantes'
                  type='number'
                  register={register}
                  error={errors.quant?.message}
                  name='quant'
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
                Criar
              </button>
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CreateRoom;
