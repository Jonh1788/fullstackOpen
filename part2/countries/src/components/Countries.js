import { useState } from "react"
import { getWheaterOnLatLon } from '../services/wheater'

const CountrieInformation = ({ countrie }) => {
  
  const [wheaterInformation, setWheaterInformation] = useState(null)
  getWheaterOnLatLon(countrie.capitalInfo['latlng'])
  .then(result => setWheaterInformation(result.data))
  
  const languages = []
  for(const langs in countrie.languages){
    languages.push(countrie.languages[langs])
  }

  return(
    <div key={countrie.name.common}>
          <h1>{countrie.name.common}</h1>
          <p>capital { countrie.capital.map(capitals => capitals + " ")}</p>
          <p>area {countrie.area}</p>
          <h2>Languages</h2>
          <ul>
            {languages.map(lang => <li key={lang}>{lang}</li>)}
          </ul>
          <img src={countrie.flags['png']} alt="flag"/>

          {wheaterInformation && (<>
            <h2>Wheater in {countrie.capital[0]}</h2>
            <p>temperature {(wheaterInformation.main['temp'] - 273.15).toFixed(2) } Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${wheaterInformation.weather[0]['icon']}@2x.png`} alt="icon climate"/>
            <p>wind {wheaterInformation.wind['speed']} m/s</p>
            </>
          )}
    </div>
  )
}

const Countries = (countrie) => {
  countrie = countrie.countrie
  const [show, setShow] = useState(false)
  const renderCountrieInformation = () => {
    setShow(!show)
  
  }
  console.log(countrie)
  return (
    <>
    <p key={countrie.name?.common}>{countrie.name?.common}<button type="button" onClick={renderCountrieInformation}>show</button></p>
    {show && <CountrieInformation countrie={countrie}/>}
    </>
  )

}

const CountriesList = ({ filteredCountries }) => {
  

  if(filteredCountries && filteredCountries.length < 10 && filteredCountries.length > 0)
  {
    return filteredCountries.map(filteredCountrie => <Countries key={filteredCountrie.area} countrie={filteredCountrie}/>)
  
  } else if(filteredCountries && filteredCountries.length > 10){

   return <p>Too many countries...</p>
  } 
}

export {
	CountriesList
}
