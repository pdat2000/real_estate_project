import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export const useUserStore = create(
  persist(
    (set, get) => ({
      token: null,
      current: null,
    }),
    {
      name: "rest06",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        Object.fromEntries(
          Object.entries(
            state.filters((el) => el[0] === "token" || el[1] === "current")
          )
        )
      },
    }
  )
)
