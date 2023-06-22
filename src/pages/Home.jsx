import React, {useEffect} from "react";
import { useNavigate } from "react-router";
import instance from "../axios.config";
import getUser from "../helper/user";


const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        getUser().then(user => {
            if (!user) {
                navigate("/login");
            }
        })
    }, []);


    return <div>
        <button onClick={() => navigate("/createListing")}>Add Page</button>
        <button onClick={() => navigate("/viewListing", {state: {id: "64916970ef2179e218e9eadd"}}) }>View Listing Page</button>

    </div>
}

export default Home;