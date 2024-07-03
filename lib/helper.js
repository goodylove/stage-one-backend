const axios = require('axios');


const handleGetLocation = async (address) => {
    const url = `http://ipwhois.app/json/${address}`;
    try {
        const res = await axios.get(url);
        const data = await res.data.city
        return data
    } catch (error) {
        console.error(error);

    }

}



const handleGetTemperature = async (city) => {
    const key = "fb1ec7b5f8132f84ba6469134cbdc4ad"

    const endpoint = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;

    try {
        const response = await axios.get(endpoint)
        const res = await response.data.main.temp
        return res
    } catch (error) {
        console.log("Error getting weather data")
    }

}






module.exports = { handleGetLocation, handleGetTemperature }