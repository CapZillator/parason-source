import React from 'react';

function Cloud(props: any) {
    const style = props.wrapper;
    return (
        <div>
            <svg width="100" height="100" version="1.1" viewBox="0 0 40 40" className={style}>
                <path d="m21.426 8.9884a11.01 11.01 0 0 0-9.1142 4.8643 5.0462 5.0462 0 0 0-0.41678-0.02211 5.0462 5.0462 0 0 0-4.908 3.9265 6.6263 6.6263 0 0 0-0.13709 0 6.6263 6.6263 0 0 0-6.6299 6.6247 6.6263 6.6263 0 0 0 6.6299 6.6299h23.427a9.5033 9.5033 0 0 0 9.5036-9.5036 9.5033 9.5033 0 0 0-9.5036-9.5036 9.5033 9.5033 0 0 0-1.1955 0.08226 11.01 11.01 0 0 0-7.6556-3.0984z" strokeWidth="3.4433"/>
            </svg>
        </div>
    );
  }
  export default Cloud;