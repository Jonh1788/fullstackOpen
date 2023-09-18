import axios from 'axios'
//import { apiKey } from './wheaterKey'


const apiKey = process.env.REACT_APP_API_KEY

//Api wheater lat lon
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

//Api Wheater geocoder
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

const getWheaterOnLatLon = async ([lat, lng]) => {

	const wheaterInformation = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`)

	return wheaterInformation

}

export { getWheaterOnLatLon }
