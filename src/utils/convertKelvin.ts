export function convertKelvin(k: number, isMetric: boolean = false):number {
    
    const c = k - 273.15;

    if(isMetric)
        return Math.round(c * 100) / 100;

    const f = (c * (9/5)) + 32;

    return Math.round(f * 100) / 100;
}