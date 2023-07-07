import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import instance from '../axios.config';
import CategoryListingsCSS from '../styles/CategoryListings.module.css'
import Categories from '../components/categoryListings/Categories';
import SearchBanner from '../components/searchListings/SearchBanner';
import SearchTitle from '../components/searchListings/SearchTitle';
import PopulateListings from '../components/populateListings/PopulateListings';



const SearchListings = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [search, setSearch] = useState('')
    const [listings, setListings] =  useState([]);

    useEffect(() => {
        console.log(location);
        setSearch(location.state ? location.state.title : null);
    }, [location]);

    useEffect(() => {
        if (search == null) {
            navigate('/');
        } 
        
        if (search) {
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
            <Categories />
            <SearchTitle searchName={search} numResults={listings.length}/>
            <SearchBanner />
            <hr className="my-5" />
            <div> 
                {listings && <PopulateListings listings={listings}/>}
            </div>
        </div>
      );
}
 

export default SearchListings;