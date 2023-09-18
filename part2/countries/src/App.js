import axios from "axios";
import { useEffect, useState } from "react";
import { CountriesList } from "./components/Countries"

function App() {

  const [countries, setCountries] = useState(null)
  const [filteredCountries, setfilteredCountries] = useState(null)
  useEffect(() => {
   axios.get("https://restcountries.com/v3.1/all?fields=name,flags,capital,languages,area,capitalInfo")
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
