import { formatMoney } from '~/utils/fn'
import { TfiMoney } from 'react-icons/tfi'
import { BiBed } from 'react-icons/bi'
import { FaBath, FaShareAlt } from 'react-icons/fa'
import { AiOutlineHeart } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const PropertyCard = ({ properties }) => {
  return (
    <div className="border">
      <img
        src={properties?.featuredImage}
        alt={properties?.id}
        className="w-full h-[240px] rounded-t-md object-cover"
      />
      <div className="p-4 flex flex-col gap-2">
        <Link
          to={`${properties.id}`}
          state={{ name: properties.name }}
          className="text-2xl font-medium line-clamp-2 text-gray-700 hover:underline"
        >
          {properties?.name}
        </Link>
        <span className="text-lg font-bold text-main-500 flex gap-1 items-center">
          <TfiMoney size={18} />
          {`${formatMoney(properties?.price)}`}
        </span>
        <div className="flex items-center gap-3 text-sm">
          <span className="flex items-center text-gray-500 gap-1">
            <BiBed size={20} />
            <span className="font-bold text-lg">{properties?.bedRoom}</span>
          </span>
          <span className="flex items-center text-gray-500 gap-1">
            <FaBath size={20} />
            <span className="font-bold text-lg">{properties?.bathRoom}</span>
          </span>
          <span className="flex items-center text-gray-500 gap-1">
            <FaShareAlt size={20} />
            <span className="font-bold text-lg">
              {properties?.propertySize}m2
            </span>
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <img
                src={properties?.rPostedBy?.avatar}
                alt={properties?.rPostedBy?.name}
                className="w-10 h-10 object-cover rounded-full"
              />
              <span className="text-gray-500">
                {properties?.rPostedBy?.name}
              </span>
            </div>
            <span className="px-4 py-2 text-xs flex items-center justify-center bg-green-600 text-white">
              Agent
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md">
              <FaShareAlt />
            </span>
            <span className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md">
              <AiOutlineHeart />
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <img
                src={properties?.rOwner?.avatar}
                alt={properties?.rOwner?.name}
                className="w-10 h-10 object-cover rounded-full"
              />
              <span className="text-gray-500">{properties?.rOwner?.name}</span>
            </div>
            <span className="px-4 py-2 text-xs flex items-center justify-center bg-orange-500 text-white">
              Owner
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md">
              <FaShareAlt />
            </span>
            <span className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md">
              <AiOutlineHeart />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
