export function getLocalDateTime(secs: number, UTCOffset: number, isMetric:boolean = false){
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateFull = new Date((secs * 1000) + (UTCOffset) + 28800);
    const date = dateFull.toLocaleDateString("en-US", options).slice(0, -6);
    const time = dateFull.toTimeString().slice(0,5);

    if(isMetric){
        return {time, date}
    }

    let hour = Number(time.slice(0,2));

    if(hour > 12){
        hour = hour - 12;
        const usTime = hour.toString() + time.slice(2) + (hour === 12 ? 'am' : 'pm');

        return {time: usTime, date}
    }
    
    const usTime = hour.toString() + time.slice(2) + (hour === 12 ? 'pm' : 'am');

    return {time: usTime, date}
}

