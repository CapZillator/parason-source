import React from 'react';

function Search(props: any) {
    const style = props.wrapper;
    return (
        <div>
            <svg width="100" height="100" version="1.1" viewBox="0 0 26.458 26.458" className={style}>
            <path className="Search-icon-el" transform="scale(.26458)" d="m41.33 2.1348a39.201 39.201 0 0 0-39.201 39.199 39.201 39.201 0 0 0 39.201 39.201 39.201 39.201 0 0 0 22.52-7.1367l23.633 23.631c2.1974 2.1974 6.0947 1.8389 8.7383-0.80469 2.6436-2.6436 3.0001-6.539 0.80274-8.7363l-23.629-23.631a39.201 39.201 0 0 0 7.1348-22.523 39.201 39.201 0 0 0-39.199-39.199zm0 9.8262a29.373 29.373 0 0 1 29.373 29.373 29.373 29.373 0 0 1-29.373 29.375 29.373 29.373 0 0 1-29.373-29.375 29.373 29.373 0 0 1 29.373-29.373z" strokeWidth="1.1241"/>
            </svg>
        </div>
    );
  }
  export default Search;