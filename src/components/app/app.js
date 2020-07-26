import React from 'react';
import './app.scss';
import Header from '../header';
import Sidebar from '../sidebar';
import MainContent from '../main-content';

const App = () => {
    return(
        <div className='app-wrapper'>
            <Header/>
            <Sidebar/>
            <MainContent/>
        </div>
    )
}

export default App;