
import './App.css';
import  {AiOutlineSearch} from 'react-icons/ai';
import React , {useState} from 'react';
import axios from 'axios';

function App() {
  const [data,setData]=useState({});
  const [location,setLocation]=useState('');
  const apiKey = "a4461de947618dc98a478f297d50eff8";

  
  const getWetherDetails = (cityName) => {
    if (!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
    axios.get(apiURL).then((res) => {
      console.log("response", res.data)
      setData(res.data)
    }).catch((err) => {
      console.log("err", err)
    })

  }
  

  const handleChangeInput = (e) => {
    
    setLocation(e.target.value)

  }

  const handleSearch = () => {
    getWetherDetails(location);
    setLocation ("");
  }
  
  return (
    <div className='all'>
     <div className='card'>
       <div className='search'>
           <input type='text' 
                  className='search-bar' 
                  placeholder='Search'
                  onChange={handleChangeInput}
                  onKeyDown={(event)=> {
                    if (event.keyCode == 13) handleSearch();
                  }}
           />
           <button onClick={handleSearch}> <AiOutlineSearch/> </button>
       </div>
     
     <div className='weather'>
        <h2 className='city'>weather in {data.name}</h2>
        {data.main ? <h1 className='temp'>{((data.main.temp)-273.15).toFixed(2)}°C</h1> : null} 
        {data.weather ? <div className='description'>{data.weather[0].main}</div> :null }
        {data.main ? <div className='humidity'>humidity:{data.main.humidity} </div> : null}
        {data.wind ? <div className='wind'>wind speed : {data.wind.speed}</div> : null}
     </div>
     </div>
    </div>
  );
}

export default App;
