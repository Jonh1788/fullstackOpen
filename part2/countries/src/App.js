import axios from "axios";
import { useEffect, useState } from "react";

const CountrieInformation = ({ countrie }) => {
  
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

    <p key={countrie.name?.common}>{countrie.name?.common}<button type="button" onClick={renderCountrieInformation}>show</button>{show && <CountrieInformation countrie={countrie}/>}</p>
  )

}

const CountriesList = ({ filteredCountries }) => {
  

  if(filteredCountries && filteredCountries.length < 10 && filteredCountries.length > 0)
  {
    return filteredCountries.map(filteredCountrie => <Countries countrie={filteredCountrie}/>)
  
  } else if(filteredCountries && filteredCountries.length > 10){

    <p>Too many countries...</p>
  } 
}

function App() {

  const [countries, setCountries] = useState(null)
  const [filteredCountries, setfilteredCountries] = useState(null)
  useEffect(() => {
   axios.get("https://restcountries.com/v3.1/all?fields=name,flags,capital,languages,area")
   .then(res => {
    setCountries(res.data)
  })
  }, [])


  const searchCountries = (countrieName) => {

    if(countries === null){
      return
    }


    const searchedCountries = countries.filter((countrie) => countrie.name.common.toLowerCase().includes(countrieName.toLowerCase()))
    setfilteredCountries(searchedCountries)

    console.log(filteredCountries)
    }

  return (
    <div>
      <form>
        find countries: <input onChange={(e) => {
          e.preventDefault()
          searchCountries(e.target.value)
          }} type="text" />
        <CountriesList filteredCountries={filteredCountries}/>
      </form>
    </div>
  )
}

export default App;
