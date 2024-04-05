import { Title, Button, InputForm, Textarea, InputFile } from '~/components'
import { AiFillPlusCircle } from 'react-icons/ai'
import { useForm } from 'react-hook-form'

const CreatePropertyType = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm()
  const handlePropertyType = (data) => {
    console.log('data', data)
  }

  return (
    <div className="">
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
            setValue={setValue}
            label="Description"
            validate={{ required: 'This field cannot empty' }}
          />
          <InputFile
            id="image"
            register={register}
            errors={errors}
            setValue={setValue}
            label="Image"
            validate={{ required: 'This field cannot empty' }}
          />
        </form>
      </div>
    </div>
  )
}

export default CreatePropertyType
