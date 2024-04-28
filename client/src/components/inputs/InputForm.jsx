import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

const InputForm = ({
  style = 'form-input',
  containerClassname,
  label,
  id,
  type = 'text',
  register,
  errors = {},
  inputClassname,
  validate,
  placeholder,
  required = false,
  readOnly = false,
}) => {
  return (
    <div
      className={twMerge(
        clsx('flex flex-col gap-2 w-full', containerClassname)
      )}
    >
      {label && (
        <label className="font-medium text-main-700" htmlFor={id}>
          {label}
          <sup>{required && <span className="text-red-500">*</span>}</sup>
        </label>
      )}
      <input
        type={type}
        id={id}
        className={twMerge(
          clsx(
            style,
            'placeholder:text-sm',
            inputClassname,
            readOnly &&
              'bg-gray-200 select-none cursor-not-allowed focus:ring-0'
          )
        )}
        {...register(id, validate)}
        placeholder={placeholder}
        readOnly={readOnly}
      />
      {errors[id] && (
        <small className="text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  )
}

export default InputForm
