import React, { useContext } from 'react';
import { ContextApp } from './reducer';

function CustomSettings() {
    const {state, dispatch} = useContext(ContextApp);
    
    return (
        <div>ccc</div>
    )
}

export default CustomSettings;