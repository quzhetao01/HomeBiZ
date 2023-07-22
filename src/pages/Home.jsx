import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import instance from "../axios.config";
import PopulateListings from "../components/populateListings/PopulateListings";
import getUser from "../helper/user";
import HomeCSS from "../styles/Home.module.css";
import Categories from "../components/categoryListings/Categories";
import Searchbar from "../components/Searchbar";



const Home = () => {
    const navigate = useNavigate();

    const [listings, setListings] = useState(null);
    const [newListings, setNewListings] = useState(null);

    useEffect(() => {
        getUser().then(user => {
            console.log(user);
            if (user === "No user found") {
                navigate("/login");
            } else if (!user.category) {
                navigate("/selectInterests", {state: {justRegistered: true, id: user._id, loggedIn: true}});
            }
            instance.get('/listing')
            .then(res => {
                console.log(res);
                setListings(res.data);
            }).catch(err => console.log(err));
        instance.get('/listing/explore/newListings')
            .then(res => {
                console.log(res);
                setNewListings(res.data);
            }).catch(err => {
                console.log(err)
            });
        }).catch(err => {
            console.log(err);
        })
    }, []);


    return (
        <div className={`${HomeCSS.main}`}>
            <Categories />
            <Searchbar />
            <div className='default-listings pt-5'>
                {listings && <PopulateListings listings={listings} title="Explore these businesses" />}
            </div>
            <div className='default-listings pt-5'>
                {newListings && <PopulateListings listings={newListings} title="Check out new listings according to your interest" />}
            </div>
        </div>
    )
}

export default Home;