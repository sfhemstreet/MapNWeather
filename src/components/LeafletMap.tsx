import React from 'react';
import L from 'leaflet';

import './LeafletMap.scss';

import Marker from '../interfaces/Marker.interface';
import { DEFAULT_ECDH_CURVE } from 'tls';

interface LeafletMapProps {
    coords?: {
        lat: number,
        lng: number
    } | null,
    markers?: Marker[] | null
}

interface LeafletMapState {
    map: L.Map | null,
}

const DEFAULT_COORDS = {lat: 37.723, lng: -119.635};

 
class LeafletMap extends React.Component<LeafletMapProps, LeafletMapState>{
    constructor(props:LeafletMapProps){
        super(props);
        this.state = {
            map: null,
        }
    }
    

    componentDidMount(){
        const {coords, markers} = this.props; 

        // create base layers
        const defaultLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        });

        const satLayer = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '&copy; <a href="http://www.esri.com/">Esri</a> i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        });

        // create weather layers
        const weatherLayers = ['clouds_new','precipitation_new','wind_new', 'temp_new'].map(layer => {
            return L.tileLayer(`https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=4232b2a2d3846effca4ba04243308fab`)
        }); 

        const centerCoords = coords ? coords : DEFAULT_COORDS;
        
        // create map
        const map = L.map('leaflet-map', {
            center: [centerCoords.lat, centerCoords.lng],
            zoom: 14,
            layers: [defaultLayer],
        }); 

        // create baselayer interface
        const baseLayers = {
            "Default": defaultLayer,
            "Satellite": satLayer
        }
        // create overlayLayer interface
        const overlayLayers = {
            "Clouds": weatherLayers[0],
            "Precipitation": weatherLayers[1],
            "Wind": weatherLayers[2],
            "Temperature": weatherLayers[3],
        }

        // add layer conrol to map
        L.control.layers(baseLayers, overlayLayers).addTo(map);

        // add markers 
        if(markers){
            this.addMarkers()
        }
        
        this.setState({ map: map });
    }

    componentDidUpdate(prevProps: LeafletMapProps){
        const {coords, markers} = this.props;

        if(!this.state.map)
            return
        
        const map = this.state.map;

        // new coords = fly to new location 
        if((coords && prevProps.coords) && (coords.lat !== prevProps.coords.lat || coords.lng !== prevProps.coords.lng))
            map.flyTo({lat: coords.lat, lng: coords.lng}, 14);

        if(coords && !prevProps.coords && map.getCenter().lat === DEFAULT_COORDS.lat && map.getCenter().lng === DEFAULT_COORDS.lng)
            map.flyTo({lat: coords.lat, lng: coords.lng}, 14);
        
        if(markers && markers !== prevProps.markers)
            this.addMarkers()

    }
    
    addMarkers = () => {
        const {markers} = this.props;

        if(!this.state.map)
            return
        
        const map = this.state.map;
        
        if(!markers)
            return

        markers.forEach(marker => {
            const icon = L.icon({
                iconUrl: marker.icon,
                iconSize: [40,40]
            });

            L.marker([marker.coords.lat, marker.coords.lng], {
                title: marker.name,
                opacity: 1,
                icon: icon
            }).addTo(map)
        });
    }
        
   
    
    render(){
        return (
            <div id='leaflet-map' style={{width:'100%', height:'100%', zIndex:'auto'}}/>  
        )      
    }
}
 
export default LeafletMap;