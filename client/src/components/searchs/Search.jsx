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

const Search = ({ navigate }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm()
  const { propertyTypes } = usePropertiesStore()
  const [isShowPopupPrice, setIsShowPopupPrice] = useState(false)

  const handleSearchParams = (data) => {
    const { address, propertyType, start, end } = data
    const params = new Object()

    if (address) params.address = data.address
    if (propertyType) params.propertyTypeId = data.propertyType.id
    if (start && !end) params.price = [+start, Math.pow(10, 9)]
    if (!start && end) params.price = [0, +end]
    if (start && end) params.price = [+start, +end]
    navigate({
      pathname: `/${path.PROPERTIES}`,
      search: createSearchParams(params).toString(),
    })
  }

  return (
    <form className="py-8 grid grid-cols-4 bg-white rounded-md shadow-md w-[1096px] mx-auto h-[8em] -mt-[4em] relative z-20">
      <SearchItem title="Locations">
        <InputForm
          id="address"
          register={register}
          errors={errors}
          placeholder="Type your required location"
          containerClassname="w-[14em]"
          inputClassname="rounded-md border border-gray-300"
        />
      </SearchItem>
      <SearchItem title="Property Type">
        <SelectLib
          id="propertyType"
          register={register}
          errors={errors}
          containerClassname="w-[14em]"
          placeholder="Select property type"
          options={propertyTypes?.map((el) => ({ ...el, label: el.name }))}
          onChange={(val) => setValue('propertyType', val)}
        />
      </SearchItem>
      <SearchItem title="Rent Range">
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
          className="bg-white w-[14em] h-[38px] text-black border border-gray-300"
          handleOnClick={() => setIsShowPopupPrice((prev) => !prev)}
        >
          <span>Select range price</span>
          <AiOutlineDown />
        </Button>
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
