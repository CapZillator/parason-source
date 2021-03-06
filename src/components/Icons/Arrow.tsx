import React from 'react';

function Arrow(props: any) {
    const style = props.wrapper;
    return (
        <div>
            <svg width="100" height="100" version="1.1" viewBox="0 0 26.458 26.458" className={style}>
                <path d="m1.2408 9.0951c-0.69486-0.69486-0.69486-1.8135 0-2.5084 0.69486-0.69486 1.8135-0.69486 2.5084 0l9.5293 9.5293 9.5293-9.5293c0.69486-0.69486 1.8138-0.69512 2.5086-2.61e-4 0.69486 0.69486 0.69486 1.814 0 2.5089l-10.783 10.783c-0.69486 0.69486-1.8138 0.6946-2.5086-2.61e-4z" strokeWidth="0.1919"/>
            </svg>
        </div>
    );
  }
  export default Arrow;