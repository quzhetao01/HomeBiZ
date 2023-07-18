import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import NavbarCSS from "../styles/Navbar.module.css";
import instance from '../axios.config';
import { ListItemSecondaryAction } from '@mui/material';

const Navbar = () => {
    const navigate = useNavigate();

    const handleMyBiz = () => {
        console.log("pressed");
        navigate("/viewListing", {state: {ownListing: true}})
    }

    const handleLogout = () => {
        console.log('logout');
        instance.post("/logout")
            .then(res => {
                console.log(res.data);
                navigate("/login");
            })
            .catch(err => console.log(err));
    }
    return (
        <div className={NavbarCSS.navbar}>  
            <div className="mx-5 p-5">
                <NavLink to='/'>
                    <img src='http://localhost:3000/homebiz-logo.png' alt="HomeBiZ logo" width={100} height={90}/>
                </NavLink>
            </div>
            <div className={`${NavbarCSS.links} pe-5`}>
                {/* <NavLink to='/createListing'>Create Listing</NavLink> */}
                <a className={`${NavbarCSS.btn}`} onClick={() => navigate('/createListing')}>Create Listing</a>
                <a className={`${NavbarCSS.btn}`} onClick={handleMyBiz}>View My Business</a>
                <a className={`${NavbarCSS.btn}`} onClick={() => navigate('/favouriteListings')}>View Favourites</a>
                <a className={`${NavbarCSS.btn}`} onClick={handleLogout}>Logout</a>
                {/* <NavLink onClick={handleMyBiz}>View My Business</NavLink> */}
                {/* <NavLink to='/login' onClick={handleLogout}>Logout</NavLink> */}
            </div>
        </div>
      );
}

export default Navbar;