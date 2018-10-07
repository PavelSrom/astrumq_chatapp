import React from 'react';
import './DefaultHeader.css';
import logo from '../../images/logo_astrumq.png';

const defaultHeader = () => {
    return (
        <header className="HeaderDefault">
            <div className="container">
	              <div className="center">
		              <img src={logo} alt=""/>
	              </div>
            </div>
        </header>
    )
}

export default defaultHeader;