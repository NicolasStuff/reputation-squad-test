import "../App.css";
import React, { useState, useEffect } from "react";
import Slider from "react-input-slider";

function Weather() {
  const [value, setValue] = useState("");
  const [weatherDataList, setWeatherDataList] = useState([]);
  const [state, setState] = useState({ x: 11 });

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

        clone.list = clone.list.filter((x) => x.temp.min >= state.x);

        console.log("clone.list", clone.list);

        // setWeatherData(clone);
        setWeatherDataList(clone.list);
      })
      .catch(function (err) {
        console.log("error :", err);
      });
  }, [state]);

  //   console.log('weatherData', weatherData)
  console.log("weatherDataList", weatherDataList);

  console.log("state", state);

  //  const onFilterTempMin = (temp) => {
  //     console.log(temp)
  //  }

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
                <img
                  src={`http://openweathermap.org/img/wn/${i.weather[0].icon}@2x.png`}
                ></img>
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

  return (
    <>
      <div className='dataTemps'>
        <text className="minTemp">min temp</text>
        <text className="temp">{state.x} °C</text>
      </div>
      <div className="backgroundSlider">
        <Slider
          axis="x"
          x={state.x}
          xmax={60}
          xmin={-20}
          xstep={1}
          onChange={({ x }) => setState((state) => ({ ...state, x }))}
          styles={{
            track: {
              height: 3,
              backgroundColor: "#DBE5FF",
            },
            active: {
              backgroundColor: "rgba(219, 229, 255, 1)",
            },
            thumb: {
              width: 16,
              height: 16,
              backgroundColor: "#8458FF",
            },
            disabled: {
              opacity: 0.5,
            },
          }}
        />
      </div>
      {displayWeather()}
    </>
  );
}

export default Weather;
