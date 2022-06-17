import React from 'react';

function BurgerMenu(props: any) {
    const style = props.wrapper;
    return (
        <div>
            <svg width="100" height="100" version="1.1" viewBox="0 0 26.458 26.458" className={style}>
                <rect x=".49215" y="3.0891" width="20.376" height="3.8899" rx="1.3893" ry="1.3893" strokeWidth="0.30187"/>
                <rect x=".49215" y="19.727" width="20.376" height="3.8899" rx="1.3893" ry="1.3893" strokeWidth="0.30187"/>
                <rect x=".49215" y="11.408" width="25.722" height="3.8899" rx="1.3893" ry="1.3893" strokeWidth="0.33917"/>
            </svg>
        </div>
    );
  }
  export default BurgerMenu;