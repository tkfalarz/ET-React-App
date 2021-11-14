import '../styles/Map.css'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = () => (
<MapContainer id="map" center={[52.262222, 19.067471]} zoom={7} scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[50.1047421, 20.0143362]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
);

export default Map;
