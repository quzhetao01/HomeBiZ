import React, { useState, useEffect } from 'react';
import instance from "../../axios.config";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import PopulateListingsCSS from '../../styles/PopulateListings.module.css'

//import ImageGallery from 'react-image-gallery';


const ListingPreview = ({ title, reviews, location, images, link }) => {
    
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/viewListing", {state: {id: `${link}`}});
    }

    const averageRating = () => {
        let avg = 0;
        for (let i = 0; i < reviews.length; i++) {
            console.log(reviews[i])
            avg += reviews[i].rating;
        }
        avg = avg / reviews.length;

        return (typeof avg === 'number' && isFinite(avg)) ? avg : '--';
    }
    

    return (
        <div className={`card border-light mx-3 ${PopulateListingsCSS.listing}`} onClick={handleClick}>
            
            <img src={ images[0] } className={`${PopulateListingsCSS.image}`} alt="thumbnail"/>
            <div className='d-flex mt-2'>
                <div className='mt-2 flex-grow-1'>
                    <h6>{title}</h6>
                </div>
                <div className="p-1">
                    <AiFillStar></AiFillStar>{averageRating()}  
                </div>   
            </div>
            <div className={PopulateListingsCSS.location}>
                {location}
            </div>
        </div>
        
    )
}
 
export default ListingPreview;