import { useForm } from 'react-hook-form'
import { Button, InputForm, InputSelect } from '..'
import SearchItem from './SearchItem'

const Search = () => {
  const {
    register,
    formState: { errors },
  } = useForm()

  return (
    <div className="py-8 grid grid-cols-4 bg-white rounded-md shadow-md w-[1096px] mx-auto h-[8em] -mt-[4em] relative z-20">
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
        <InputSelect
          id="propertyType"
          register={register}
          errors={errors}
          containerClassname="w-[14em]"
          placeholder="Select property type"
        />
      </SearchItem>
      <SearchItem title="Rent Range">
        <InputSelect
          id="propertyType"
          register={register}
          errors={errors}
          containerClassname="w-[14em]"
          placeholder="Select rent range"
        />
      </SearchItem>
      <div className="flex items-center justify-center">
        <Button className='px-8'>Search</Button>
      </div>
    </div>
  )
}

export default Search
