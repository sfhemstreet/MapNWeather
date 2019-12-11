import React from 'react';

import './Map.scss';

import LeafletMap from '../components/LeafletMap';

import SelectedAreaObject from '../interfaces/SelectedAreaObject.interface';
import AreaObject from '../interfaces/AreaObject.interface';
import Marker from '../interfaces/Marker.interface';

import mtn from '../assets/mtn.png';
import bigMtn from '../assets/bigmtn.png';


interface MapProps {
    selectedArea: SelectedAreaObject | null
    areas: AreaObject[] | null,
}

interface MapState {
    markers: Marker[] | null
}

class Map extends React.Component<MapProps, MapState>{
    constructor(props:MapProps){
        super(props);
        this.state = {
            markers: null
        }
    }

    componentDidMount(){
        const {areas} = this.props;

        if(areas)
            this.makeMarkers(areas);
    }

    componentDidUpdate(prevProps: MapProps){
        const {areas} = this.props;

        if(areas && areas !== prevProps.areas)
            this.makeMarkers(areas)
    }

    makeMarkers = (areas: AreaObject[]) => {
        let markers: Array<Marker> = [];

        for(let i = 0; i < areas.length; i++){
            const area = areas[i];
            const marker = {
                name: area.name,
                coords: area.coords,
                icon: bigMtn
            }
            markers.push(marker);

            for(let x = 0; x < area.subareas.length; x++){
                const subarea = area.subareas[x];
                const marker = {
                    name: subarea.name,
                    coords: subarea.coords,
                    icon: mtn
                }
                markers.push(marker);
            }
        }
        
        this.setState({ markers: markers });
    }

    render(){
        const {selectedArea} = this.props;
        const {markers} = this.state;

        return (
            <div className='map-container'>
                {selectedArea && <div className='map-upper'>
                    <div className='title item'>
                        {selectedArea.name}
                    </div>
                    {selectedArea.description && <div className='item'>
                        {selectedArea.description} 
                    </div>}    
                </div>}
                <div className='map-main'>
                    <LeafletMap 
                        coords={selectedArea ? selectedArea.coords : null}  
                        markers={markers} 
                    /> 
                </div>
            </div>
        )
    }
}

export default Map;