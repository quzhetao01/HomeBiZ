import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import instance from "../axios.config";
import ListingPreview from "../components/ListingPreview";


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
            console.log('useEffect listings ran');
            console.log(res.data);
            setListings(res.data);
        }).catch(err => console.log(err));
    }, []);

    return <div>
        <div>
            {listings && <ListingPreview title={listings[1].title} reviews={listings[1].reviews} 
                                         location={listings[1].township} images={listings[1].descriptionImages} link={listings[1]._id} />}
        </div>
    </div>
}

export default Home;