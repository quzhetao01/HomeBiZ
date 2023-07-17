import React, { useState, useEffect } from 'react';
import PopulateListings from '../components/populateListings/PopulateListings';
import PopulateListingsCSS from '../styles/PopulateListings.module.css'
import HomeCSS from '../styles/Home.module.css';
import getUser from '../helper/user';
import instance from '../axios.config';


const FavouriteListings = () => {

    const [listings, setListings] = useState([]);

    useEffect(() => {

        getUser().then(user => {
            
            const params = {
                favouritesArray: user.favourites
            };
            
            instance.get('/listing/saved/savedListings', { params })
                .then(res => {
                    console.log(res);
                    setListings(res.data);
                })
                .catch(err => console.log(err));

        })
    }, [])


    return (
        <div className={HomeCSS.main}>
            <h2>Your Favourite Listings</h2>
            <div>
                {listings && <PopulateListings listings={listings}/>}
            </div>
        </div>
        
     );
}
 
export default FavouriteListings;