import React from 'react';

function Clouds(props: any) {
    const style = props.wrapper;
    return (
        <div>
            <svg width="100" height="100" version="1.1" viewBox="0 0 40 40" className={style}>
                <path d="m21.435 9.8866a9.6111 9.6111 0 0 0-7.9562 4.2463 4.405 4.405 0 0 0-0.36383-0.0193 4.405 4.405 0 0 0-4.2844 3.4276 5.7844 5.7844 0 0 0-0.11968 0 5.7844 5.7844 0 0 0-5.7876 5.783 5.7844 5.7844 0 0 0 5.7876 5.7876h20.451a8.2959 8.2959 0 0 0 8.2962-8.2962 8.2959 8.2959 0 0 0-8.2962-8.2962 8.2959 8.2959 0 0 0-1.0436 0.07181 9.6111 9.6111 0 0 0-6.683-2.7047z" strokeWidth="3.0059"/>
            </svg>
        </div>
    );
  }
  export default Clouds;