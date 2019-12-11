import React from 'react';

import './ToggleSwitch.scss';

interface ToggleSwitchProps {
    isOn: boolean
    onClick: () => void
    display?: {
        on: string, 
        off: string
    }
}

const ToggleSwitch = ({isOn, onClick, display}: ToggleSwitchProps) => {
    return (
        <div className="toggle-switch-container" onClick={onClick}>
            <div className="button-cover">
                <div className="button r toggle-switch"  >
                    <input type="checkbox" className="checkbox" /> 
                    <div className="knobs" style={display ? (isOn ? {content:`${display.on}`} : {content:`${display.off}`}) : {}}></div>
                    <div className="layer"></div>
                </div>
            </div>
        </div>
    )
}

export default ToggleSwitch;