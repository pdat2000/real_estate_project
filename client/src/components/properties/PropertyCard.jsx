import { formatMoney } from '~/utils/fn'
import { TfiMoney } from 'react-icons/tfi'

const PropertyCard = ({ properties }) => {
  return (
    <div className="border">
      <img
        src={properties?.featuredImage}
        alt={properties?.id}
        className="w-full h-[240px] rounded-t-md object-cover"
      />
      <div className="p-4 flex flex-col gap-2">
        <h1 className="text-2xl uppercase text-gray-700">{properties?.name}</h1>
        <span className="text-lg font-bold text-main-500 flex gap-1 items-center">
          <TfiMoney size={18} />
          {`${formatMoney(properties?.price)}`}
        </span>
      </div>
    </div>
  )
}

export default PropertyCard
