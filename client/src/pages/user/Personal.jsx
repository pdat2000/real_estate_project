import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useUserStore } from '~/store/useUserStore'
import { InputForm, InputFile, Button } from '~/components'
import { apiUpdateProfile } from '~/apis/user'
import { toast } from 'react-toastify'

const Personal = () => {
  const { current, getCurrent } = useUserStore()
  const [isChangeAvatar, setIsChangeAvatar] = useState(false)
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
      if (images && images.length > 0) clearErrors('avatar')
      setValue(
        'avatar',
        images?.map((el) => el.path)
      )
      if (images && images.length === 0) setResetImage(false)
    },
    [clearErrors, setValue]
  )
  const onSubmit = async (data) => {
    const { avatar, ...payload } = data

    if (Array.isArray(avatar)) payload.avatar = avatar
    const response = await apiUpdateProfile(payload)
    if (response.success) {
      getCurrent()
      setIsChangeAvatar(false)
      toast.success(response.mes)
    } else toast.error(response.mes)
  }

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
          readOnly={
            current?.userRole?.length === 1 && current?.userRole[0] === 'ROL7'
          }
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
        <div className="flex flex-col gap-2">
          <span className="font-medium text-main-700">
            Avatar
            <span
              className="text-xs cursor-pointer hover:underline text-orange-600 ml-2"
              onClick={() => setIsChangeAvatar((prev) => !prev)}
            >
              {isChangeAvatar ? 'Unchange ✋' : 'Change ✎'}
            </span>
          </span>
          {isChangeAvatar ? (
            <InputFile
              id="avatar"
              setValue={setValue}
              validate={{ required: 'This field cannot empty.' }}
              getImages={getImages}
              errors={errors}
              resetImage={resetImage}
            />
          ) : (
            <img
              src={current?.avatar || '/user2.svg'}
              alt="avatar"
              className="w-28 h-28 object-cover rounded-full"
            />
          )}
        </div>
        <Button className="mx-auto" handleOnClick={handleSubmit(onSubmit)}>
          Update
        </Button>
      </form>
    </div>
  )
}

export default Personal
