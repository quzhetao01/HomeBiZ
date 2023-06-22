import React, { useState, useEffect } from 'react';
import instance from "../axios.config";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
//import ImageGallery from 'react-image-gallery';


const ListingPreview = ({ title, reviews, location, images, link }) => {
    
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/viewListing", {state: {id: `${link}`}});
    }


    return (
        <div className='card col-2' onClick={handleClick}>
            <img src={ images[0] } alt="thumbnail" height='350px'/>
            <div className='d-flex'>
                <div className='p-1 flex-grow-1'>
                    <h6>{title}</h6>
                </div>
                <div className="p-1">
                    <AiFillStar></AiFillStar>4.95    
                </div>   
            </div>
            <div className='p-1'>
                {location}
            </div>
        </div>
        
    )
}
 
export default ListingPreview;