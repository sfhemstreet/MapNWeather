import React from 'react';

import './Switch.scss';

interface SwitchProps {
    isOn: boolean
    onChange: () => void
    display?: {
        on: string, 
        off: string
    }
}

const Switch = ({isOn, onChange, display}: SwitchProps) => {
    return (
        <div className='switch-container'>
            <label className="toggle">
                <input onClick={onChange} type="checkbox" tabIndex={-1}/>
                <span className="switch-left">{isOn ? (display? display.on : 'On') : ((display? display.off : 'Off'))}</span>
            </label>    
        </div>
    )
}

export default Switch;
