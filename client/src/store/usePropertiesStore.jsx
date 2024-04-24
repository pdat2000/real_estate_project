import { apiGetPropertyType } from '~/apis/propertyType'
import { create } from 'zustand'

export const usePropertiesStore = create((set) => ({
  propertyTypes: [],
  getPropertyTypes: async (params) => {
    const response = await apiGetPropertyType(params)
    if (response.success)
      return set(() => ({ propertyTypes: response.propertyType }))
    else return set(() => ({ propertyTypes: [] }))
  },
}))
