import React from 'react';
import {Switch,Route,} from "react-router-dom";
import './main-content.scss';
import Profile from '../pages/profile';

const MainContent = () => {
    return(
        <div className='content'>
            <Switch>
                <Route path="/" exact component={Profile}/>
            </Switch>
            
        </div>
    )
}

export default MainContent;