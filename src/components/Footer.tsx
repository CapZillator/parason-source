import React, { useContext, useState, useRef, useEffect } from 'react';
import Logo from './Icons/Logo';
import '../styles/Main.scss';

function Footer(props: any) {
    const acc = props.accuracy;
    const lang = props.lang;
    const curYear = new Date().getFullYear();
    return (
        <footer className='Main-Footer'>
        <div className='Main-Footer-Container'>
          <Logo wrapper='Main-Logo'/>
          <div className='Main-Footer-Geolocation'>
            <p>Parason.me {lang.lib.info.footerText}</p>
            <p>{lang.lib.info.geoAcc} {acc}.</p>
            <p>© Parason.me - {curYear}</p>
          </div>
        </div>
      </footer>
    );
  }
  export default Footer;