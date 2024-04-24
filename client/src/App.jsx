import { Route, Routes } from 'react-router-dom'
import path from './utils/path'
import {
  AboutUs,
  Home,
  OurAgents,
  Properties,
  PublicLayout,
  Search,
} from './pages/public'
import Modal from '~/components/commons/Modal'
import { useAppStore } from '~/store/useAppStore'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { useUserStore } from '~/store/useUserStore'
import { useEffect } from 'react'
import {
  CreatePropertyType,
  ManagePropertyType,
  Dashboard,
  AdminLayout,
} from '~/pages/admin'
import { UserLayout, Personal } from '~/pages/user'
import { usePropertiesStore } from './store/usePropertiesStore'

function App() {
  const { isShowModal } = useAppStore()
  const { getCurrent, token, getRoles } = useUserStore()
  const { getPropertyTypes } = usePropertiesStore()
  useEffect(() => {
    getCurrent()
    getRoles()
    getPropertyTypes({ fields: 'id,name' })
  }, [token])

  return (
    <div>
      {isShowModal && <Modal />}
      <Routes>
        <Route path={path.PUBLIC_LAYOUT} element={<PublicLayout />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.ABOUT_US} element={<AboutUs />} />
          <Route path={path.OUR_AGENTS} element={<OurAgents />} />
          <Route path={path.PROPERTIES} element={<Properties />} />
          <Route path={path.SEARCH} element={<Search />} />
        </Route>

        {/* admin routes*/}
        <Route path={path.ADMIN_LAYOUT} element={<AdminLayout />}>
          <Route path={path.ADMIN_DASHBOARD} element={<Dashboard />} />
          <Route
            path={path.CREATE_PROPERTY_TYPE}
            element={<CreatePropertyType />}
          />
          <Route
            path={path.MANAGE_PROPERTY_TYPE}
            element={<ManagePropertyType />}
          />
        </Route>

        {/* user routes*/}
        <Route path={path.USER_LAYOUT} element={<UserLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}

export default App
