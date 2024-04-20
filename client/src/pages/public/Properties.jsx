import { useEffect, useState } from 'react'
import { apiGetProperties } from '~/apis/properties'
import { Breadcrumb, PropertyCard } from '~/components'

const Properties = () => {
  const [properties, setProperties] = useState()
  useEffect(() => {
    const fetchProperties = async () => {
      const response = await apiGetProperties({
        limit: 9,
      })
      if (!response.success) setProperties(response.properties)
    }
    fetchProperties()
  }, [])

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
      </div>
      <div className="w-main mx-auto my-20">
        <div>sort by</div>
        <div className="w-full grid grid-cols-3 gap-4">
          {properties?.rows?.map((el) => (
            <PropertyCard key={el.id} properties={el} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Properties
