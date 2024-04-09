import { Title, Button, InputForm, Textarea, InputFile } from '~/components'
import { AiFillPlusCircle } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import { apiCreateNewPropertyType } from '~/apis/propertyType'
import { toast } from 'react-toastify'
import { useCallback, useState } from 'react'

const CreatePropertyType = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,
  } = useForm()
  const [resetImage, setResetImage] = useState(false)

  const handlePropertyType = async (data) => {
    if (!data.images || data.images.length === 0) {
      setError('images', {
        message: 'This filed cannot empty',
        type: 'required',
      })
    } else {
      const { images, ...payload } = data
      const response = await apiCreateNewPropertyType({
        images: images[0],
        ...payload,
      })
      if (response.success) {
        toast.success(response.mes)
        setResetImage((prev) => !prev)
        reset()
      } else toast.error(response.mes)
    }
  }
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
    <div>
      <Title title="Create new property type">
        <Button handleOnClick={handleSubmit(handlePropertyType)}>
          <AiFillPlusCircle size={20} />
          <span>Create</span>
        </Button>
      </Title>
      <form className="p-4 flex flex-col gap-4">
        <InputForm
          id="name"
          register={register}
          errors={errors}
          validate={{ required: 'This field cannot empty' }}
          label="Property type name: "
        />
        <Textarea
          id="description"
          register={register}
          errors={errors}
          label="Description"
          validate={{ required: 'This field cannot empty' }}
        />
        <InputFile
          id="images"
          setValue={setValue}
          label="Image"
          validate={{ required: 'This field cannot empty' }}
          getImages={getImages}
          errors={errors}
          resetImage={resetImage}
        />
      </form>
    </div>
  )
}

export default CreatePropertyType
