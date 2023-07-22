import React, { useState, useEffect } from 'react';
import PopulateListings from '../components/populateListings/PopulateListings';
import PopulateListingsCSS from '../styles/PopulateListings.module.css'
import HomeCSS from '../styles/Home.module.css';
import getUser from '../helper/user';
import instance from '../axios.config';


const FavouriteListings = () => {

    const [listings, setListings] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {

        getUser().then(user => {
            setUser(user);
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
        <div className={`${HomeCSS.main}`}>
            <div className={HomeCSS.favs}>
                <h2>Your Favourite Listings</h2>
            </div>
            <div className='mt-4'>
                {listings && <PopulateListings listings={listings} user={user}/>}
            </div>
        </div>
        
     );
}
 
export default FavouriteListings;