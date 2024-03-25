import { IoMailOpenOutline } from "react-icons/io5"
import { BsTelephone } from "react-icons/bs"
import { TfiFacebook, TfiInstagram, TfiYoutube } from "react-icons/tfi"
import { twMerge } from "tailwind-merge"
import clsx from "clsx"
import withRouter from "~/hocs/withRouter"

const Topheader = withRouter(({ location }) => {
  return (
    <div
      className={twMerge(
        clsx(
          "h-[85px] bg-transparent fixed z-50 top-0 w-full px-[100px] py-[26px] flex items-center justify-between text-white border-b border-main-400",
          location.pathname !== "/" && "bg-main-700"
        )
      )}
    >
      <span className="flex items-center gap-2">
        <IoMailOpenOutline />
        <span>
          <span>Email us at : </span>
          <span className="text-gray-300">example@gmail.com</span>
        </span>
      </span>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-6 text-gray-300 text-xl">
          <TfiFacebook />
          <TfiInstagram />
          <TfiYoutube size={20} />
        </div>
        <div className="flex items-center pl-8 border-l border-main-400">
          <span className="flex items-center gap-2">
            <BsTelephone />
            <span className="text gray-300">123-4567 890</span>
          </span>
        </div>
      </div>
    </div>
  )
})

export default Topheader
