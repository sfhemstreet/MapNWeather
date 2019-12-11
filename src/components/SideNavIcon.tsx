import React from 'react';
import './SideNavIcon.scss';

interface SideNavIconProps {
    isOpen: boolean,
    onClick: () => void,
}

const SideNavIcon = ({isOpen, onClick}:SideNavIconProps) => {
    return (
        <div onClick={() => onClick()} onKeyDown={(e) => e.keyCode === 13 ? onClick() : null} tabIndex={1} className='side-nav-button'>
            <div className='sidenav-icon-container'>
                {isOpen ? <div   className='x-icon'/> : <div className='menu-icon' />}   
            </div>
        </div>
    )
}

export default SideNavIcon;