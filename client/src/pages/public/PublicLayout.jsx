import clsx from "clsx"
import { Outlet } from "react-router-dom"
import withRouter from "~/hocs/withRouter"
import { Navigation, Topheader } from "~/components"

const PublicLayout = ({ location }) => {
  return (
    <main>
      <Topheader />
      <Navigation />
      <div className={clsx(location.pathname === "/" ? "pt-0" : "pt-[232px]")}>
        <Outlet />
      </div>
    </main>
  )
}

export default withRouter(PublicLayout)
