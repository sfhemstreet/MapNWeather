import React, { ChangeEvent } from 'react';

import './SideNav.scss';

import SideNavIcon from '../components/SideNavIcon';
import SearchBox from '../components/SearchBox';
import DropDown from '../components/DropDown';
import ScrollBox from '../components/ScrollBox';

import AreaObject  from '../interfaces/AreaObject.interface';

interface SideNavProps {
    isOpen: boolean,
    handleOpenClose: () => void,
    data: null | AreaObject[],
    onSelectData: (name: string, coords:{ lat: number, lng: number }) => void,
}

interface SideNavState {
    searchInput: string,
    searchType: string,
}

class SideNav extends React.Component<SideNavProps, SideNavState>{
    constructor(props: SideNavProps){
        super(props);
        this.state = {
            searchInput: '',
            searchType: 'All',
        }
    }

    handleOpenClose = () => {
        this.props.handleOpenClose();
    }

    handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchInput: event.target.value });
    }

    handleSearchTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        this.setState({ searchType: event.target.value });
    }

    filterBySearchInputAndSearchType = () => {
        // filter rendered list by serachInput and searchType
        // if area has a subarea of valid type display subarea too
        // always display the main area if a subarea is valid

        const { data, onSelectData } = this.props;
        const { searchInput, searchType } = this.state;

        if(!data)
            return 

        const areas: Array<any> = [];

        for(let i = 0; i < data.length; i++){
            const area = data[i];
            let areaPass = true;

            const subareas: Array<any> = [];

            for(let x = 0; x < area.subareas.length; x++){
                const subarea = area.subareas[x];
                let subareaPass = true;
                
                // check if subarea has desired 'type'
                if(searchType !== 'All' && !subarea.types.includes(searchType))
                    subareaPass = false;
                
                // check if subarea name is part of serachInput
                if(subareaPass && searchInput !== '' && !subarea.name.toLowerCase().includes(searchInput.toLowerCase()))
                    subareaPass = false;

                // check if the area this subarea is apart of is part of searchInput
                if(searchInput !== '' && area.name.toLowerCase().includes(searchInput.toLowerCase())){
                    // it is, check if subarea has desired type 
                    if(searchType !== 'All' && !subarea.types.includes(searchType))
                        subareaPass = false;
                    else
                        subareaPass = true;
                }
                
                if(subareaPass){
                    subareas.push(
                        <div key={`Sidenav-${subarea.name}-${subarea.id}`} className='area subarea' onClick={() => onSelectData(subarea.name,subarea.coords)}>
                            {subarea.name}
                        </div>
                    );
                }
            }
            
            // dont show arae if no subareas typoes and no area types match
            if(searchType !== 'All' && !area.types.includes(searchType) && !subareas.length)
                areaPass = false;

            // dont show area if no subareas valid and area name is not valid
            if(searchInput !== '' && !subareas.length && !area.name.toLowerCase().includes(searchInput.toLowerCase()))
                areaPass = false;

            if(areaPass){
                areas.push(
                    <div key={`Sidenav-${area.name}-${area.id}`} className='sidenav-area-container'>
                        <div className='area' onClick={() => onSelectData(area.name, area.coords)}>{area.name}</div>
                        {subareas}
                    </div>    
                );
            }
        }

        return areas;
    }

    render(){
        const { isOpen } = this.props;
        const { searchType } = this.state;

        const searchArea = this.filterBySearchInputAndSearchType();

        return (
            <div className={isOpen ? 'sidenav-container' : 'sidenav-container open'}>
                {isOpen ? 
                <div className='side-nav-appear'>
                    <div className='sidenav-row space-between'>
                        <div className='sidenav-title'>Areas</div>
                        <SideNavIcon isOpen={isOpen} onClick={this.handleOpenClose}/>    
                    </div>
                    <div className='sidenav-row-wrap space-around'>
                        <SearchBox 
                            onChange={this.handleSearchInput}
                            content={this.state.searchInput}
                            placeholder={'Search Areas'}
                        />
                        <DropDown
                            content={['All','Bouldering','Sport','Trad']}
                            onChange={this.handleSearchTypeChange}
                            selected={searchType}
                            label={'Climbing Type'}
                        /> 
                    </div>
                    <div className='sidenav-searcharea'>
                        <ScrollBox >
                            {searchArea}     
                        </ScrollBox>
                    </div>
                </div>
                :
                <SideNavIcon isOpen={isOpen} onClick={this.handleOpenClose}/> 
                }
            </div>
        )
    }
}

export default SideNav;