import React, { useState, useEffect } from 'react';
import instance from "../../axios.config";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import PopulateListingsCSS from '../../styles/PopulateListings.module.css'
import { GiAmpleDress } from "react-icons/gi"


//import ImageGallery from 'react-image-gallery';


const ListingPreview = ({ title, reviews, location, image, link, category, created }) => {
    
    const navigate = useNavigate();
    const [img, setImg] = useState("");

    // let img = "";

    instance.get(`/images/${image}`).then(res => {
        setImg(res.data);
    }).catch(err => console.log(err));

    const handleClick = () => {
        navigate("/viewListing", {state: {id: `${link}`}});
    }

    const averageRating = () => {
        let avg = 0;
        for (let i = 0; i < reviews.length; i++) {
            avg += reviews[i].rating;
        }
        avg = avg / reviews.length;

        return (typeof avg === 'number' && isFinite(avg)) ? avg.toFixed(2) : '--';
    }
    

    return (
        <div className={`card border-light me-4 ${PopulateListingsCSS.listing}`} onClick={handleClick}>
            
            <img src={img} className={`${PopulateListingsCSS.image}`} alt="thumbnail"/>
            <div className='d-flex mt-2 px-2'>
                <div className='mt-2 flex-grow-1'>
                    <h6>{title}</h6>
                    <div className={`${PopulateListingsCSS.location} mb-2`}>
                        {category}
                    </div>
                </div>
                <div className="p-1">
                    <div className="d-flex justify-content-end mb-2">
                        <AiFillStar className="mt-1"></AiFillStar>{averageRating()}  

                    </div>
                    <div className={`${PopulateListingsCSS.location} d-flex justify-content-end`}>
                        {created.split("T")[0]}
                    </div>
                </div>   
            </div>
            
        </div>
        
    )
}
 
export default ListingPreview;