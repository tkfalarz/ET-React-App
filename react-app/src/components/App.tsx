import Header from "./Header";
import Footer from './Footer';
import Map from './Map'
import IMapMarkerProperties from '../core/models/IMapMarkerProperties'
import { LatLng } from "leaflet";
import { useState } from "react";
import DeviceReadingsModal from "./DeviceReadingsModal";

const App = () => {
  const currentCoords: LatLng = new LatLng(22,22)
  const [isModalActive, setModal] = useState(false)
  const [deviceName, setDeviceName] = useState("")
  
  const conditionalRenderDeviceReadingsModal = () => {
    if (isModalActive){
      return (
        <DeviceReadingsModal setModal={setModal} deviceName={deviceName}/>
      );
    }

  };

  const positions: IMapMarkerProperties[] = [
    {DeviceName: "Raspberry_Tomek #1", SensorName:"Bme680 #1", LatLen: new LatLng(23,22), City: 'Cracow', Aqi: 2, Humidity: 2, Pressure: 2, Temperature: 2},
    {DeviceName: "Raspberry_Tomek #2", SensorName:"Bme680 #2", LatLen: new LatLng(50,20), City: 'LA', Aqi: 2, Humidity: 2, Pressure: 2, Temperature: 2},
    {DeviceName: "Raspberry_Tomek #3", SensorName:"Bme680 #3", LatLen: new LatLng(51,21), City: 'Warsaw', Aqi: 2, Humidity: 2, Pressure: 2, Temperature: 2},
    {DeviceName: "Raspberry_Tomek #4", SensorName:"Bme680 #4", LatLen: new LatLng(52,19), City: 'Rio', Aqi: 2, Humidity: 2, Pressure: 2, Temperature: 2},
    {DeviceName: "Raspberry_Tomek #5", SensorName:"Bme680 #5", LatLen: new LatLng(53,22), City: 'Moscow', Aqi: 2, Humidity: 2, Pressure: 2, Temperature: 2}
  ]
  positions.push()
  
  return (
    <div>
      <Header userLocationCoords={currentCoords} />
      {conditionalRenderDeviceReadingsModal()}
      <Map
        positions={positions}
        setModal={setModal}
        isModalActive={isModalActive}
        setDeviceName={setDeviceName}
      />
      <Footer />
    </div>
  );
}


export default App;
