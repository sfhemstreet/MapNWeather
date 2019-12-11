import React from 'react';

import './WeatherWindow.scss';

import CloudIcon from './CloudIcon';
import LabeledData from './LabeledData';

export interface WeatherWindowProps {
    data?: {
        date?: string
        time?: string
        temp: number
        sunrise?: string | undefined
        sunset?: string | undefined
        humidity?: number
        icon: string
        description: string
        wind: string
        rain: string | null
        snow: string | null
        visibility: string | null
        name?: string  
    } | null
    
}

const WeatherWindow = ({data}:WeatherWindowProps) => {
    if(data){
        const {date, temp, sunrise, sunset, humidity, icon, description, wind, rain, snow, visibility, name, time} = data;
        return (
            <div className='weather-window'>
                <div className='weather-window-cloud'>
                    <CloudIcon title={description} icon={icon}/>
                </div>
                <div className='weather-window-main'>
                    {(name || time) && <div className='weather-window-top'>
                        {name && <div className='item'>
                            {name}    
                        </div>}
                        {time && <div className='item'>
                            {time}    
                        </div>}
                        {date && <div className='item'>
                            {date}    
                        </div>}
                    </div>}
                    <div className='weather-window-bottom'>
                        <div className='together2'>
                            <LabeledData label='Temp'     data={`${temp}°`}      />
                            {humidity && <LabeledData label='Humidity' data={`${humidity}%`} />} 
                        </div>
                        {(sunrise || sunset) && <div className='together2'>
                            {sunrise && <LabeledData label='Sunrise' data={sunrise} />} 
                            {sunset && <LabeledData label='Sunset'  data={sunset}  />}  
                        </div>}
                        <div className='together2'> 
                            <LabeledData label='Wind' data={wind} /> 
                            {visibility && <LabeledData label='Visibility' data={visibility} />} 
                        </div>
                        {(rain || snow) && 
                            <div className='together2'> 
                                {rain && <LabeledData label='Rain' data={rain} />}
                                {snow && <LabeledData label='Snow' data={snow} />}
                            </div>}
                    </div>    
                </div>
            </div>
                
        )    
    }
    // blur if no data
    return (
        <div className='weather-window-container'>
            <div className='weather-window-item '></div>
            <div className='weather-window-item '></div>
            <div className='weather-window-item '></div>
            <div className='weather-window-item '></div>
            <div className='weather-window-item '></div>
            <div className='weather-window-item '></div>
            <div className='weather-window-item '></div>
            <div className='weather-window-item '></div>
            <div className='weather-window-item '></div>
        </div>
    )
}

export default WeatherWindow;