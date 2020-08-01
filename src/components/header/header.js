import React from 'react';
import './header.scss';
import Navigation from './navigation';

const Logo = (props) => {
    return(
        <img className='logo' src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/da2e8612058573.56256be1b768a.png" alt="logo"/>
    )
}

const Header = () => {
    return(
        <header className='app-header'>
            <div className="container">
                <Logo/>
                <Navigation/>
            </div>
        </header>
    )
}

export default Header;