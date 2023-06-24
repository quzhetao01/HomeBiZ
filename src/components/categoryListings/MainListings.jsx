import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import instance from '../../axios.config';
import PopulateListings from '../populateListings/PopulateListings';


const MainListings = (props) => {
       
    return (
        <PopulateListings listings={props.listings}/>
      )
}



 
export default MainListings;