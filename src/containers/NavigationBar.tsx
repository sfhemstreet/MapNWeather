import React, { ReactElement } from 'react';

import './NavigationBar.scss';

interface NavigationBarProps {
    children: ReactElement[]
}

const NavigationBar = ({children}: NavigationBarProps) => {

    // Logo should always be the first element given (index 0)
    const renderLogo = children[0];

    // Link Elements - all after index 0 
    const renderLinks = children.map((element,index) => {
        return index > 0 ? <li key={'link' + index} className='link'>{element}</li> : null
    });

    return (
        <nav className='navbar'>
            <div className='toolbar' /* onClick={toolbarClick} */>
                <div className='toolbar icon' />
            </div>
            <div className='logo'>
                {renderLogo}
            </div>
            <ul className='links'>
                {renderLinks}
            </ul>
        </nav>
    )
}

export default NavigationBar;