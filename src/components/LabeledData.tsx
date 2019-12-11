import React from 'react';
import './LabeledData.scss';

interface LabeledDataProps {
    label: string
    data: string | number
    className?: string
}

const LabeledData = ({label, data, className = ''}: LabeledDataProps) => {
    return (
        <div className={`labeled-data-container ${className}`}>
            <div className='labeled-data-label'>
                {label}
            </div>
            <div className='labeled-data-data'>
                {data}
            </div>
        </div>
    )
}

export default LabeledData;