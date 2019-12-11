interface Coords {
    lat: number,
    lng: number,
}

export async function get5DayWeather(coords: Coords){
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lng}&appid=4232b2a2d3846effca4ba04243308fab`;
    const response = await fetchData(url);

    if(response.error)
        return; 
    
    return response.data;   
}

export async function getCurrentWeather(coords: Coords){
    
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=4232b2a2d3846effca4ba04243308fab`;
    const response = await fetchData(url);

    if(response.error)
        return; 
    
    return response.data;
}

async function fetchData(url: string){
    try{
        const response = await fetch(url)
        const data = await response.json() 
        return {data: data, error: null};   
    }
    catch(err){
        console.log('fetch err',err)
        return {data: null, error: err}
    }
}