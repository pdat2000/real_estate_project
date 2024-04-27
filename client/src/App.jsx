import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Modal from '~/components/commons/Modal'
import { useAppStore } from '~/store/useAppStore'
import { ToastContainer } from 'react-toastify'
import { useUserStore } from '~/store/useUserStore'
import { usePropertiesStore } from '~/store/usePropertiesStore'

function App() {
  const { isShowModal } = useAppStore()
  const { getCurrent, token, getRoles } = useUserStore()
  const { getPropertyTypes } = usePropertiesStore()
  useEffect(() => {
    getCurrent()
    getRoles()
    getPropertyTypes({ fields: 'id,name,images' })
  }, [getCurrent, getPropertyTypes, getRoles, token])

  return (
    <div>
      {isShowModal && <Modal />}
      <Outlet />
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
