const apiCaller = (() => {
    const key = '33c399614ab1d26bc9d7d347dab3cd9a';
    
    const buildCityCall = (name) =>{
        return `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${key}`; 
    }

    const buildForecastCall = (lat, lon) => {
        return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${key}`;
    }

    const getCityInfo = async (name) => {
        const response = await fetch(buildCityCall(name), {mode:"cors"});
        const data = await response.json();
        return data;
    }

    
    const getForecastInfo = async (lat, lon) => {
        const response = await fetch(buildForecastCall(lat, lon), {mode:"cors"});
        const data = await response.json();
        return data;
    }

    
    return{
        getCityInfo,
        getForecastInfo
    }

})();


export {apiCaller}