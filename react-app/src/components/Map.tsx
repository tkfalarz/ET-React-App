import "../styles/Map.css";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import IMapMarkerProperties from '../core/models/IMapMarkerProperties'

const Map = (props: any) => {
  const pos: IMapMarkerProperties[] = props.positions;
  const setModal = props.setModal;
  const setDeviceName = props.setDeviceName;

  return (
      <MapContainer id="map"
        style={{width: '100%', height:'100%'}}
        center={[52.262222, 19.067471]}
        zoom={7}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pos.map((p) => (
          <Marker
            eventHandlers={{ click: () => {
              setModal(!props.isModalActive);
              setDeviceName(p.DeviceName);
            } }}
            riseOnHover={true}
            position={p.LatLen}
          >
            <Tooltip key={p.LatLen.toString()}>
              <p id="city">{p.City}</p>
              <table>
                <tbody>
                  <tr><td><p>{"Device:"}</p></td><td><p>{`${p.DeviceName}`}</p></td></tr>
                  <tr><td><p>{"Sensor:"}</p></td><td>{p.SensorName}</td></tr>
                  <tr><td><p>{"Temperature:"}</p></td><td><p>{`${p.Temperature} °C`}</p></td></tr>
                  <tr><td><p>{"Humidity:"}</p></td><td><p>{`${p.Humidity} %`}</p></td></tr>
                  <tr><td><p>{"Pressure:"}</p></td><td><p>{`${p.Pressure} hPa`}</p></td></tr>
                  <tr><td><p>{"AQI:"}</p></td><td><p>{p.Aqi}</p></td></tr>
                </tbody>
              </table>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
  );
  
};

export default Map;
