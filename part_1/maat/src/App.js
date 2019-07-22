import React, {useState, useEffect} from 'react';
import axios from 'axios'
import data from './db.json'

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
  
const App = () => {

  const [filter, newFilter] = useState('Fi')
  const [countries, newCountries] = useState([])
  const [weather, newWeather] = useState('')

  const handleChange = (event) => {
    console.log(event.target.value)
    newFilter(event.target.value)
  }

  const handleClick = (event) => {
    event.preventDefault()
    newFilter(event.target.value)
  }

  const getWeather = (value) => {
    axios
      .get(`http://api.apixu.com/v1/current.json?key=04242ede56df4e4fbcc213419192007&q=${value}`)
      .then(response => 
        newWeather(response.data))
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
      const country = countries[0]
      const weather = getWeather(country.capital)   
      return (
        <div>
          <h1>{country.name}</h1>
          <h5>Capital {country.capital}</h5>
          <h5>Population {country.population}</h5>
          <ul>{country.languages.map((language, key) => <li key={key}>{language.name}</li>) }</ul>
          <img src={country.flag} alt={country.name} />
          <h1>Weather in {country.name}</h1>
          <p>Temperature {console.log(weather)}</p>
        </div>
      ) 
    } else {
      return (
        <div>{countries.map((country, key) => 
          <div key={key} >
            <p>{country.name}</p> 
            <button value={country.name} onClick={handleClick}>Näytä</button>
          </div>
        )}</div>
      ) 
    }
  }
 
  return (
    <div className="App">
      {console.log(weather)}
     {displayCountries(listCountries)}
      <Form handleChange={handleChange} />
      
    </div>
  );
}

export default App;
