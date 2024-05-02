import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

const BoxInfo = ({ data, containerClassName }) => {
  return (
    <div
      className={twMerge(
        clsx(
          'w-full bg-white border border-main-700 p-4 flex items-center flex-col justify-center gap-4',
          containerClassName
        )
      )}
    >
      <img
        src={data?.avatar}
        alt="avatar"
        className="w-24 h-24 object-cover rounded-full"
      />
      <h3 className="font-bold">{data?.name}</h3>
      <a
        className="px-6 py-2 bg-main-700 text-white rounded-md font-semibold"
        href={`tel: ${data?.phone}`}
      >
        {data.phone}
      </a>
    </div>
  )
}

export default BoxInfo
