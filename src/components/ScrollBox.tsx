import React from 'react';

import './ScrollBox.scss';

interface ScrollBoxProps {
    children: any
}

const ScrollBox = ({children}:ScrollBoxProps) => {
    return (
        <div 
            className="scrollarea" 
            style={{ overflowY: 'scroll' }}
        >
            {children}
        </div>
    )
}

export default ScrollBox;