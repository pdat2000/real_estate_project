import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Login, UserSidebar } from '~/components'
import { useAppStore } from '~/store/useAppStore'
import { useUserStore } from '~/store/useUserStore'
import Personal from './Personal'

const UserLayout = () => {
  const { current } = useUserStore()
  const { setModal } = useAppStore()
  const navigate = useNavigate()
  useEffect(() => {
    if (!current || !current?.userRoles.some((el) => el.roleCode === 'ROL7')) {
      Swal.fire({
        icon: 'info',
        title: 'Opps',
        text: 'Login required.',
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: 'Go Homepage',
        confirmButtonText: 'Go login',
      }).then((response) => {
        if (response.isConfirmed) setModal(true, <Login />)
        if (response.isDismissed) navigate('/')
      })
    }
  }, [current, navigate, setModal])

  return (
    <>
      {current?.userRoles?.some((el) => el.roleCode === 'ROL7') && (
        <div className="w-full grid grid-cols-12 min-h-screen max-h-screen overflow-y-auto">
          <div className="col-span-2">
            <UserSidebar />
          </div>
          <div className="col-span-10">
            <Personal />
          </div>
        </div>
      )}
    </>
  )
}

export default UserLayout
