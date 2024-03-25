import clsx from "clsx"
import { twMerge } from "tailwind-merge"

const InputRadio = ({
  style = "form-input",
  containerClassname,
  id,
  register,
  errors = {},
  inputClassname,
  validate,
  placeholder,
  options,
  label,
}) => {
  return (
    <div
      className={twMerge(
        clsx("flex flex-col gap-2 w-full", containerClassname)
      )}
    >
      {label && (
        <label className="font-medium text-main-700" htmlFor={id}>
          {label}
        </label>
      )}
      {options.map((el) => (
        <div className="flex items-center gap-4" key={el.value}>
          <input
            type="radio"
            name={id}
            id={el.value}
            className={twMerge(
              clsx(style, "placeholder:text-sm", inputClassname)
            )}
            {...register(id, validate)}
            placeholder={placeholder}
            value={el.value}
          />
          <label className="cursor-pointer" htmlFor={el.value}>
            {el.label}
          </label>
        </div>
      ))}

      {errors[id] && (
        <small className="text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  )
}

export default InputRadio
