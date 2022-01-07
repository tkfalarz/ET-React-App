import "../styles/Map.css";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import IDevice from '../core/data/IDevice'
import { LatLng } from "leaflet";
import { useState } from "react";
import IReading from "../core/data/IReading";
import {Alert} from 'react-st-modal'
import ModalContent from "./ModalContent";

const Map = (props: any) => {
  const devices: IDevice[] = props.devices;
  const [label, setLabel] = useState(null);
  const [latestReadingsSet, setLatestReadingsSet] = useState<IReading>()

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
        {devices.map((p) => {
            fetch(`https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=${p.latitude}%2C${p.longitude}%2C1000&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=kS1me8qvTjyY0CPCC3Rjno6uGl1UHKz-h8qLunaYytI`)
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                throw response;
            })
            .then(data => setLabel(data.Response.View[0].Result[0].Location.Address.Label))
            .catch((e) => `Errors: ${console.log(e)}`);

            fetch(`https://et-webapi.azurewebsites.net/api/Devices/${p.deviceName}/Readings/Latest`)
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                throw response;
            })
            .then(data => setLatestReadingsSet(data))
            .catch((e) => `Errors: ${console.log(e)}`);

            return (
              <Marker
                eventHandlers={{
                  click: async () => {
                    await Alert(<ModalContent deviceName={p.deviceName}/>, p.deviceName, "Ok");
                  },
                }}
                key={p.deviceName}
                riseOnHover={true}
                position={new LatLng(p.latitude, p.longitude)}
              >
                <Tooltip key={new LatLng(p.latitude, p.longitude).toString()}>
                  <p id="city">{label}</p>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <p>{"Device:"}</p>
                        </td>
                        <td>
                          <p>{`${p.deviceName}`}</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>{"Sensor:"}</p>
                        </td>
                        <td>{p.sensorName}</td>
                      </tr>
                      <tr>
                        <td>
                          <p>{`Latest reading from: ${latestReadingsSet?.timestamp}`}</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>{"Humidity:"}</p>
                        </td>
                        <td>{`${latestReadingsSet?.humidity} %`}</td>
                      </tr>
                      <tr>
                        <td>
                          <p>{"Pressure:"}</p>
                        </td>
                        <td>{`${latestReadingsSet?.pressure} hPa`}</td>
                      </tr>
                      <tr>
                        <td>
                          <p>{"Temperature:"}</p>
                        </td>
                        <td>{`${latestReadingsSet?.temperature} °C`}</td>
                      </tr>
                    </tbody>
                  </table>
                </Tooltip>
              </Marker>
            );
        })}
      </MapContainer>
  );
  
};

export default Map;
