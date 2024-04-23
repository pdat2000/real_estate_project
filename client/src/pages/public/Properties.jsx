import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { twMerge } from 'tailwind-merge'
import { apiGetProperties } from '~/apis/properties'
import {
  Breadcrumb,
  PropertyCard,
  InputSelect,
  Button,
  Pagination,
} from '~/components'

const Properties = () => {
  const {
    register,
    formState: { errors },
    // watch,
  } = useForm()
  // const sort = watch('sort')
  const [properties, setProperties] = useState({})
  const [mode, setMode] = useState('ALL')
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const params = Object.fromEntries([...searchParams])
    const fetchProperties = async (params) => {
      const response = await apiGetProperties({
        limit: 9,
        ...params,
      })
      if (response.success) setProperties(response.properties)
      else toast.error(response.mes)
    }
    fetchProperties(params)
  }, [searchParams])

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
        <div className="flex items-center justify-between">
          <div className="my-4">
            <InputSelect
              id="sort"
              register={register}
              errors={errors}
              containerClassname="flex gap-2 flex-row justify-center items-center"
              label="Sort"
              placeholder="Select"
              options={[
                {
                  label: 'Lastest',
                  code: '-createdAt',
                },
                {
                  label: 'Oldest',
                  code: 'createdAt',
                },
                {
                  label: 'A - Z',
                  code: 'name',
                },
                {
                  label: 'Z - A',
                  code: '-name',
                },
              ]}
            />
          </div>
          <div className="flex items-center gap-4">
            <Button
              className={twMerge(
                clsx(
                  'whitespace-nowrap bg-transparent border-none text-black font-medium',
                  mode === 'ALL' && 'font-bold'
                )
              )}
              handleOnClick={() => setMode('ALL')}
            >
              All properties
            </Button>
            <Button
              className={twMerge(
                clsx(
                  'whitespace-nowrap bg-transparent border-none text-black font-medium',
                  mode === 'RENT' && 'font-bold'
                )
              )}
              handleOnClick={() => setMode('RENT')}
            >
              For Rent
            </Button>
            <Button
              className={twMerge(
                clsx(
                  'whitespace-nowrap bg-transparent border-none text-black font-medium',
                  mode === 'SALE' && 'font-bold'
                )
              )}
              handleOnClick={() => setMode('SALE')}
            >
              For Sale
            </Button>
          </div>
        </div>
        <div className="w-full grid grid-cols-3 gap-4">
          {properties?.rows?.map((el) => (
            <PropertyCard key={el.id} properties={el} />
          ))}
        </div>
        <div className="flex items-center justify-center my-4">
          <Pagination
            total={properties?.count}
            limit={properties?.limit}
            page={properties?.page}
          />
        </div>
      </div>
    </div>
  )
}

export default Properties
