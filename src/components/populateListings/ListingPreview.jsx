import React, { useState, useEffect } from 'react';
import instance from "../../axios.config";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import PopulateListingsCSS from '../../styles/PopulateListings.module.css';
import { GiAmpleDress, GiConsoleController } from "react-icons/gi";
// import { IoHeart } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import 'react-loading-skeleton/dist/skeleton.css';
import CardSkeleton from "../CardSkeleton";




//import ImageGallery from 'react-image-gallery';


const ListingPreview = ({ title, reviews, location, image, link, category, created, user }) => {
    
    const navigate = useNavigate();
    const [img, setImg] = useState("");
    const [isFavourite, setIsFavourite] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userID, setUserID] = useState(user._id);

    

    // let img = "";

    instance.get(`/images/${image}`).then(res => {
        setImg(res.data);
        setIsLoading(false);
    }).catch(err => console.log(err));

    const handleClick = () => {
        navigate("/viewListing", {state: {id: `${link}`, saved: isFavourite, user: userID}});
    }
    
    // load favourites
    useEffect(() => {
        const saved = user.favourites;
        saved.forEach(fav => {
            if (fav == link) {
                setIsFavourite(true);
            }
        });
    }, []);

    const handleHeartClick = (event) => {
        event.stopPropagation();
        setIsFavourite(!isFavourite); 
        const data = {
            id: link
        };
        if (!isFavourite) {
            console.log('adding to favourites');
            instance.patch(`/favourites/${userID}`, data)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
        } else {
            console.log('removing from favourites');
            instance.patch(`/removeFavourites/${userID}`, data)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
        }
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
                <FaHeart className={`${PopulateListingsCSS.heart}`} color={isFavourite ? '#E3242B' : 'grey' } size={45} onClick={handleHeartClick}/> 
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