export default interface SelectedAreaObject{
    name: string, 
    coords: {
        lat: number,
        lng: number
    },
    description?: string
}