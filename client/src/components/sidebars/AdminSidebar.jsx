import clsx from 'clsx'
import { Fragment, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { adminSibar } from '~/utils/constants'
import { AiOutlineCaretRight } from 'react-icons/ai'
import { AiFillCaretDown } from 'react-icons/ai'
import { ImForward } from 'react-icons/im'

const AdminSidebar = () => {
  const [activeTabs, setActiveTabs] = useState([])
  const handleActivateTabs = (tabId) => {
    if (activeTabs.some((el) => el === tabId))
      setActiveTabs((prev) => prev.filter((el) => el !== tabId))
    else setActiveTabs((prev) => [...prev, tabId])
  }

  return (
    <div className="h-screen w-full">
      <div className="w-full flex justify-center items-center flex-col p-4">
        <img src="/logo1.png" alt="logo" className="w-4/5 object-contain" />
        <small className="text-gray-100 italic">Admin workspace</small>
      </div>
      <div className="mt-6">
        {adminSibar.map((el) => (
          <Fragment key={el.id}>
            {el.type === 'SINGLE' && (
              <NavLink
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-2 px-4 py-3 hover:bg-main-700 hover:border-r-4 border-orange-700',
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
                  className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-main-700"
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
                            'flex items-center gap-2 px-4 py-3 hover:bg-main-700 hover:border-r-4 border-orange-700',
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

export default AdminSidebar
