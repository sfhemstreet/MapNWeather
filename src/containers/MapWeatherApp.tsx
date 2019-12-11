import React from 'react';

import './MapWeatherApp.scss';

import SideNav from './SideNav';
import Map from './Map';
import Weather from './Weather';

import {getAreas} from '../API/getAreas';
import AreaObject from '../interfaces/AreaObject.interface';
import SelectedAreaObject from '../interfaces/SelectedAreaObject.interface';

interface MapWeatherAppProps{

}

interface MapWeatherAppState{
    selectedArea: SelectedAreaObject | null,
    isSideNavOpen: boolean,
    areas: null | AreaObject[],
}

const Yosemite: SelectedAreaObject = {
    name: 'Yosemite', 
    coords: {
        lat: 37.723, 
        lng: -119.635
    },
    description: "THE climbing destination."
}

class MapWeatherApp extends React.Component<MapWeatherAppProps, MapWeatherAppState>{
    constructor(props: MapWeatherAppProps){
        super(props);
        this.state = {
            selectedArea: null,
            isSideNavOpen: false,
            areas: null,
        }
    }

    componentDidMount(){
        const areas = getAreas();
        this.handleAreaSelection(areas[0].name, areas[0].coords);
        this.setState({ areas: areas });
    }

    handleSideNavOpenClose = () => {
        this.setState({ isSideNavOpen: !this.state.isSideNavOpen });
    }

    handleAreaSelection = (name: string, coords: {lat: number, lng: number}) => {
        const area = {
            name, coords
        }
        this.setState({ selectedArea: area });
    }
    
    render(){
        const {isSideNavOpen, areas, selectedArea} = this.state;

        return (
            <div className={'map-weather-app-container'}>
                <div className='map-weather-app-nav' style={isSideNavOpen ? {width:'200px'} : {width:'0px'}} >
                    <SideNav 
                        isOpen={isSideNavOpen}
                        handleOpenClose={this.handleSideNavOpenClose}
                        data={areas}
                        onSelectData={this.handleAreaSelection}
                    />
                </div>
                <div className='map-weather-app-upper'>
                    <Map 
                        selectedArea={selectedArea}
                        areas={areas}
                    />
                </div>
                <div className='map-weather-app-lower'>
                    <Weather 
                        coords={selectedArea ? selectedArea.coords : null}
                    /> 
                </div>    
            </div>
        )
    }
}

export default MapWeatherApp;