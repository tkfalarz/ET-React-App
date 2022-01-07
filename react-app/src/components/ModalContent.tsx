import { useEffect, useState } from "react";
import { Line, LineChart, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import ISingleReading from "../core/data/ISingleReading";

const ModalContent = (props: any) => {
  const deviceName = props.deviceName;
  const [temperature, setTemperature] = useState<ISingleReading[]>([]);
  const [humidity, setHumidity] = useState<ISingleReading[]>([]);
  const [pressure, setPressure] = useState<ISingleReading[]>([]);

  useEffect(() => {
    fetch(`https://et-webapi.azurewebsites.net/api/Devices/${deviceName}/Readings/Temperature?limit=50`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        let mappedData: ISingleReading[];
        mappedData = data
        setTemperature(mappedData.reverse())
      })
      .catch((e) => `Errors: ${console.log(e)}`);

      fetch(`https://et-webapi.azurewebsites.net/api/Devices/${deviceName}/Readings/Humidity?limit=50`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        let mappedData: ISingleReading[];
        mappedData = data
        setHumidity(mappedData.reverse())
      })
      .catch((e) => `Errors: ${console.log(e)}`);

      fetch(`https://et-webapi.azurewebsites.net/api/Devices/${deviceName}/Readings/Pressure?limit=50`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        let mappedData: ISingleReading[];
        mappedData = data
        setPressure(mappedData.reverse())
      })
      .catch((e) => `Errors: ${console.log(e)}`);
  }, []);

  return (
    <div style={{ overflowY: "scroll", height: "700px"}}>
      <div style={{height: "auto", width: "auto"}}>
        <div style={{height: "auto", width: "auto"}}>
          <p style={{textAlign: "center"}}>Temperature</p>
        </div>
        <LineChart
          width={500}
          height={200}
          data={temperature}
          margin={{top: 10, bottom: 10, left: 0, right: 30}}
        >
              <CartesianGrid stroke='#f5f5f5'/>
              <XAxis dataKey="timestamp" label={"Timestamp"} minTickGap={10000}/>
              <YAxis dataKey="value" label={"°C"} domain={["auto", "auto"]} minTickGap={0.5}/>
              <Tooltip/>
              <Line type='monotone' dataKey='value'  stroke='#ff7300' />

        </LineChart>
      </div>

      <div style={{height: "auto", width: "auto"}}>
        <div style={{height: "auto", width: "auto"}}>
          <p style={{textAlign: "center"}}>Humidity</p>
        </div>
        <LineChart
          width={500}
          height={200}
          data={humidity}
          margin={{top: 10, bottom: 10, left: 0, right: 30}}
        >
              <CartesianGrid stroke='#f5f5f5'/>
              <XAxis dataKey="timestamp" label={"Timestamp"} minTickGap={10000}/>
              <YAxis dataKey="value" label={"%"} domain={[0, 100]} minTickGap={0.5}/>
              <Tooltip/>
              <Line type='monotone' dataKey='value'  stroke='#ff7300' />

        </LineChart>
      </div>

      <div style={{height: "auto", width: "auto"}}>
        <div style={{height: "auto", width: "auto"}}>
          <p style={{textAlign: "center"}}>Pressure</p>
        </div>
        <LineChart
          width={500}
          height={200}
          data={pressure}
          margin={{top: 10, bottom: 10, left: 0, right: 30}}
        >
              <CartesianGrid stroke='#f5f5f5'/>
              <XAxis dataKey="timestamp" label={"Timestamp"} minTickGap={10000}/>
              <YAxis dataKey="value" label={"hPa"} domain={["auto", "auto"]} minTickGap={0.5}/>
              <Tooltip/>
              <Line type='monotone' dataKey='value' stroke='#ff7300' />

        </LineChart>
      </div>
    </div>
  );
};

export default ModalContent;
