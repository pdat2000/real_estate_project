import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import useBreadcrumbs from 'use-react-router-breadcrumbs'

const DynamicBreadcrumb = ({ match }) => {
  return <span>{match.params.id}</span>
}
const breadcrumbRoutes = [
  { path: '/', breadcrumb: 'Home' },
  { path: '/properties', breadcrumb: 'Properties' },
  { path: '/properties/:id', breadcrumb: DynamicBreadcrumb },
]

const Breadcrumb = () => {
  const breadcrumbs = useBreadcrumbs(breadcrumbRoutes)

  return (
    <div className="flex items-center justify-center">
      {breadcrumbs.map(({ match, breadcrumb }, idx) => (
        <NavLink
          className="flex items-center"
          key={match.pathname}
          to={match.pathname}
        >
          <span
            className={twMerge(
              clsx(
                'hover:underline',
                Object.keys(match.params).length > 0 && 'line-clamp-1'
              )
            )}
          >
            {breadcrumb}
          </span>
          {idx < breadcrumbs.length - 1 && '/'}
        </NavLink>
      ))}
    </div>
  )
}

export default Breadcrumb
