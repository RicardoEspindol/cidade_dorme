import {
  UseFormRegister,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form';
import EyeIcon2 from '../../../public/icons/EyeClose';
import EyeIcon from '../../../public/icons/Eye';
import { useState } from 'react';

interface IInputPassword<T extends FieldValues> {
  label: string;
  register: UseFormRegister<T>;
  error?: string | FieldError;
  name: Path<T>;
}

function InputPassword<T extends FieldValues>({
  label,
  register,
  error,
  name,
}: IInputPassword<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className='w-full flex flex-col gap-1 relative mt-3'>
      <label className='font-space-regular text-sm text-black'>{label}</label>
      <div className='w-full flex border border-purple-400 rounded-sm hover:border-purple-500 focus:border-purple-500'>
        <input
          type={showPassword ? 'text' : 'password'}
          {...register(name)}
          className='w-full px-3 bg-purple-300 h-8 text-sm shadow-sm focus:outline-none text-black font-space-regular'
        />
        <button
          type='button'
          onClick={togglePasswordVisibility}
          className='px-3 bg-purple-300 h-8 shadow-sm'
        >
          {showPassword ? <EyeIcon /> : <EyeIcon2 />}
        </button>
      </div>
      <p
        className={`text-red-500 text-xs mt-[60px] absolute ${error ? 'visible' : 'invisible'}`}
      >
        {typeof error === 'string' ? error : error?.message}
      </p>
    </div>
  );
}

export default InputPassword;
