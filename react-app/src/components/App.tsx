import Footer from "./Footer";
import Map from "./Map";
import { useEffect, useState } from "react";
import IDevice from "../core/data/IDevice";

const App = () => {
  const [allDevices, setAllDevices] = useState<IDevice[]>([]);

  useEffect(() => {
    fetch("https://et-webapi.azurewebsites.net/api/Devices")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => setAllDevices(data))
      .catch((e) => `Errors: ${console.log(e)}`);
  }, []);

  return (
    <div>
      <Map devices={allDevices} />
      <Footer />
    </div>
  );
};

export default App;
