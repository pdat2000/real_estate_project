import clsx from "clsx"
import { twMerge } from "tailwind-merge"
import { FaSpinner } from "react-icons/fa6"

const Button = ({
  children,
  className,
  handleOnClick,
  type = "button",
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={handleOnClick}
      className={twMerge(
        clsx(
          "py-3 px-4 text-white bg-main-700 rounded-md flex items-center justify-center gap-3",
          className,
          disabled && "opacity-50 "
        )
      )}
      disabled={disabled}
    >
      {disabled && (
        <span className="animate-spin">
          <FaSpinner />
        </span>
      )}

      {children}
    </button>
  )
}

export default Button
