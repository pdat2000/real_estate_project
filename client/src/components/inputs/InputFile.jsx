import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { FiUpload } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { apiUploadImage } from '~/apis/beyond'
import { FaSpinner } from 'react-icons/fa6'
import { AiOutlineClose } from 'react-icons/ai'

const InputFile = ({
  containerClassname,
  label,
  id,
  validate,
  multiple = true,
  getImages,
}) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm()

  const rawImages = watch(id)
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const handleUpload = async (files) => {
    const formData = new FormData()
    const imageLink = []
    setIsLoading(false)
    for (let file of files) {
      formData.append('file', file)
      formData.append(
        'upload_preset',
        import.meta.env.VITE_CLOUDYNARY_UPLOAD_PRESETS
      )
      const response = await apiUploadImage(formData)
      if (response.status === 200)
        imageLink.push({
          id: response.data.public_id,
          path: response.data.secure_url,
        })
    }
    setIsLoading(true)
    setImages(imageLink)
    setIsLoading(false)
  }
  useEffect(() => {
    if (rawImages && rawImages instanceof FileList && rawImages.length > 0) {
      handleUpload(rawImages)
    }
  }, [rawImages])

  useEffect(() => {
    if (images && images.length > 0) getImages(images)
  }, [getImages, images])

  return (
    <div
      className={twMerge(
        clsx('flex flex-col gap-2 w-full', containerClassname)
      )}
    >
      {label && (
        <span className="font-medium text-main-700" htmlFor={id}>
          {label}
        </span>
      )}
      <input
        type="file"
        className="hidden"
        id={id}
        {...register(id, validate)}
        multiple={multiple}
      />
      <label
        className="bg-gray-100 w-full p-6 flex items-center justify-center flex-col gap-2"
        htmlFor={id}
      >
        {isLoading ? (
          <span className="animate-spin text-main-600">
            <FaSpinner />
          </span>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-4 gap-4 ">
            {images?.map((el, index) => (
              <div key={index} className="col-span-1 relative">
                <span
                  onClick={(e) => {
                    e.preventDefault()
                    setImages((prev) =>
                      prev.filter((item) => item.id !== el.id)
                    )
                  }}
                  className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer absolute top-1 right-1"
                >
                  <AiOutlineClose />
                </span>
                <img
                  src={el.path}
                  alt={el.index}
                  className="w-full object-contain"
                />
              </div>
            ))}
          </div>
        ) : (
          <span className="text-3xl text-gray-300">
            <FiUpload />
          </span>
        )}
        <small className="text-gray-300 italic">
          Only support image with extension JPEG, PNG, JPG.
        </small>
      </label>
      {errors[id] && (
        <small className="text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  )
}

export default InputFile
