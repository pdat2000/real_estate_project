import { create } from "zustand"

export const useAppStore = create((set) => ({
  contentModal: null,
  isShowModal: false,
  setModal: (isShowModal, contentModal) => set({ isShowModal, contentModal }),
}))
