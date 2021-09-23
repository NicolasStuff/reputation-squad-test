import "../App.css";
import React, { useState, useEffect } from "react";

function Weather() {
  const [value, setValue] = useState("");
  const [weatherData, setWeatherData] = useState();
  const [weatherDataList, setWeatherDataList] = useState([]);

  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast/daily?q=paris&cnt=7&appid=${process.env.REACT_APP_API_KEY_WEATHER}&units=metric`
    )
      .then(function (res) {
        // console.log(res)
        return res.json();
      })
      .then(function (data) {
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };

        for (var i = 0; i < data.list.length; i++) {
          data.list[i].date = new Date(
            data.list[i].dt * 1000
          ).toLocaleDateString("fr-FR", options);
        }
        // console.log('data', data);

        let clone = { ...data };

        // console.log('clone', clone);

        clone.list = clone.list.filter((x) => x.temp.min >= 14);

        // console.log('clone2', clone);

        // console.log('result', result)

        // console.log(newDataWeather.toLocaleDateString("fr-FR", options));

        setWeatherData(clone);
        setWeatherDataList(clone.list);
      })
      .catch(function (err) {
        console.log("error :", err);
      });
  }, [value]);

  //   console.log('weatherData', weatherData)
  console.log("weatherDataList", weatherDataList);

  const displayWeather = () => {
    if (weatherDataList.length > 0) {
      console.log("je suis vrai");
      return (
        <div className="App">
          {weatherDataList.map((i) => {
            return (
              <ul>
                <li>Date : {i.date}</li>
                <li>Temp maximum : {i.temp.max}</li>
                <li>Temp minimun: {i.temp.min}</li>
                <img src={`http://openweathermap.org/img/wn/${i.weather[0].icon}@2x.png`}></img>
                {/* <li>Icon placeholder: {weatherData.list[i].weather.icon}</li> */}
              </ul>
            );
          })}
        </div>
      );
    } else {
      console.log("je suis faux");
      return (
        <ul>
          <li>no data yet</li>
        </ul>
      );
    }
  };

  return <>{displayWeather()}</>;
}

export default Weather;
