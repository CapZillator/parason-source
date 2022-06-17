import React from 'react';

function Clear(props: any) {
    const style = props.wrapper;
    return (
        <div>
            <svg width="100" height="100" version="1.1" viewBox="0 0 26.458 26.458" className={style}>
                <rect className="Clear-icon-el" transform="rotate(45)" x="2.2572" y="-2.1622" width="33.254" height="4.3245" rx="1.9018" ry="1.8844" strokeWidth="0.32676"/>
                <rect className="Clear-icon-el" transform="rotate(-45)" x="-16.627" y="16.722" width="33.254" height="4.3245" rx="1.9018" ry="1.8844" strokeWidth="0.32676"/>     
            </svg>
        </div>
    );
  }
  export default Clear;