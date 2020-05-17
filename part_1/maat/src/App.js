import React, {useState, useEffect} from 'react';
import axios from 'axios'

const Form = ({handleChange}) => {
  return (
    <div>
      <form>
        <Input handleChange={handleChange} />
      </form>
    </div>
  )
}

const Input = ({handleChange}) => {
  return (
    <div>
      <input onChange={handleChange}  />
    </div>
  )
}

const DisplayCountries = ({listCountries, handleClick}) => {
  return (
     <div>{listCountries.map((country, key) => 
      <div key={key} >
        <p>{country.name}</p> 
        <button value={country.name} onClick={handleClick}>Näytä</button>
      </div>
    )}</div>
  ) 
}

const DisplayCountry = ({listCountries, handleClick}) => {

  const [weather, newWeather] = useState('')

  const country = listCountries[0]

  useEffect(() => {
    console.log(country)
     axios
      .get(`http://api.apixu.com/v1/current.json?key=04242ede5c6df4e4fbcc213419192007&q=${country.capital}`)
      .then(response => 
        newWeather(response.data.current)) 
  }, [country]) 

  return (
    <div>
      <h1>{country.name}</h1>
      <h5>Capital {country.capital}</h5>
      <h5>Population {country.population}</h5>
      <ul>{country.languages.map((language, key) => <li key={key}>{language.name}</li>) }</ul>
      <img src={country.flag} alt={country.name} />
      <h1>Weather in {country.name}</h1>
      <p>Temperature: {weather.temp_c}</p>
      <img src={weather.condition && weather.condition.icon} alt={weather.condition && weather.condition.text} />
      <p>Wind: {weather.wind_kph}kph {weather.wind_dir}</p> 
    </div>
  ) 
}
  
const App = () => {

  const [filter, newFilter] = useState('Fi')
  const [countries, newCountries] = useState([])

  const handleChange = (event) => {
    newFilter(event.target.value)
  }

  const handleClick = (event) => {
    event.preventDefault()
    newFilter(event.target.value)
  }

  useEffect(() => {
    axios 
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => 
        newCountries(response.data))
  }, []) 

  const listCountries = countries
    .filter((country) => country.name.toUpperCase().includes(filter.toUpperCase()))
  
  const displayCountries = (countries) => {
    console.log(countries.length)
    if(countries.length === 0) {
      return "ei mitään"
    } else if (countries.length >= 10) {
      return "yli kymmenen"
    } else if (countries.length === 1) {
      return <DisplayCountry listCountries={listCountries} />
    } else {
      return <DisplayCountries listCountries={listCountries} handleClick={handleClick} />
    }
  }
 
  return (
    <div className="App">

      <Form handleChange={handleChange} />

      {displayCountries(listCountries)}  
      
    </div>
  );
}

export default App;
