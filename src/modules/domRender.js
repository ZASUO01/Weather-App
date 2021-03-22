const domRenders = (() => {
    const mainDisplay = document.querySelector('#main-display');
    const mainCamp1 = document.querySelector('#main-1');
    const mainCamp2 = document.querySelector('#main-2');
    const mainCamp3 = document.querySelector('#main-3');
    const mainCamp4 = document.querySelector('#main-4');
    const container = document.querySelector('#forecast-container');
    const secondaryContainer = document.querySelector('#secondary-info-grid');
    const dailyContainer = document.querySelector('#daily-forecast-container');

    const createElement = (type, id, class_list, content, attr_list) => {
        let el = document.createElement(type);
        if(id) el.id = id;
        if(class_list){
            class_list.forEach(cl => {
                el.classList.add(cl);
            });
        }
        if(content) el.textContent = content;
        if(attr_list){
            attr_list.forEach(attr => {
                el.setAttribute(attr.name, attr.value);
            });
        }
        return el;
    }

    
    
    const appendElements = (parent, el_array) => {
        el_array.forEach(el => {
            parent.appendChild(el);
        });
    }
    
    const initialLoad = () => {
        mainCamp1.textContent = 'Belo Horizonte / BR';
        mainCamp2.textContent = 'Scattered clouds';
        mainCamp3.textContent = '25°';
        mainCamp4.textContent = 'Sunrise: 5:54 / Sunset: 18:21';
        const defaultforecast = createIndividualForecast('0:00', '0°', 'Default', 'http://openweathermap.org/img/wn/01n@2x.png');
        container.appendChild(defaultforecast);
    }
    
    const displayMainData = (data) => {
        mainDisplay.classList.add('fade-in');
        mainDisplay.addEventListener('animationend', () => {
            mainDisplay.classList.remove('fade-in');
        });
        mainCamp1.textContent = `${data.name} / ${data.country}`;
        mainCamp2.textContent = data.description;
        mainCamp3.textContent = `${data.temperature}°`;
        mainCamp4.textContent = `Sunrise: ${data.sunrise} / Sunset: ${data.sunset}`;
    }



    const createIndividualForecast = (time, temperature, description, icon) => {
        const forecastElement = createElement('div', null, ['py-4', 'px-2', 'w-44', 'border-r-2', 'border-gray-400', 'flex', 'flex-col', 'items-center', 'justify-center', 'text-gray-700'],null,null);
        const p1 = createElement('p', null, ['w-full', 'text-xl', 'border-b', 'border-gray-400', 'text-center', 'mb-4'], `${time}`, null);
        const p2 = createElement('p', null, ['text-3xl', 'mb-2'], `${temperature}°`, null);
        const img = createElement('img', null, null,null, [{name:'src', value: icon},{name:'alt', value:'weather-icon'}]);
        const p4 = createElement('p', null, ['font-semibold'], `${description}`, null);
        appendElements(forecastElement, [p1, p2, img, p4]);
    
        return forecastElement;
    }
    

    const displayForecastData = (data_arr) => {
        container.classList.add('fade-in');
        container.addEventListener('animationend', () => {
            container.classList.remove('fade-in');
        });
        container.innerHTML = '';
        data_arr.forEach(obj => {
            const singleFc = createIndividualForecast(obj.time, obj.temperature, obj.description, obj.icon);
            container.appendChild(singleFc);
        });
    }

    
    const createSecondaryElement = (title, value) => {
        const secondaryDiv = createElement('div', null, ['justify-self-center', 'flex', 'items-center', 'justify-center', 'flex-col'], null, null);
        const p1 = createElement('p', null, ['text-xl', 'text-gray-300', 'font-light'], `${title}`, null);
        const p2 = createElement('p', null, ['text-2xl'], `${value}`, null);
        appendElements(secondaryDiv, [p1, p2]);
        return secondaryDiv;
    }

    const displaySecondaryData = (data_arr) => {
        secondaryContainer.classList.add('fade-in');
        secondaryContainer.addEventListener('animationend', () => {
            secondaryContainer.classList.remove('fade-in');
        });
        secondaryContainer.innerHTML = '';
        data_arr.forEach(el => {
            const newElement = createSecondaryElement(el[0], el[1]);
            secondaryContainer.appendChild(newElement);
        });
    }

    const createDailyElement = (day, description, icon, max, min) => {
        const dailyForecast = createElement('div', null, ['bg-gray-300', 'px-6', 'py-2', 'border', 'border-gray-500', 'rounded-lg', 'mb-6','flex','items-center','justify-center' ,'md:justify-start', 'flex-col', 'md:flex-row'], null, null);
        const p1 = createElement('p', null, ['text-center', 'mb-2','text-xl', 'text-gray-600', 'w-44', 'md:mr-10', 'md:border-r', 'border-gray-500'], `${day}`, null);
        const p2 = createElement('p', null, ['text-center','text-lg','text-gray-600','md:pr-2','md:mr-10'], `${description}`,null);
        const img = createElement('img', null, null, null, [{name:'src', value: icon}, {name:'alt', value: 'weather-icon'}]);
        const p3 = createElement('p', null, ['md:ml-10','md:pl-6', 'md:border-l', 'border-gray-500', 'text-xl', 'text-gray-600'], `Max: ${max}° / Min: ${min}°`, null);
        appendElements(dailyForecast, [p1, p2, img, p3]);
        return dailyForecast;
    }

    const displayDailyForecast = (data_arr) => {
        dailyContainer.innerHTML = '';
        data_arr.forEach(obj => {
            const df = createDailyElement(obj.day, obj.description, obj.icon, obj.max_temp, obj.min_temp);
            dailyContainer.appendChild(df);
        });
    }
    
    const resetInput = (el) => {
        el.value = '';
        el.style.color = 'initial'
        el.style.border = '0';
    }
    
    
    const applyInvalid = (el) => {
        el.value = 'Unknown city';
        el.style.color = 'red';
        el.style.border = '2px solid #EF4444';
    }


    return{
        initialLoad,
        displayMainData,
        displayForecastData,
        resetInput,
        applyInvalid,
        displaySecondaryData,
        displayDailyForecast
    }

})();


export {domRenders};
