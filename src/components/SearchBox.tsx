import React, { ChangeEvent } from 'react';

import './SearchBox.scss';

interface SearchBoxProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    content: string,
    onSubmit?: () => void,
    placeholder?: string,
}

const SearchBox = ({onChange, onSubmit, content, placeholder='Search'}:SearchBoxProps) => {
    return (
        <div className='search-box-container'>
            <div className='search-box-bubble'>
                <button 
                    className='search-box-btn-container'
                    onClick={onSubmit}
                >
                    <div className='search-box-icon'/>    
                </button>
                <label aria-label={placeholder}>
                    <input 
                        onChange={onChange}
                        value={content}
                        placeholder={placeholder}
                        className='search-box-input'
                    />
                </label>
            </div>    
        </div>
    )
}

export default SearchBox;