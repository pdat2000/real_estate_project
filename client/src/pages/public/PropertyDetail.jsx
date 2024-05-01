import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Breadcrumb } from '~/components'
import { apiGetDetailProperty } from '~/apis/properties'

const PropertyDetail = () => {
  const { id } = useParams()
  const [propertyDetail, setPropertyDetail] = useState()
  useEffect(() => {
    const fetchDetailProperty = async (id) => {
      const response = await apiGetDetailProperty(id)
      if (response.success) {
        setPropertyDetail(response.data)
      }
    }
    fetchDetailProperty(id)
  }, [id])

  return (
    <div className="w-full">
      <div className="relative w-full">
        <img
          src="/propertice.png"
          alt="propertice"
          className="w-full object-contain"
        />
        <div className="absolute inset-0 text-white flex items-center justify-center flex-col">
          <h1 className="text-[48px] font-medium">Propertice</h1>
          <div>
            <Breadcrumb />
          </div>
        </div>
      </div>{' '}
    </div>
  )
}

export default PropertyDetail
