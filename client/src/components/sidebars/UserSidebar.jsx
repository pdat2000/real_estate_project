import clsx from 'clsx'
import { Fragment, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { userSibar } from '~/utils/constants'
import { AiOutlineCaretRight, AiFillCaretDown } from 'react-icons/ai'
import { ImForward } from 'react-icons/im'
import { useUserStore } from '~/store/useUserStore'

const UserSidebar = () => {
  const { current } = useUserStore()
  const [activeTabs, setActiveTabs] = useState([])
  const handleActivateTabs = (tabId) => {
    if (activeTabs.some((el) => el === tabId))
      setActiveTabs((prev) => prev.filter((el) => el !== tabId))
    else setActiveTabs((prev) => [...prev, tabId])
  }

  return (
    <div className="h-full w-full bg-main-700 text-white">
      <div className="w-full flex justify-center items-center flex-col p-4">
        <img
          src={current?.avatar || '/user.svg'}
          alt="avatar"
          className="w-20 h-20 object-cover rounded-full"
        />
        <span className="text-lg font-bold text-orange-500">
          {current?.name}
        </span>
        <span className="text-main-500 font-bold">{current?.phone}</span>
        <span className="text-xs">
          {current?.userRoles?.map((el) => el.roleName.value).join('/')}
        </span>
      </div>
      <div className="mt-6">
        {userSibar.map((el) => (
          <Fragment key={el.id}>
            {el.type === 'SINGLE' && (
              <NavLink
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-2 px-4 py-3 hover:bg-main-600 hover:border-r-4 border-orange-700',
                    isActive && 'bg-main-700 border-r-4'
                  )
                }
                to={el.path}
              >
                <span className="text-2xl">{el.icon}</span>
                <span>{el.name}</span>
              </NavLink>
            )}
            {el.type === 'PARENT' && (
              <>
                <div
                  onClick={() => handleActivateTabs(el.id)}
                  className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-main-600"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-2xl">{el.icon}</span>
                    <span className="select-none">{el.name}</span>
                  </span>
                  <span>
                    {activeTabs.some((tabId) => tabId === el.id) ? (
                      <AiFillCaretDown size={20} />
                    ) : (
                      <AiOutlineCaretRight size={20} />
                    )}
                  </span>
                </div>
                {activeTabs.some((tabId) => tabId === el.id) && (
                  <div>
                    {el.subs.map((sub) => (
                      <NavLink
                        key={sub.id}
                        className={({ isActive }) =>
                          clsx(
                            'flex items-center gap-2 px-4 py-3 hover:bg-main-600 hover:border-r-4 border-orange-700',
                            isActive && 'bg-main-700 border-r-4'
                          )
                        }
                        to={sub.path}
                      >
                        <span>{sub.name}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            )}
            <Link
              className={clsx(
                'flex items-center gap-2 px-4 py-3 hover:bg-main-700 hover:border-r-4 border-orange-700'
              )}
              to="/"
            >
              <span className="text-2xl">
                <ImForward />
              </span>
              <span>Go homepage</span>
            </Link>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default UserSidebar
