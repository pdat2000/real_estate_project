import { useForm } from 'react-hook-form'
import { Button, InputForm } from '..'
import SearchItem from './SearchItem'
import SelectLib from '../inputs/SelectLib'
import { usePropertiesStore } from '~/store/usePropertiesStore'
import { AiOutlineDown } from 'react-icons/ai'
import { useState } from 'react'
import withRouter from '~/hocs/withRouter'
import path from '~/utils/path'
import { createSearchParams } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'
import { useAppStore } from '~/store/useAppStore'

const Search = ({ navigate, direction = 'horizontal' }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm()
  const { propertyTypes } = usePropertiesStore()
  const [isShowPopupPrice, setIsShowPopupPrice] = useState(false)
  const { setModal } = useAppStore()

  const handleSearchParams = (data) => {
    const { address, propertyType, start, end } = data
    const params = new Object()

    if (address) params.address = data.address
    if (propertyType) params.propertyTypeId = data.propertyType.id
    if (start && !end) params.price = [+start, 'gte']
    if (!start && end) params.price = ['lte', +end]
    if (start && end) params.price = [+start, +end]
    if (direction === 'vertical') setModal(false, null)
    navigate({
      pathname: `/${path.PROPERTIES}`,
      search: createSearchParams(params).toString(),
    })
  }

  return (
    <form
      className={twMerge(
        clsx(
          'py-8  bg-white rounded-md shadow-md  mx-auto  -mt-[4em] relative z-20',
          direction === 'vertical' &&
            'flex flex-col h-fit w-[500px] gap-4 px-8',
          direction === 'horizontal' && 'grid grid-cols-4 h-[8em] w-[1096px]'
        )
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <SearchItem
        className={
          direction === 'vertical' && 'items-start justify-start border-none'
        }
        title="Locations"
      >
        <InputForm
          id="address"
          register={register}
          errors={errors}
          placeholder="Type your required location"
          containerClassname={direction === 'vertical' ? 'w-full' : 'w-[14em]'}
          inputClassname="rounded-md border border-gray-300"
        />
      </SearchItem>
      <SearchItem
        className={
          direction === 'vertical' && 'items-start justify-start border-none'
        }
        title="Property Type"
      >
        <SelectLib
          id="propertyType"
          register={register}
          errors={errors}
          containerClassname={direction === 'vertical' ? 'w-full' : 'w-[14em]'}
          placeholder="Select property type"
          options={propertyTypes?.map((el) => ({ ...el, label: el.name }))}
          onChange={(val) => setValue('propertyType', val)}
        />
      </SearchItem>
      <SearchItem
        className={
          direction === 'vertical' && 'items-start justify-start border-none'
        }
        title="Rent Range"
      >
        {isShowPopupPrice && (
          <div className="absolute top-full right-0 left-0 bg-white drop-shadow rounded-md border max-w-[14em] mx-auto flex flex-col gap-6 p-4">
            <div className="flex flex-col gap-2">
              <span className="font-bold">Type your price</span>
              <div className="grid grid-cols-2 gap-3">
                <InputForm id="start" register={register} errors={errors} />
                <InputForm id="end" register={register} errors={errors} />
              </div>
            </div>
          </div>
        )}
        <Button
          className={twMerge(
            clsx(
              'bg-white  h-[38px] text-black border border-gray-300',
              direction === 'vertical' ? 'w-full hidden ' : 'w-[14em]'
            )
          )}
          handleOnClick={() => setIsShowPopupPrice((prev) => !prev)}
        >
          <span>Select range price</span>
          <AiOutlineDown />
        </Button>
        {direction === 'vertical' && (
          <div className="grid grid-cols-2 gap-3 w-full">
            <InputForm
              id="start"
              register={register}
              errors={errors}
              placeholder="Type price start"
            />
            <InputForm
              id="end"
              register={register}
              errors={errors}
              placeholder="Type price end"
            />
          </div>
        )}
      </SearchItem>
      <div className="flex items-center justify-center">
        <Button
          className="px-8"
          handleOnClick={handleSubmit(handleSearchParams)}
        >
          Search
        </Button>
      </div>
    </form>
  )
}

export default withRouter(Search)
