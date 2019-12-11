import React from 'react';

import './Weather.scss';

import ToggleSwitch from '../components/ToggleSwitch';
import ButtonSwitch from '../components/ButtonSwitch';
import WeatherWindow from '../components/WeatherWindow';

import { get5DayWeather, getCurrentWeather } from '../API/getWeather';
import { CurrentWeatherRaw, FiveDayWeatherRaw} from '../interfaces/WeatherData.interface';
import { getLocalDateTime } from '../utils/getLocalDateTime';
import { convertKelvin } from '../utils/convertKelvin';
import { getWindString } from '../utils/getWindString';
import { convertPrecip } from '../utils/convertPrecip';
import { convertMetersToFeet } from '../utils/convertMetersToFeet';
import { firstLettersUpperCase } from '../utils/firstLettersUpperCase'
import ExpandableContainer from '../components/ExpandableContainer';
import SlideBox from '../components/SlideBox';


interface WeatherProps {
    coords: {
        lat: number,
        lng: number
    } | null
}

interface WeatherState {
    currentWeather: null | CurrentWeatherRaw
    fiveDayWeather: null | FiveDayWeatherRaw
    isMetric: boolean
    usedCoords: {
        [coord: string] : {
            time: number
            current: CurrentWeatherRaw
            fiveDay: FiveDayWeatherRaw   
        }
    }
    lastFetch: number
}

interface FiveDayWeatherData {
    [date:string]: {
        time: string
        temp: number
        humidity: number
        icon: string
        description: string
        wind: string
        rain: string | null
        snow: string | null
        visibility: string | null    
    }[]
}

class Weather extends React.Component<WeatherProps, WeatherState>{
    constructor(props:WeatherProps){
        super(props);
        this.state = {
            currentWeather: null,
            fiveDayWeather: null,
            isMetric: false,
            usedCoords: {},
            lastFetch: Date.now()
        }
    }

    async componentDidMount(){
        const {coords} = this.props;

        if(coords)
            await this.fetchWeather(coords);
    }

    async componentDidUpdate(prevProps: WeatherProps){
        const {coords} = this.props;

        if(coords === prevProps.coords)
            return

        if(coords)
            await this.fetchWeather(coords);
    }

    fetchWeather = async (coords:{lat: number, lng: number}) => {
        /* 
            Only fetch weather data if we haven't already fetched for the given coords. 
            If we have fetched the data before, check time (seconds), fetch again if its been over 5 min.
        */

        const {usedCoords} = this.state;
        
        const used = JSON.parse(JSON.stringify(usedCoords));
        const strCoords: string = `${coords.lat}${coords.lng}`;
 
        if(used[strCoords]){
            const now = Math.round(Date.now() / 1000); // seconds
            const fiveMin = 60 * 5;
            
            if(now - used[strCoords].time < fiveMin){
                this.setState({ currentWeather: used[strCoords].current, fiveDayWeather: used[strCoords].fiveDay });  
                return  
            }
        }
        
        const fiveDay = await get5DayWeather(coords);
        const current = await getCurrentWeather(coords);
        
        used[strCoords] = {
            current : current,
            fiveDay : fiveDay,
            time : Math.round(Date.now() / 1000),
        }

        this.setState({ currentWeather: current, fiveDayWeather: fiveDay, usedCoords: used });
    }


    handleUnitChange = () => {
        this.setState({ isMetric: !this.state.isMetric });
    }

    parseCurrWeather = (isMetric:boolean, data: CurrentWeatherRaw | null) => {
        if(!data)
            return null;

        // check if rain or snow exist, then what time line exists. Very ugly. Optional chaining in future!! 
        const rain = data.rain ? ( data.rain['1h'] ? convertPrecip(data.rain['1h'],isMetric) : ( data.rain['3h'] ? convertPrecip(data.rain['3h'], isMetric) : null ) ) : null;
        const snow = data.snow ? ( data.snow['1h'] ? convertPrecip(data.snow['1h'],isMetric) : ( data.snow['3h'] ? convertPrecip(data.snow['3h'], isMetric) : null ) ) : null;

        const curr = {
            date: getLocalDateTime(data.dt, data.timezone, isMetric).date,
            temp: convertKelvin(data.main.temp, isMetric),
            sunrise: getLocalDateTime(data.sys.sunrise, data.timezone, isMetric).time,
            sunset: getLocalDateTime(data.sys.sunset, data.timezone, isMetric).time,
            humidity: data.main.humidity,
            icon: data.weather[0].icon,
            description: firstLettersUpperCase(data.weather[0].description),
            wind: getWindString(data.wind.deg, data.wind.speed, isMetric),
            rain: rain, 
            snow: snow,
            visibility: data.visibility ?  isMetric ? `${data.visibility}m` : convertMetersToFeet(data.visibility) : null,
            name: data.name,
        }

        return curr;
    }

    parseFiveDayWeather = (isMetric:boolean, data: FiveDayWeatherRaw | null) => {
        if(!data)
            return

        const fiveDayData: FiveDayWeatherData = {}; // store weather dataSeg's by date

        const timezone = data.city.timezone;
        
        data.list.forEach(dataSeg => {
            // check if rain or snow exist, then what time line exists. Very ugly. Optional chaining in future!! 
            const rain = dataSeg.rain ? ( dataSeg.rain['1h'] ? convertPrecip(dataSeg.rain['1h'],isMetric) : ( dataSeg.rain['3h'] ? convertPrecip(dataSeg.rain['3h'], isMetric) : null ) ) : null;
            const snow = dataSeg.snow ? ( dataSeg.snow['1h'] ? convertPrecip(dataSeg.snow['1h'],isMetric) : ( dataSeg.snow['3h'] ? convertPrecip(dataSeg.snow['3h'], isMetric) : null ) ) : null;

            const weatherWindow = {
                time: getLocalDateTime(dataSeg.dt, timezone, isMetric).time,
                temp: convertKelvin(dataSeg.main.temp, isMetric),
                humidity: dataSeg.main.humidity,
                icon: dataSeg.weather[0].icon,
                description: firstLettersUpperCase(dataSeg.weather[0].description),
                wind: getWindString(dataSeg.wind.deg, dataSeg.wind.speed, isMetric),
                rain: rain, 
                snow: snow,
                visibility: dataSeg.visibility ?  isMetric ? `${dataSeg.visibility}m` : convertMetersToFeet(dataSeg.visibility) : null,
            } 

            const date = getLocalDateTime(dataSeg.dt, timezone, isMetric).date;
            fiveDayData[date] ? fiveDayData[date].push(weatherWindow) : fiveDayData[date] = [weatherWindow]; 
            
        });

        return fiveDayData;
    }

    render(){
        const {isMetric, currentWeather, fiveDayWeather} = this.state;

        const parsedCurrWeather = this.parseCurrWeather(isMetric, currentWeather);
        const parsedFiveDayWeather = this.parseFiveDayWeather(isMetric, fiveDayWeather);

        const extendCurrWeather = (parsedFiveDayWeather && parsedCurrWeather) ? 
            (parsedFiveDayWeather[parsedCurrWeather.date] ? parsedFiveDayWeather[parsedCurrWeather.date].map(data => <WeatherWindow key={`${parsedCurrWeather.date}${data.time}`} data={data} />) : null) 
            : null;

        const renderFiveDayWeather = parsedFiveDayWeather ? Object.keys(parsedFiveDayWeather).map(date => {
            const day = parsedFiveDayWeather[date];

            if(parsedCurrWeather && parsedCurrWeather.date === date){
                return null;
            }
    
            const allHours = day.map(dataSeg => <WeatherWindow data={dataSeg} key={`${dataSeg.time}${date}`}/>);
    
            // 4th index is one o clock. sometimes that doesnt exist, go with 1st element
            const oneOClock = allHours[4] ? allHours[4] : allHours[0];
    
            return (
                <ExpandableContainer 
                    key={`FiveDay${date}`} 
                    extendedChildren={allHours} 
                    childrenHiddenOnExpand={oneOClock}
                    className={'justify-start padding'}
                    defaultOpen={false}
                    >
                    <div className='center-text'>
                        {date}
                    </div>
                </ExpandableContainer>
            );
        }) : null;

        return (
            <div className='weather-container'>
                <div className='weather-switch-toggle'>
                    <ToggleSwitch isOn={isMetric} onClick={this.handleUnitChange} display={{on:'C°', off: 'F°'}}/> 
                </div>
                <div className='weather-switch-button'>
                    <ButtonSwitch isOn={isMetric} onClick={this.handleUnitChange} display={{on:'C°', off: 'F°'}}/> 
                </div>
                <div className='inline'> 
                    {/* Current Weather */}
                    <ExpandableContainer 
                        className={'justify-start'}
                        extendedChildren={extendCurrWeather} 
                        >
                            <WeatherWindow data={parsedCurrWeather} />    
                    </ExpandableContainer>
                </div>
                <div className='center margin'>
                    {/* Five Day Weather */}
                    <SlideBox>
                        {renderFiveDayWeather}     
                    </SlideBox>
                </div>
                
            </div>
        )   
    }
}

export default Weather;