import React from 'react';
import Logo from './Icons/Logo';
import '../styles/Main.scss';

function Footer(props: any) {
    const acc = props.acc;
    const lang = props.lang;
    const curYear = new Date().getFullYear();
    return (
        <footer className='Main-Footer'>
        <div className='Main-Footer-Container'>
          <div className='Main-Footer-Geolocation'>
            <p>Parason.me {lang.lib.info.footerText}</p>
            <p>{lang.lib.info.geoAcc} {acc}.</p>
            <p>© Parason.me - {curYear}</p>
          </div>
          <Logo wrapper='Main-Logo'/>
        </div>
      </footer>
    );
  }
  export default Footer;