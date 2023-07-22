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

            if (user === "No user found") {
                console.log("navigating you back login page because user is not found", user);
                navigate("/login");
            } else if (!user.category) {
                console.log("user has no selected category. redirecting to selectInterests page");
                navigate("/selectInterests", {state: {justRegistered: true, id: user._id, loggedIn: true}});
            } else {
                console.log("hello this is the user: ", user);
    
                instance.get('/listing')
                .then(res => {
                    console.log(res);
                    setListings(res.data);
                }).catch(err => console.log(err));
            // instance.get('/listing/explore/newListings')
            //     .then(res => {
            //         console.log(res);
            //         setNewListings(res.data);
            //     }).catch(err => {
            //         console.log(err)
            //         navigate("/login");
            //     });
            // }).catch(err => {
            //     navigate("/login");
            }

            
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