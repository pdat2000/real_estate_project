import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Breadcrumb, Images, BoxInfo, Map } from '~/components'
import { apiGetDetailProperty } from '~/apis/properties'
import { CiLocationOn } from 'react-icons/ci'
import DOMPurify from 'dompurify'
import { formatMoney } from '~/utils/fn'
import moment from 'moment'

const InfoCel = ({ title, value, unit = '' }) => {
  return (
    <tr>
      <td className="border p-3 text-center bg-main-300">{title}</td>
      <td className="border p-3 text-center bg-main-300">{value}</td>
      <td
        className="border p-3 text-center bg-main-300"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(unit),
        }}
      ></td>
    </tr>
  )
}

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
      </div>
      <div className="w-main mx-auto my-8">
        {propertyDetail?.images && <Images images={propertyDetail.images} />}
        <div className="grid my-8 grid-cols-10 gap-4">
          <div className="col-span-7">
            <h1 className="font-bold text-2xl line-clamp-2">
              {propertyDetail?.name}
            </h1>
            <span className="flex items-center gap-3">
              <CiLocationOn size={18} />
              <span>{propertyDetail?.address}</span>
            </span>
            <div
              className="my-4"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(propertyDetail?.description),
              }}
            ></div>
            <div>
              <h3 className="font-bold text-lg">Property 's Information</h3>
              <table>
                <thead>
                  <th className="border p-3 text-center bg-main-300">
                    Characteristics
                  </th>
                  <th className="border p-3 text-center bg-main-300">Values</th>
                  <th className="border p-3 text-center bg-main-300">Unit</th>
                </thead>
                <tbody>
                  <InfoCel
                    title="Price"
                    value={formatMoney(propertyDetail?.price)}
                    unit="USD"
                  />

                  <InfoCel
                    title="Size"
                    value={propertyDetail?.propertySize}
                    unit="<span>m<sup>3</sup></span>"
                  />

                  <InfoCel
                    title="Property Type"
                    value={propertyDetail?.rPropertyType?.name}
                  />
                  <InfoCel
                    title="Built Year"
                    value={moment(propertyDetail?.createdAt).format(
                      'dd/MM/yyyy'
                    )}
                  />
                </tbody>
              </table>
            </div>
            <div className="my-4">
              <Map address={propertyDetail?.address} />
            </div>
          </div>
          <div className="col-span-3 gap-3 flex flex-col">
            <BoxInfo data={propertyDetail?.rPostedBy} />
            <BoxInfo data={propertyDetail?.rPostedBy} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail
