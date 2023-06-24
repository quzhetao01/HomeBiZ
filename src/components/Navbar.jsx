import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import NavbarCSS from "../styles/Navbar.module.css";
import instance from '../axios.config';
import { ListItemSecondaryAction } from '@mui/material';

const Navbar = () => {


    const handleLogout = () => {
        console.log('logout');
        instance.post("/logout")
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }
    return (
        <nav>
            <div className={NavbarCSS.logo}>
                <NavLink to='/'>
                    <img src='http://localhost:3000/logo.png' alt="HomeBiZ logo" className='homebiz-logo'/>
                </NavLink>
            </div>
            <div className={NavbarCSS.links}>
                <NavLink to='/createListing'>Create Listing</NavLink>
                <NavLink to='/'>View My Business</NavLink>
                <NavLink to='/login' onClick={handleLogout}>Logout</NavLink>
            </div>
        </nav>
      );
}

export default Navbar;