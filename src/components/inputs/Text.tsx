import {
  UseFormRegister,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form';

interface IInputText<T extends FieldValues> {
  label: string;
  type: string;
  register: UseFormRegister<T>;
  error?: string | FieldError;
  name: Path<T>;
  placeholder?: string;
}

function InputText<T extends FieldValues>({
  label,
  type,
  register,
  error,
  name,
  placeholder,
}: IInputText<T>) {
  return (
    <div className='w-full flex flex-col gap-1 relative mt-3'>
      <label className='font-space-regular text-sm text-black'>{label}</label>
      <input
        placeholder={placeholder}
        type={type}
        {...register(name)}
        className='px-3 bg-purple-300 h-8 text-sm border shadow-sm border-purple-400 rounded-sm hover:border-purple-500 focus:outline-none focus:border-purple-500 font-space-regular text-black'
      />
      <p
        className={`text-red-500 text-xs mt-[60px] absolute ${error ? 'visible' : 'invisible'}`}
      >
        {typeof error === 'string' ? error : error?.message}
      </p>
    </div>
  );
}

export default InputText;
