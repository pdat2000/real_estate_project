import { Carousel } from 'nuka-carousel'

const ImageDetail = ({ images }) => {
  return (
    <div className="bg-overlay-70 w-screen h-screen ">
      <Carousel autoplay={true} autoplayInterval={2000} wrapMode="wrap">
        {images.map((el, idx) => (
          <img
            key={el}
            src={el}
            alt={idx}
            className="max-w-[500px] object-contain mx-auto"
          />
        ))}
      </Carousel>
    </div>
  )
}

export default ImageDetail
