import { memo } from 'react'
import { Button, ImageDetail } from '..'
import { useAppStore } from '~/store/useAppStore'

const Images = ({ images }) => {
  const { setModal } = useAppStore()

  return (
    <div className="w-full grid grid-cols-4 grid-rows-2 gap-2 relative">
      <img
        src={images[0]}
        alt="picture-1"
        className="w-full h-full col-span-2 row-span-2 rounded-tl-md object-cover"
      />
      <img
        src={images[1]}
        alt="picture-1"
        className="w-full h-full col-span-1 row-span-1 object-cover"
      />
      <img
        src={images[2]}
        alt="picture-1"
        className="w-full h-full col-span-1 row-span-1 rounded-tr-md object-cover"
      />
      <img
        src={images[3]}
        alt="picture-1"
        className="w-full h-full col-span-1 row-span-1  object-cover"
      />
      <img
        src={images[4]}
        alt="picture-1"
        className="w-full h-full col-span-1 row-span-1 rounded-br-md object-cover"
      />
      <div className="absolute bottom-4 right-4">
        <Button
          className="bg-white border border-main-600 text-main-600 font-bold"
          handleOnClick={() => setModal(true, <ImageDetail images={images} />)}
        >
          <span>Hiển thị tất cả ảnh</span>
        </Button>
      </div>
    </div>
  )
}

export default memo(Images)
