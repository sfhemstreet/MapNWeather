import React, { ChangeEvent } from 'react';

import './DropDown.scss';

interface DropDownProps {
    content: string[],
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void,
    label: string,
    selected: string
}

const DropDown = ({content, onChange, label, selected}:DropDownProps) => {

    const renderOptions = content.map(item => {
        return (
            <option value={item} key={`${item}-DropDown`}>{item}</option>
        )
    });

    return (
        <label className='dropdown-label'>{label}
            <select onChange={onChange} className='dropdown-select' defaultValue={selected}>
                {renderOptions}
            </select>    
        </label>
       
    )
}

export default DropDown;