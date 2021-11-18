import { LatLng } from "leaflet";

export default interface IMapMarkerProperties{
    DeviceName: string;
    SensorName: string;
    LatLen: LatLng;
    City: string;
    Aqi: number;
    Temperature: number;
    Pressure: number;
    Humidity: number;
}