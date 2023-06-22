import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import instance from "../axios.config";
import PopulateListings from "../components/populateListings/PopulateListings";
import ListingPreview from "../components/populateListings/ListingPreview";


const Home = () => {
    const navigate = useNavigate();

    const [listings, setListings] = useState(null);

    useEffect(() => {
        instance.get('/test')
            .then((res) => {
                console.log(res);
            })
            .catch(err => {
                if (err.response.data === "Not authenticated") {
                    navigate("/login");
                }
            });
    }, []);

    useEffect(() => {
        instance.get('/listing')
        .then(res => {
            console.log(res);
            setListings(res.data);
        }).catch(err => console.log(err));
    }, []);

    return <div>
        <div className='default-listings'>
            {listings && <PopulateListings listings={listings}/>}
        </div>
    </div>
}

export default Home;