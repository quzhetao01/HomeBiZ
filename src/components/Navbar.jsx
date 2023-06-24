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
        <div className={NavbarCSS.navbar}>  
            <div className="ms-5">
                <NavLink to='/'>
                    <img src='http://localhost:3000/homebiz-logo.png' alt="HomeBiZ logo" width={100} height={90}/>
                </NavLink>
            </div>
            <div className={NavbarCSS.links}>
                <NavLink to='/createListing'>Create Listing</NavLink>
                <NavLink to='/'>View My Business</NavLink>
                <NavLink to='/login' onClick={handleLogout}>Logout</NavLink>
            </div>
        </div>
      );
}

export default Navbar;