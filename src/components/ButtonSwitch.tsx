import React from 'react';

import './ButtonSwitch.scss';

interface ButtonSwitchProps {
    isOn: boolean
    onClick: () => void
    display?: {
        on: string, 
        off: string
    }
}

const ButtonSwitch = ({isOn, onClick, display}: ButtonSwitchProps) => {
    return (
        <div className='switch-container'>
            <label className="toggle">
                <input onClick={onClick} type="checkbox" tabIndex={-1}/>
                <span className="switch-left">{isOn ? (display? display.on : 'On') : ((display? display.off : 'Off'))}</span>
            </label>    
        </div>
    )
}

export default ButtonSwitch;
