import React, {useEffect} from "react";
import { useNavigate } from "react-router";
import instance from "../axios.config";


const Home = () => {
    const navigate = useNavigate();
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


    return <div style={{backgroundColor: "red"}}>
        <p>Home</p>
        <button onClick={() => navigate("/createListing")}>Add Page</button>
        <button onClick={() => navigate("/viewListing", {state: {id: "648ecfa12f58d7b0dfa4c2c9"}}) }>View Listing Page</button>

    </div>
}

export default Home;