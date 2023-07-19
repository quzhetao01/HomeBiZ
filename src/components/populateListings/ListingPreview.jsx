import React, { useState, useEffect } from 'react';
import instance from "../../axios.config";
import axios from 'axios';
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import PopulateListingsCSS from '../../styles/PopulateListings.module.css';
import getUser from '../../helper/user';
import { GiAmpleDress, GiConsoleController } from "react-icons/gi";
// import { IoHeart } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import 'react-loading-skeleton/dist/skeleton.css';
import CardSkeleton from '../CardSkeleton';




//import ImageGallery from 'react-image-gallery';


const ListingPreview = ({ title, reviews, location, image, link, category, created }) => {
    
    const navigate = useNavigate();
    const [img, setImg] = useState("");
    const [toggleHeart, setToggleHeart] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    

    // let img = "";

    instance.get(`/images/${image}`).then(res => {
        setImg(res.data);
        setIsLoading(false);
    }).catch(err => console.log(err));

    const handleClick = () => {
        navigate("/viewListing", {state: {id: `${link}`}});
    }
    
    // load favourites
    useEffect(() => {
        console.log('useEffect ran');
        getUser().then(user => {
            const saved = user.favourites;
            saved.forEach(fav => {
                if (fav == link) {
                    setToggleHeart(!toggleHeart);
                }
            });
            
        })
    }, [])

    const handleHeartClick = (event) => {
        event.stopPropagation();
        setToggleHeart(!toggleHeart);
        console.log(toggleHeart);

        getUser().then(user => {
            console.log("userID: " + user._id);
            console.log("listingID: " + link);      
            const data = {
                id: link
            };
            if (!toggleHeart) {
                console.log('adding to favourites');
                instance.patch(`/favourites/${user._id}`, data)
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => console.log(err));
            } else {
                console.log('removing from favourites');
                instance.patch(`/removeFavourites/${user._id}`, data)
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => console.log(err));
            }
            
        })
        
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
            {isLoading && <CardSkeleton />}
            {!isLoading && <img src={img} className={`${PopulateListingsCSS.image}`} alt="loading..."/>}
            <div className="card-img-overlay">
                <FaHeart className={`${PopulateListingsCSS.heart}`} color={toggleHeart ? 'red' : 'grey' } size={45} onClick={handleHeartClick}/> 
            </div>
            <div className='d-flex mt-2 px-2'>
                <div className='mt-2 flex-grow-1'>
                    <h6>{title}</h6>
                    <div className={`${PopulateListingsCSS.location} mb-2`}>
                        {category}
                    </div>
                </div>
                <div className="p-1">
                    <div className="d-flex justify-content-end mb-2">
                        <AiFillStar className="mt-1"></AiFillStar>
                        {averageRating()}  
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