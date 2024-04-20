import { IoMailOpenOutline } from 'react-icons/io5'
import { BsTelephone } from 'react-icons/bs'
import { TfiFacebook, TfiInstagram, TfiYoutube } from 'react-icons/tfi'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'
import withRouter from '~/hocs/withRouter'
import { useUserStore } from '~/store/useUserStore'
import { Fragment, useEffect, useRef, useState } from 'react'
import { showOption } from '~/utils/constants'
import { Link } from 'react-router-dom'

const Topheader = withRouter(({ location }) => {
  const { current, logout } = useUserStore()
  const optionBox = useRef()
  const [isShowOptions, setIsShowOptions] = useState(false)
  useEffect(() => {
    const handleOnClick = (e) => {
      if (optionBox.current && optionBox.current.contains(e.target))
        setIsShowOptions(true)
      else setIsShowOptions(false)
    }
    document.addEventListener('click', handleOnClick)

    return () => {
      document, addEventListener('click', handleOnClick)
    }
  }, [])

  return (
    <div
      className={twMerge(
        clsx(
          'h-[85px] bg-transparent fixed z-50 top-0 w-full px-[100px] py-[26px] flex items-center justify-between text-white border-b border-main-400',
          location.pathname !== '/' && 'bg-main-700'
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
        {current && (
          <div
            ref={optionBox}
            onClick={() => setIsShowOptions(true)}
            className="flex items-center pl-8 border-l border-main-400 gap-4 cursor-pointer hover:bg-overlay-30 rounded-md relative"
          >
            <div className="flex flex-col gap-2">
              <span>{current?.name}</span>
              <span>ID: {current?.id}</span>
            </div>
            <img
              src={current?.avatar || '/user.svg'}
              alt="avatar"
              className="w-8 h-8 object-cover rounded-full"
            />
            {isShowOptions && (
              <div className="absolute right-0 top-full bg-white drop-shadow-sm flex flex-col py-2 border text-black rounded-md z-50">
                {showOption.map((el) => (
                  <Fragment key={el.id}>
                    {current?.userRoles?.some(
                      (role) => role.roleCode === el.code
                    ) && (
                      <Link
                        className="px-6 py-2 hover:bg-gray-100"
                        to={el.path}
                      >
                        {el.name}
                      </Link>
                    )}
                  </Fragment>
                ))}
                <span className="px-6 py-2 hover:bg-gray-100" onClick={logout}>
                  Logout
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
})

export default Topheader
