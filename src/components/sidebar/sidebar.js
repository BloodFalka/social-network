import React from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';
import './sidebar.scss';

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  display: block;

  &+&{
    margin-top: 15px;
    }

  &:hover  {
    color: red;
  }
  &.active {
    color: red;
  }
`;

const Sidebar = () => {
    return(
        <nav className='nav'>
            <StyledLink to="/">Profile</StyledLink>
            <StyledLink to="/friends">Friends</StyledLink>
            <StyledLink to="/messages">Messages</StyledLink>
            <StyledLink to="/news">News</StyledLink>
            <StyledLink to="/music">Music</StyledLink>
            <br/>
            <StyledLink to="/settings">Settings</StyledLink>
        </nav>
    )
}

export default Sidebar;