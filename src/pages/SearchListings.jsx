import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import instance from '../axios.config';
import CategoryListingsCSS from '../styles/CategoryListings.module.css'
import Categories from '../components/categoryListings/Categories';
import SearchBanner from '../components/searchListings/SearchBanner';
import SearchTitle from '../components/searchListings/SearchTitle';
import PopulateListings from '../components/populateListings/PopulateListings';
import getUser from '../helper/user';



const SearchListings = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [search, setSearch] = useState('')
    const [listings, setListings] =  useState([]);
    const [user, setUser] = useState();

    useEffect(() => {
        console.log(location);
        setSearch(location.state ? location.state.title : null);
    }, [location]);

    useEffect(() => {
        if (search == null) {
            navigate('/');
        } 
        
        if (search) {
            getUser().then(user => {
                console.log("user object", user);
                setUser(user);
                if (user === "No user found") {
                    navigate("/login");
                } else if (!user.category) {
                    navigate("/selectInterests", {state: {justRegistered: true, id: user._id, loggedIn: true}});
                }
            });
            instance.get(`/listing/search/${search}`)
            .then(res => {
                console.log(res);
                setListings(res.data);
            }).catch(err => {
                console.log(err);
            })
        }
    }, [search]);

    return (
        <div className={`${CategoryListingsCSS.main} mb-5`}>
            <div className={`${CategoryListingsCSS.button}`}>
                <Categories />
            </div>
            <SearchTitle searchName={search} numResults={listings.length}/>
            <SearchBanner />
            <hr className="my-5" />
            <div> 
                {listings && user && <PopulateListings listings={listings} user={user}/>}
            </div>
        </div>
      );
}
 

export default SearchListings;