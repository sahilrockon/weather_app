import React, { useState, useEffect, useCallback } from 'react';
import { BsArrowClockwise } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { WiDaySunny, WiDayCloudy, WiDayCloudyHigh,WiRain } from 'react-icons/wi';


const App = () => {

  const [weatherData, setWeatherData] = useState(null);
  const [searchLocation, setSearchLocation] = useState('Delhi, India');
  const [currentLocation, setCurrentLocation] = useState('Delhi, India');

  const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); 
const day = String(today.getDate()).padStart(2, '0');

const fe = `${year}-${month}-${day}`;


const[date,setdate]=useState(fe);



const handleDateChange = (e) => {
  const selectedDate = e.target.valueAsDate; 
  if (selectedDate) {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setdate(formattedDate);
  }
};
const handleSubmit = (e) => {
  e.preventDefault();
  fetchWeatherData();
};


  const key1='XH59JB6BML9N4DYZ86HQPVXC2';

  const WeatherIcons = {
    'clear-day': <WiDaySunny />,
    'partly-cloudy-day': <WiDayCloudy />,
    'cloudy': <WiDayCloudyHigh />,
    'rain': <WiRain />,
    'sun-day': <WiDaySunny />, // Icon for sunny day
    // Add more weather conditions and their corresponding icons as needed
  };

  console.log(date);


  const fetchWeatherData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchLocation}/${date}/next5days?unitGroup=metric&include=days&key=${key1}&contentType=json`
      );
      const data =  await response.json();
      if (data.days.length > 5) {
        data.days = data.days.slice(0, 5); 
      }
      setWeatherData(data);
      setCurrentLocation(searchLocation);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, [searchLocation,date]);

  useEffect(() => {
    const fetchWeather = async () => {
      await fetchWeatherData();
    };

    fetchWeather(); 
  }, [fetchWeatherData]);

  const refreshWeather = () => {
    fetchWeatherData();
  };

  const handleSearch = (e) => {
    setSearchLocation(e.target.value);
  };

  return (
    <div className="app-container " style={{backgroundColor:'gray'}}>
      <nav className="navba r navbar bg-primary">
        <div className="navbar-brand">Weather App</div>
        <div className="ml-auto">
          <div className="navbar-refresh" onClick={refreshWeather}>
          Refresh
 <BsArrowClockwise /> 
          </div>
        </div>
      </nav>
      <div className=" " >
      <br/><br/><br/>

      <div className="search-bar">
        
      <h2 style={{color:'red'}}>Current Weather in {currentLocation}</h2>

        <input
          type="text"
          placeholder="Search location..."
          value={searchLocation}
          onChange={handleSearch}
          className="search-input"
        />

      </div>


      <div>


      </div>

      
      <h2 style={{color:'red'}}>Date: {date}</h2>
      

      <div className='main'>
      
      <div>
      <div>  <form onSubmit={handleSubmit} >
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={handleDateChange}
          />
          <button type="submit">Show</button>
        </form> 
      </div>
      <div style={{height:'6vw',textAlign:'center'}}><h3 style={{color:'white'}}>Details</h3></div>
        <div className='tags'><br/>
        
              <p>Date</p>  
              <p>Sunrise</p>                 
              <p>Sunset</p>                 
              <p>Humidity</p>     
              <p>WindSpeed</p>            
          </div>


      </div>
       
      </div>
      
      
        
              
        
      
      
    
      
      {weatherData && weatherData.days ? (
            <div className="weather-info">
              {weatherData.days.map((day, index) => (
            <div key={index} className="weather-day">
            <div className="top">
              <div className="large"> {WeatherIcons[day.icon] || WeatherIcons['sun-day']} </div>
              <p>{day.icon}</p>
            </div>
            <div className="bottom" style={{whiteSpace:'nowrap'}}>
               <p>{day.datetime}</p>
              <p>{day.sunrise}</p>
              <p> {day.sunset}</p>
              <p> {day.humidity}%</p>
              <p> {day.windspeed} km/h</p>
            </div>
          </div>
          
              ))}
            </div>
          ) : (
            <p>Error......</p>
          )}

      </div>

</div>

  );
};

export default App;
