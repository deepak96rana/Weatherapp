import React, { useState, useEffect } from "react";
import "./style.css";
import Weathercard from "./weathercard";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("ranchi");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=836faeb39e7b85e4ed944d3b5a0f889a`;

      let res = await fetch(url);
      let data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
    
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>
     <Weathercard  tempInfo={tempInfo}/>
  </>
    );
};
export default Temp;


// function getintegre(a,n){
//   let total = Math.floor((n+1)* (n+2)/2);
//   for (let i =0;i<n;i++)
//   total -= a[i];
//   return total;
// }
// let arr =[1,2,4,5,6];
// let n =arr.length;
// let miss  = getintegre(arr,n);
// console.log(miss);