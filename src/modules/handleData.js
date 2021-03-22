const dataHandler = (() => {
    
    const capitalizeString = (str) => {
        return str.replace(/^\w/g, (c) => c.toUpperCase());
    }

    
    const translateTimeStamp = (time) => {
        const date = new Date(time * 1000);
        const h = date.getHours();
        let m = date.getMinutes();
        if(m <= 9) m = '0'+m;
        const str = h+':'+m;
        return str;
    }

    const getWeekDay = (time) => {
        const date = new Date(time * 1000);
        const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        const day = days[date.getDay()];
        return day;
    }

    const buildMainObject = (data) => {
        const obj = {
            name: data.name,
            country: data.sys.country,
            description: capitalizeString(data.weather[0].description),
            temperature: Math.floor(data.main.temp - 273.15),
            sunrise: translateTimeStamp(data.sys.sunrise),
            sunset: translateTimeStamp(data.sys.sunset),
            lat: data.coord.lat,
            lon: data.coord.lon
        }
        return obj;
    }


    const getWeatherIcon = (iconId) => {
        return `http://openweathermap.org/img/wn/${iconId}@2x.png`;
    }
    

    const buildForecastArray = (data) => {
        const data_arr = data.hourly;
        let new_arr = [];
        for(let i = 0; i < 24; i++){
            const obj = data_arr[i];
            const newObj = {
                time: translateTimeStamp(obj.dt),
                temperature: Math.floor(obj.temp - 273.15),
                description: capitalizeString(obj.weather[0].description),
                icon: getWeatherIcon(obj.weather[0].icon),
            }
            new_arr.push(newObj)
        }
        return new_arr;
    }

    
    const getInputData = () => {
        const input = document.querySelector('#city-name');
        const text = input.value;
        if(text){
            return text.replace(/(\s+$|^\s+)/g, '').replace(/\s+/g, '+').replace(/\b(\w)/g, (c) => c.toUpperCase());
        }
        return '';
    }

    const buildSecondaryArray = (data) => {
        const arr = [
            ['Latitude', data.lat],
            ['Longitude', data.lon],
            ['Humidity', `${data.current.humidity}%`],
            ['Pressure', `${data.current.pressure} hPa`],
            ['UV Index', data.current.uvi],
            ['Dew point',`${Math.floor(data.current.dew_point - 273.15)}°`],
            ['Visibility', `${data.current.visibility} m`],
            ['Wind speed', `${data.current.wind_speed} m/s`],
        ]
        return arr;
    }

    const buildDailyForecasArray = (data) => {
        const data_arr = data.daily;
        let new_arr = [];
        for(let i = 1; i < 8; i++){
            const obj = data_arr[i];
            const newObj = {
                day: getWeekDay(obj.dt),
                description: capitalizeString(obj.weather[0].description),
                icon: getWeatherIcon(obj.weather[0].icon),
                max_temp: Math.floor(obj.temp.max - 273.15),
                min_temp: Math.floor(obj.temp.min - 273.15)
            }
            new_arr.push(newObj);
        }
        return new_arr;
    }

    return{
        buildMainObject,
        buildForecastArray,
        getInputData,
        buildSecondaryArray,
        buildDailyForecasArray
    }

})();


export {dataHandler}