import React from 'react';
import './CloudIcon.scss';

import clearDay from '../assets/01d.png';
import clearNight from '../assets/01n.png';
import fewCloudsDay from '../assets/02d.png';
import fewCloudsNight from '../assets/02n.png';
import scatteredClouds from '../assets/03d.png';
import brokenClouds from '../assets/04d.png';
import showerRain from '../assets/09d.png';
import rainDay from '../assets/10d.png';
import rainNight from '../assets/10n.png';
import thunderstorm from '../assets/11d.png';
import snow from '../assets/13d.png';
import mist from '../assets/50d.png';

interface CloudIconProps {
    icon: string
    title?: string
}

const CloudIcon = ({icon, title = 'Cloud Icon'}:CloudIconProps) => {
    let src = null;
    let bgColor = 'rgb(67, 88, 185)';
    switch(icon){
        case '01d':
            src = clearDay;
            break;
        case '01n':
            src = clearNight;
            bgColor = 'rgb(199, 202, 206)';
            break;
        case '02d':
            src = fewCloudsDay;
            break;
        case '02n':
            src = fewCloudsNight;
            bgColor = 'rgb(69, 81, 117)';
            break;
        case '03n':
            src = scatteredClouds;
            bgColor = 'rgb(54, 54, 54)';
            break;
        case '03d':
            src = scatteredClouds;
            break;
        case '04n':
            src = brokenClouds;
            bgColor = 'rgb(117, 117, 117)';
            break;
        case '04d':
            src = brokenClouds;
            break;
        case '09n':
            bgColor = 'rgb(117, 117, 117)';
            src = showerRain;
            break;
        case '09d':
            src = showerRain;
            break;
        case '10d':
            src = rainDay;
            bgColor = 'rgb(151, 150, 150)';
            break;
        case '10n':
            src = rainNight;
            bgColor = 'rgb(117, 117, 117)';
            break;
        case '11n':
            src = thunderstorm;
            bgColor = 'rgb(117, 117, 117)';
            break;
        case '11d':
            src = thunderstorm;
            bgColor = 'rgb(151, 150, 150)';
            break;
        case '13n':
            bgColor = 'rgb(100, 100, 100)';
            src = snow;
            break;
        case '13d':
            src = snow;
            break;
        case '50n':
            bgColor = 'rgb(150, 150, 150)';
            src = mist;
            break;
        case '50d':
            bgColor = 'rgb(200, 200, 200)';
            src = mist;
            break;
        default:
            src = fewCloudsDay;
    }
    
    return (
        <div title={title} className='cloud-icon' style={{backgroundColor:bgColor}}>
            <img src={src} className='img' alt={title} />
        </div>
    )
}

export default CloudIcon;