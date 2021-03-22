//fix babel problem with async
import 'regenerator-runtime/runtime';
//tailwind and fontawesome
import './styles.css';
//modules
import {dataHandler} from './modules/handleData.js';
import {domRenders} from './modules/domRender.js';
import {apiCaller} from './modules/weatherApi.js';

const loadDiv = document.querySelector('.load-window');
const searchBtn = document.querySelector('#search');
const cityInput = document.querySelector('#city-name');

const renderOnPage = async (name) => {
    try{
        const data = await apiCaller.getCityInfo(name);
        const obj = dataHandler.buildMainObject(data);
        domRenders.displayMainData(obj);
        
        const forecastData = await apiCaller.getForecastInfo(obj.lat, obj.lon);
        const arr = dataHandler.buildForecastArray(forecastData);
        domRenders.displayForecastData(arr);
        
        const secondaryArr = dataHandler.buildSecondaryArray(forecastData);
        domRenders.displaySecondaryData(secondaryArr);

        const dailyArr = dataHandler.buildDailyForecasArray(forecastData);
        domRenders.displayDailyForecast(dailyArr);
        
    }
    catch(error){
        console.log(error);
        domRenders.applyInvalid(cityInput);
    }
}

domRenders.initialLoad();
renderOnPage('Belo+Horizonte');

searchBtn.addEventListener('click', () => {
    const data = dataHandler.getInputData();
    renderOnPage(data);
    domRenders.resetInput(cityInput);
});


cityInput.addEventListener('focus', (ev) => {
    domRenders.resetInput(ev.target)
});

