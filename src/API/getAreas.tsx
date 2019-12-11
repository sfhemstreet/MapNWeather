import AreaObject from '../interfaces/AreaObject.interface';

export const getAreas = (): AreaObject[] => {
    
    const areas = [
        {
            name: 'Bishop',
            id: '1',
            coords: {
                lat: 37.361, 
                lng: -118.395
            }, 
            types: ['Bouldering','Sport'],
            subareas: [
                {
                    name: 'Happies',
                    id: '1-a',
                    coords: {
                        lat: 37.417, 
                        lng: -118.451
                    },
                    types: ['Bouldering']
                },
                {
                    name: 'Buttermilks',
                    id: '1-b',
                    coords: {
                        lat: 37.328, 
                        lng: -118.578
                    },
                    types: ['Bouldering'],
                },
                {
                    name: 'Owens River Gorge',
                    id: '1-c',
                    coords: {
                        lat: 37.446, 
                        lng: -118.572
                    },
                    types: ['Sport'],
                },
            ],
        },
        {
            name: 'Lake Tahoe',
            id: '2',
            coords: {
                lat: 39.109, 
                lng: -120.237
            },
            types: ['Bouldering','Sport','Trad','Ice'],
            subareas: [
                {
                    name: 'Castle Peak',
                    id: '2-a',
                    coords: {
                        lat: 39.341, 
                        lng: -120.348
                    },
                    types: ['Bouldering']
                },
                {
                    name: 'The Emeralds',
                    id: '2-b',
                    coords: {
                        lat: 39.319, 
                        lng: -120.657
                    },
                    types: ['Sport'],
                },
                {
                    name: 'Donner Summit',
                    id: '2-c',
                    coords: {
                        lat: 39.33, 
                        lng:-120.335
                    },
                    types: ['Sport','Trad','Bouldering'],
                },
                {
                    name: 'Cascade Cliff',
                    id: '2-d',
                    coords: {
                        lat: 38.931, 
                        lng:-120.111
                    },
                    types: ['Sport','Trad'],
                },
            ],
        },
        {
            name: 'Yosemite', 
            id: '3',
            coords: {
                lat: 37.723, 
                lng: -119.635
            },
            types: ['Bouldering','Trad','Sport'],
            subareas: [],
        },
    ];

    return areas;
}