import React, { useState, useEffect } from 'react'
import "../styles/Highlights.css"
import HighlightsDataField from "./HighlightsDataField"
import Location from "./Location"
import {TiWeatherSnow} from "react-icons/ti"
import { BsThermometerSun, BsWind } from 'react-icons/bs'
import {BiTachometer} from 'react-icons/bi'
import {WiHumidity} from "react-icons/wi"
import axios from 'axios'

export default function Highlights() {
        const latitude = "50.10"
        const longitude = "20.01"  


        const [resp, setData] = useState(Object);


        useEffect(() => {
            getData()
        }, []);

        async function getData() {
            await axios.get(`http://localhost:5000/api/readings/latest?latitude=${latitude}&longitude=${longitude}`)
            .then((response) => {
                setData(response.data);
                console.log(response.data);
            })
            .catch(error=>console.error("Error fetching data: ", error));
        }

        return (
            <div className="container theme">
                <div className="logo">
                    <TiWeatherSnow style={{fontSize: '100px', float: 'left', margin: '0'}}/>
                    <div className="logoLabel">
                        <p className="label">Forecast Application</p>
                    </div>
                </div>
                <div className="absolutePositionedContainer">
                    <Location/>
                    <div className="dataFields">
                        <HighlightsDataField icon={BsThermometerSun} name="Temperature" value={resp.temperature} unit="°C"/>
                        <HighlightsDataField icon={BiTachometer} name="Pressure" value={resp.pressure} unit="hPa"/>
                        <HighlightsDataField icon={WiHumidity} name="Humidity" value={resp.humidity} unit="%"/>
                        <HighlightsDataField icon={BsWind} name="AQI" value={resp.airQualityIndex} unit=""/>
                    </div>
                </div>
    
            </div>
        )
}