import "../App.css";
import React, { useState, useEffect } from "react";
import Slider from "react-input-slider";

function Weather() {
  //data filtered in UseEffect
  const [weatherDataList, setWeatherDataList] = useState([]);

  //value of minimal weather temp updated in Slider
  const [state, setState] = useState({ x: 11 });

  useEffect(() => {
      //fetching data
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast/daily?q=paris&cnt=7&appid=${process.env.REACT_APP_API_KEY_WEATHER}&units=metric`
    )
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };

        //conversion of time in millisecond to english readable date.
        for (let i = 0; i < data.list.length; i++) {
          data.list[i].date = new Date(
            data.list[i].dt * 1000
          ).toLocaleDateString("en-EN", options);
        }
        //cloning data to clone
        let clone = { ...data };

        //flitering data to match with the value of the slider
        clone.list = clone.list.filter((x) => x.temp.min >= state.x);

        //updating state
        setWeatherDataList(clone.list);
      })
      .catch(function (err) {
        console.log("error :", err);
      });
  }, [state]);

  const displayWeather = () => {
    //testing if the array is empty
    if (weatherDataList.length > 0) {
      console.log("je suis vrai");
      return (
        <div>
        {/* mapping to display multuple cards */}
          {weatherDataList.map((i) => {
            return (
              <div className="dayWeatherBackground">
                <img
                // fetching the openweathermap image weather dynamically
                  src={`http://openweathermap.org/img/wn/${i.weather[0].icon}@2x.png`}
                  className="weatherImg"
                ></img>
                <div className="dateOfWeather">
                    {/* cut the string to match the day */}
                  <text>{i.date.split(" ")[0].slice(0, 4)}.</text>
                    {/* cut the string to match the day of the month */}
                  <text className="bigDate">
                    {i.date.split(" ")[2].slice(0, 2)}
                  </text>
                  {/* cut the string to match the month */}
                  <text>{i.date.split(" ")[1]}</text>
                </div>
                <div>
                  <div className="minAndMaxTemps">
                    <text>min temp</text>
                    <text className="tempData">
                        {/* rounding data to entire */}
                      {Math.round(i.temp.min)} °C
                    </text>
                  </div>
                  <div className="minAndMaxTemps">
                    <text>max temp </text>
                    <text className="tempData2">
                        {/* rounding data to entire */}
                      {Math.round(i.temp.max)} °C
                    </text>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
    //   display error of the array if empty
      return (
        <div className="descr-err">
          <text>
            Please, select a lower temperature than {state.x} °C, thank you.{" "}
          </text>
        </div>
      );
    }
  };

  // MAIN RETURN
  return (
    <>
      <div>
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

      {/* DISPLAY OF THE WEATHER CARDS */}
      {displayWeather()}
    </>
  );
}

export default Weather;
