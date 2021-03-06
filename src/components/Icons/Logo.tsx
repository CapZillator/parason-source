import React from 'react';

function Logo(props: any) {
    const style = props.wrapper;
    return (
        <div>
            <svg width="100" height="100" version="1.1" viewBox="0 0 26.458 26.458" className={style}>
                <path d="m12.882 1.3318-7.9402 3.3215 7.9402 7.9402zm0.60977 0.032704v11.229l7.9628-7.9628zm-9.0036 3.6971-3.2662 7.9628h11.229zm17.374 0.023209-7.9396 7.9396h11.261zm-20.672 8.5494 3.321 7.9402 7.9402-7.9402zm12.733 0 7.9628 7.9628 3.2656-7.9628zm-1.0407 0.43095-7.9628 7.9628 7.9628 3.2662zm0.60977 0v11.261l7.9396-3.321z" strokeWidth="0.21022"/>
                <rect transform="rotate(90)" x="13.034" y="-25.948" width=".59995" height=".79674" rx=".22973" ry=".22973" strokeWidth="0.22444"/>
                <path transform="matrix(.010507 -.0039838 .0039838 .010507 13.069 13.247)" d="m31.067 62.993-44.053 1.4874-32.202-30.098-1.4874-44.053 30.098-32.202 44.053-1.4874 32.202 30.098 1.4874 44.053z" />
                <rect x="12.887" y=".53505" width=".59995" height=".79674" rx=".22973" ry=".22973" strokeWidth="0.22444"/>
                <rect x="12.887" y="25.326" width=".59995" height=".79674" rx=".22973" ry=".22973" strokeWidth="0.22444"/>
                <rect transform="rotate(-45)" x="-.40552" y="30.714" width=".59995" height=".79674" rx=".22973" ry=".22973" strokeWidth="0.22444"/>
                <rect transform="rotate(45)" x="18.445" y="12.066" width=".59995" height=".79674" rx=".22973" ry=".22973" strokeWidth="0.22444"/>
                <rect transform="rotate(-45)" x="-.39601" y="5.988" width=".59995" height=".79674" rx=".22973" ry=".22973" strokeWidth="0.22444"/>
                <rect transform="rotate(45)" x="18.455" y="-12.66" width=".59995" height=".79674" rx=".22973" ry=".22973" strokeWidth="0.22444"/>
                <rect transform="rotate(90)" x="13.034" y="-1.1898" width=".59995" height=".79674" rx=".22973" ry=".22973" strokeWidth="0.22444"/>
            </svg>
        </div>
    );
  }
  export default Logo;