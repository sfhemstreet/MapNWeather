import React from 'react';

import './SlideBox.scss';

interface SlideBoxProps {
    children: any
}

const SlideBox = ({children}:SlideBoxProps) => {
    return (
        <div 
            className="slidearea" 
            style={{ overflowX: 'auto', width:'100px' }}
        >
            {children}
        </div>
    )
}

export default SlideBox;