import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [temp, setTemp] = useState("");
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [lattitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isReady, setReady] = useState(false);
  const [divColor, setDivColor] = useState(""); // State pour stocker la couleur du div

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=12.5833&lon=-16.2719&appid=4f866977a1dd85cd1fa41b8c8bd07afb&units=metric"
    )
      .then((result) => result.json())
      .then((jsonresult) => {
        setTemp(jsonresult.main.temp);
        setDesc(jsonresult.weather[0].main);
        setIcon(jsonresult.weather[0].icon);
        setName(jsonresult.name);
        setLatitude(jsonresult.coord.lat);
        setLongitude(jsonresult.coord.lon);
        setSunrise(new Date(jsonresult.sys.sunrise * 1000));
        setSunset(new Date(jsonresult.sys.sunset * 1000));
        
        // Déterminer la couleur du div en fonction de la température
        const temperature = jsonresult.main.temp;
        if (temperature < 10) {
          setDivColor("blue");
        } else if (temperature >= 10 && temperature < 20) {
          setDivColor("#bee3be");
        } else {
          setDivColor("#eca9a7");
        }

        setReady(true);
      })
      .catch((err) => console.error(err));
  }, []);

  if (isReady) {
    return (
      <div style={{ textAlign: "center" }}>
          <h1 style={{ backgroundColor: "black", color: "white", padding: "10px", textAlign: "center" , width:"50%" }}>My Weather App</h1>
        
        <div className="weather-div" style={{ backgroundColor: divColor, color: "black", padding: "20px",width:"48%"}}>
          <p><b>City</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name}</p>
          <p><b>Temperature</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{temp} °C</p>
          <p><b>Main</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{desc}</p>
          <p><b>Description</b>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{desc} sky</p>
          <p><b>Illustration</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather icon" />
          <p><b>Sunrise </b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{sunrise.toLocaleTimeString()}</p>
          <p><b>Sunset</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{sunset.toLocaleTimeString()}</p>
          <p><b>Latitude</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{lattitude}</p>
          <p><b>Longitude</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{longitude}</p>
        </div>
     </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default App;
