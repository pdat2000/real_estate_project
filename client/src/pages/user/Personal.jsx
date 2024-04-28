import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useUserStore } from '~/store/useUserStore'
import { InputForm, InputFile } from '~/components'

const Personal = () => {
  const { current } = useUserStore()
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    setValue,
    reset,
  } = useForm()
  const [resetImage, setResetImage] = useState(false)
  useEffect(() => {
    if (current)
      reset({
        name: current.name,
        phone: current.phone,
        email: current.email,
        address: current.address,
      })
  }, [current, reset])

  const getImages = useCallback(
    (images) => {
      if (images && images.length > 0) clearErrors('images')
      setValue(
        'images',
        images?.map((el) => el.path)
      )
      if (images && images.length === 0) setResetImage(false)
    },
    [clearErrors, setValue]
  )

  return (
    <div className="h-full">
      <div className="h-14 flex justify-between items-center border-b px-6">
        <h1 className="text-3xl font-bold text-main-700">
          Personal information
        </h1>
      </div>
      <form className="max-w-[600px] mx-auto my-6 space-y-4">
        <InputForm
          id="name"
          register={register}
          errors={errors}
          validate={{ required: 'This field cannot empty.' }}
          label="Full name"
          required
          placeholder="Required full name"
        />
        <InputForm
          id="phone"
          register={register}
          errors={errors}
          validate={{ required: 'This field cannot empty.' }}
          label="Phone number"
          required
          placeholder="Required phone"
          readOnly={!current.userRole?.some((el) => el.roleCode === 'ROL7')}
        />
        <InputForm
          id="email"
          register={register}
          errors={errors}
          validate={{ required: 'This field cannot empty.' }}
          label="Email address"
          required
          placeholder="Required email"
        />
        <InputForm
          id="address"
          register={register}
          errors={errors}
          validate={{ required: 'This field cannot empty.' }}
          label="Address "
          required
          placeholder="Required address"
        />
        <InputFile
          id="avatar"
          setValue={setValue}
          label="Avatar"
          validate={{ required: 'This field cannot empty.' }}
          getImages={getImages}
          errors={errors}
          resetImage={resetImage}
        />
      </form>
    </div>
  )
}

export default Personal
