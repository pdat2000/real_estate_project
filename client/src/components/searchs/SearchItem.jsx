import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

const SearchItem = ({ title, children, className }) => {
  return (
    <div
      className={twMerge(
        clsx(
          'flex flex-col gap-2 items-center justify-center border-r-2 relative',
          className
        )
      )}
    >
      <h3 className="font-bold text-main-700">{title}</h3>
      {children}
    </div>
  )
}

export default SearchItem
