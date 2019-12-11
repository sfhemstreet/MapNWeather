export function convertPrecip(mm: number, isMetric: boolean = false){
    return isMetric ? `${mm}mm` : `${(Math.round((mm / 25.4) * 100) / 100)}in`;
}