import React from "react";
function App() {
  const [display, setDisplay] = React.useState(false);

  const [solarData, setSolarData] = React.useState({
    load: "",
    panelNumber: 0,
    inverterSize: 0,
    chargeControllerRating: 0,
    chargeControllerNumber: 0,
    batteryNumber: 0,
  });

  const handleChange = (event) => {
    setSolarData((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const solarPanelNumber = () => {
    const averageDailyLoad = Number(solarData.load) / 5.5;
    const efficiency = 0.2 * averageDailyLoad.toFixed(2);
    const actualLoad = efficiency + averageDailyLoad;
    const panelNo = actualLoad / 550;
    setSolarData((prevState) => {
      return {
        ...prevState,
        panelNumber: Math.round(panelNo),
      };
    });
  };

  const inverterSize = () => {
    const averageDailyLoad = Number(solarData.load) / 5.5;
    const safetyFactor = 0.25 * averageDailyLoad.toFixed(2);
    const capacityInKiloWatts = (averageDailyLoad + safetyFactor) / 1000;
    const capacityInKVA = capacityInKiloWatts / 0.8;
    setSolarData((prevState) => {
      return {
        ...prevState,
        inverterSize: Math.round(capacityInKVA),
      };
    });
  };

  const chargeControllerSelection = () => {
    const averageDailyLoad = Number(solarData.load) / 5.5;
    const chargeController = averageDailyLoad / 120;
    let chargeControllerNo = chargeController / 100;
    setSolarData((prevState) => {
      return {
        ...prevState,
        chargeControllerRating: Math.ceil(chargeController),
        chargeControllerNumber: Math.ceil(chargeControllerNo),
      };
    });
  };

  const batterySelection = () => {
    const batteryCapacity = Number(solarData.load) / 24;
    const noOfBatteries = batteryCapacity / 500;
    setSolarData((prevState) => {
      return {
        ...prevState,
        batteryNumber: Math.round(noOfBatteries),
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    solarPanelNumber();
    inverterSize();
    chargeControllerSelection();
    batterySelection();
    setDisplay(true);
    console.log("Solar successfully");
  };

  return (
    <>
      <div className={`justify-center ${display? "flex" : "hidden"}`}>
        <div className="card">
          <h3 className="mb-4 text-xl font-medium text-center">
            Solar Components Required for your Load
          </h3>
          <p className="font-medium text-lg">
            <span className="mr-2">No of Solar Panels:</span>
            {solarData.panelNumber}
          </p>
          <p className="font-medium text-lg">
            <span className="mr-2">Inverter Size:</span>
            {solarData.inverterSize}
            KVA 120V Pure sine wave inverter
          </p>
          <p className="font-medium text-lg">
            <span className="mr-2">Charge Controller Rating:</span>
            {solarData.chargeControllerRating}A
          </p>
          <p className="font-medium text-lg">
            <span className="mr-2">No of Charge Controllers:</span>
            {solarData.chargeControllerNumber}
          </p>
          <p className="font-medium text-lg">
            <span className="mr-2">No of Batteries:</span>
            {solarData.batteryNumber}
            <span className="ml-2">tubular batteries rated at 24V 500Ah</span>
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Total Load in WH"
          name="load"
          value={solarData.load}
          onChange={handleChange}
        />
        <div>
          <button>Submit</button>
        </div>
      </form>

      <div></div>
    </>
  );
}

export default App;
