import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { FiUpload } from 'react-icons/fi'

const InputFile = ({
  containerClassname,
  label,
  id,
  register,
  errors = {},
  validate,
}) => {
  return (
    <div
      className={twMerge(
        clsx('flex flex-col gap-2 w-full', containerClassname)
      )}
    >
      {label && (
        <span className="font-medium text-main-700" htmlFor={id}>
          {label}
        </span>
      )}
      <input
        type="file"
        id={id}
        {...register(id, validate)}
        className="hidden"
      />
      <label
        className="bg-gray-100 w-full p-6 flex items-center justify-center flex-col gap-2"
        htmlFor={id}
      >
        <span className="text-3xl text-gray-300">
          <FiUpload />
        </span>
        <small className="text-gray-300 italic">
          Only support image with extension JPEG, PNG, JPG.
        </small>
      </label>
      {errors[id] && (
        <small className="text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  )
}

export default InputFile
