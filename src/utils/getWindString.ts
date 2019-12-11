export function getWindString(degree: number, speed:number, isMetric:boolean = false){
    let direction = '';
    
    if(degree > 348.75 || degree <= 11.25)
        direction = 'N';
    
    if(degree > 11.25 && degree <= 33.75)
        direction = 'NNE';

    if(degree > 33.75 && degree <= 56.25)
        direction = 'NE';

    if(degree > 56.25 && degree <= 78.75)
        direction = 'ENE';

    if(degree > 78.75 && degree <= 101.25)
        direction = 'E';

    if(degree > 101.25 && degree <= 123.75)
        direction = 'ESE';

    if(degree > 123.75 && degree <= 146.25)
        direction = 'SE';

    if(degree > 146.25 && degree <= 168.75)
        direction = 'SSE';

    if(degree > 168.75 && degree <= 191.25)
        direction = 'S';

    if(degree > 191.25 && degree <= 213.75)
        direction = 'SSW';

    if(degree > 213.75 && degree <= 236.25)
        direction = 'SW';

    if(degree > 236.25 && degree <= 258.75)
        direction = 'WSW';

    if(degree > 258.75 && degree <= 281.25)
        direction = 'W';

    if(degree > 281.25 && degree <= 303.75)
        direction = 'WNW';

    if(degree > 303.75 && degree <= 326.25)
        direction = 'NW';

    if(degree > 326.25 && degree <= 348.75)
        direction = 'NNW';

    if(isMetric)
        return `${direction} ${speed.toString()}m/s`;
    
    return `${direction} ${(Math.round((speed * 2.237) * 100) / 100)}mph`;
}