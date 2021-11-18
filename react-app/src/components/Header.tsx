import React, { useState, useEffect } from "react";
import "../styles/Header.css";
import HeaderDataField from "./HeaderDataField";
import CityLabel from "./CityLabel";
import { TiWeatherSnow } from "react-icons/ti";
import { BsThermometerSun, BsWind } from "react-icons/bs";
import { BiTachometer } from "react-icons/bi";
import { WiHumidity } from "react-icons/wi";
import axios from "axios";
import { LatLng } from "leaflet";

const Header = (props: any) => {
  const latLng: LatLng = props.userLocationCoords;

  const [resp, setData] = useState(Object);
  const [city, setCity] = useState("Warsaw")

  const getCity = (coords: LatLng) => {
    setCity("Warsaw")
  }

  const getData = async () => {
    await axios
      .get(
        `http://et-webapi.azurewebsites.net/api/readings/latest?latitude=${latLng.lat}&longitude=${latLng.lng}`
      )
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  };


  useEffect(() => {
    getData();
    getCity(latLng);
  }, []);


  return (
    <div className="container theme">
      <div className="logo">
        <TiWeatherSnow
          style={{ fontSize: "100px", float: "left", margin: "0" }}
        />
        <div className="logoLabel">
          <p className="label">Forecast Application</p>
        </div>
      </div>
      <div className="absolutePositionedContainer">
        <CityLabel city={city}/>
        <div className="dataFields">
          <HeaderDataField
            key="temperature"
            icon={BsThermometerSun}
            name="Temperature"
            value={resp.temperature}
            unit="°C"
          />
          <HeaderDataField
            key="pressure"
            icon={BiTachometer}
            name="Pressure"
            value={resp.pressure}
            unit="hPa"
          />
          <HeaderDataField
            key="humidity"
            icon={WiHumidity}
            name="Humidity"
            value={resp.humidity}
            unit="%"
          />
          <HeaderDataField
            key="airQualityIndex"
            icon={BsWind}
            name="AQI"
            value={resp.airQualityIndex}
            unit=""
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
