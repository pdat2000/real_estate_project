import App from '~/App'
import path from './path'
import {
  AboutUs,
  Home,
  OurAgents,
  Properties,
  PublicLayout,
  PropertyDetail,
} from '~/pages/public'
import {
  CreatePropertyType,
  ManagePropertyType,
  Dashboard,
  AdminLayout,
} from '~/pages/admin'
import { UserLayout, Personal } from '~/pages/user'

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: path.PUBLIC_LAYOUT,
        element: <PublicLayout />,
        children: [
          {
            path: path.HOME,
            element: <Home />,
          },
          {
            path: path.ABOUT_US,
            element: <AboutUs />,
          },
          {
            path: path.OUR_AGENTS,
            element: <OurAgents />,
          },
          {
            path: path.PROPERTIES,
            element: <Properties />,
          },
          {
            path: path.PROPERTY_DETAIL_ID,
            element: <PropertyDetail />,
          },
        ],
      },
      {
        path: path.ADMIN_LAYOUT,
        element: <AdminLayout />,
        children: [
          {
            path: path.ADMIN_DASHBOARD,
            element: <Dashboard />,
          },
          {
            path: path.CREATE_PROPERTY_TYPE,
            element: <CreatePropertyType />,
          },
          {
            path: path.MANAGE_PROPERTY_TYPE,
            element: <ManagePropertyType />,
          },
        ],
      },
      {
        path: path.USER_LAYOUT,
        element: <UserLayout />,
        children: [
          {
            path: path.PERSONAL,
            element: <Personal />,
          },
        ],
      },
    ],
  },
]

export default routes
