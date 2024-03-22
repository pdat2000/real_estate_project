import { Link, NavLink } from "react-router-dom"
import { Button } from ".."
import { navigations } from "~/utils/constants"
import clsx from "clsx"
import withRouter from "~/hocs/withRouter"
import { twMerge } from "tailwind-merge"

const Navigation = ({ location }) => {
  return (
    <div
      className={twMerge(
        clsx(
          "bg-transparent fixed z-50 top-[85px] w-full px-[100px] py-[26px] flex justify-between items-center",
          location.pathname !== "/" && "bg-white"
        )
      )}
    >
      <Link to="/">
        <img src="logo1.png" alt="logo" className="w-[180px] object-contain" />
      </Link>
      <div
        className={clsx(
          "flex  items-center gap-6",
          location.pathname === "/" ? "text-gray-100" : "text-gray-700"
        )}
      >
        {navigations.map((el) => (
          <NavLink
            key={el.id}
            to={el.path}
            className={({ isActive }) =>
              clsx(
                isActive && "text-white font-medium",
                location.pathname === "/" ? "text-white" : "text-gray-900"
              )
            }
          >
            {el.text}
          </NavLink>
        ))}
        <Button
          className={twMerge(
            clsx(
              location.pathname === "/" &&
                "bg-transparent border-main-100 border"
            )
          )}
        >
          Add Listing
        </Button>
      </div>
    </div>
  )
}

export default withRouter(Navigation)
