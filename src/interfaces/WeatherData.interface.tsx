export interface CurrentWeatherRaw {
    base: string
    main: {
        humidity: number
        pressure: number
        temp: number
        temp_max: number
        temp_min:  number
        sea_level: number
        grnd_level: number
    }
    name: string
    sys: {
        sunrise: number 
        sunset: number 
        country: string
        id: number
        type: number
    }
    coord: {
        lat: number
        lng: number
    }
    weather: {
        description: string
        icon: string
        id: number
        main: string
    }[]
    wind: {
        deg: number
        speed: number
        gust?: number
    }
    rain?: {
        '1h'?: number
        '3h'?: number
    }
    snow?: {
        '1h'?: number
        '3h'?: number 
    }
    clouds: {
        all: number
    }
    cod: number
    timezone: number
    visibility?: number
    dt: number
}


export interface FiveDayWeatherPartial {
    clouds: {
        all: number
    }
    dt: number
    dt_txt: string
    main: {
        grnd_level?: number
        humidity: number
        pressure: number
        sea_level: number
        temp: number
        temp_kf?: number
        temp_max?: number
        temp_min?:  number
    }
    sys?: {
        pod: string   
    }
    weather: {
        description: string
        icon: string
        id: number
        main: string
    }[]
    wind: {
        deg: number
        speed: number
    }
    rain?: {
        '1h'?: number
        '3h'?: number
    }
    snow?: {
        '1h'?: number
        '3h'?: number 
    }
    visibility?: number
}

export interface FiveDayWeatherRaw {
    city: {
        coord: {
            lat: number
            lng: number
        }
        country: string
        id: number
        name: string
        population: number
        sunrise: number | string
        sunset: number | string
        timezone: number
    }
    cnt: number
    cod: string
    message: number
    list: {
        clouds: {
            all: number
        }
        dt: number
        dt_txt: string
        main: {
            grnd_level?: number
            humidity: number
            pressure: number
            sea_level?: number
            temp: number
            temp_kf?: number
            temp_max?: number
            temp_min?:  number
        }
        sys?: {
            pod: string   
        }
        weather: {
            description: string
            icon: string
            id: number
            main: string
        }[]
        wind: {
            deg: number
            speed: number
        }
        rain?: {
            '1h'?: number
            '3h'?: number
        }
        snow?: {
            '1h'?: number
            '3h'?: number 
        }
        visibility?: number
    }[]
}