import { useAppStore } from '~/store/useAppStore'

const Modal = () => {
  const { setModal, contentModal } = useAppStore()

  return (
    <div
      onClick={() => setModal(false, null)}
      className="fixed top-0 left-0 h-full w-full z-[999] bg-overlay-50 flex items-center justify-center"
    >
      {contentModal}
    </div>
  )
}

export default Modal
