export default interface AreaObject {
    name: string, 
    id: string,
    coords: {
        lat: number,
        lng: number
    },
    types: string[],
    subareas: {
        name: string,
        id: string,
        coords: {
            lat: number,
            lng: number
        },
        types: string[],
        hashtag?: string,
        description?: string
    }[],
    hashtag?: string,
    description?: string
}