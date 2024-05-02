import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { apiGetLongtitudeAndLatitudeFromAddress } from '~/apis/beyond'

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

const Map = ({ address = '', zoom = 12 }) => {
  const [center, setCenter] = useState([])
  useEffect(() => {
    const fetchCenter = async () => {
      if (address) {
        const response = await apiGetLongtitudeAndLatitudeFromAddress(address)
        if (response.status === 200 && response.data.features?.length > 0) {
          setCenter([
            response.data.features[0]?.geometry?.coordinates[1],
            response.data.features[0]?.geometry?.coordinates[0],
          ])
        } else {
          window.navigator.geolocation.getCurrentPosition((position) => {
            setCenter([position.coords.latitude, position.coords.longitude])
          })
        }
      }
    }
    fetchCenter()
  }, [address])

  return (
    <div className="w-full h-[300px]">
      {center && center.length > 0 && (
        <MapContainer center={center} zoom={zoom} className="w-full h-full">
          <TileLayer attribution={attribution} url={url} />
          <Marker position={center}>
            <Popup>{address}</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  )
}

export default Map
