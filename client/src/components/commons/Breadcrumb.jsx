import { NavLink } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'

const breadcrumbRoutes = [
  { path: '/', breadcrumb: 'Home' },
  { path: '/properties', breadcrumb: 'Properties' },
]

const Breadcrumb = () => {
  const breadcrumbs = useBreadcrumbs(breadcrumbRoutes)

  return (
    <>
      {breadcrumbs.map(({ match, breadcrumb }, idx) => (
        <NavLink key={match.pathname} to={match.pathname}>
          <span className="hover:underline">{breadcrumb}</span>
          {idx < breadcrumbs.length - 1 && '/'}
        </NavLink>
      ))}
    </>
  )
}

export default Breadcrumb
