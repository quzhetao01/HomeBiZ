import React, {useEffect} from "react";
import { useNavigate } from "react-router";
import instance from "../axios.config";


const Home = () => {
    useEffect(() => {
        instance.get('/test')
            .then((res) => {
                console.log(res);
            })
    });

    const navigate = useNavigate();

    return <div style={{backgroundColor: "red"}}>
        <p>Home</p>
        <button onClick={() => navigate("/createListing")}>Add Page</button>
        <button onClick={() => navigate("/viewListing", {state: {id: "648ecfa12f58d7b0dfa4c2c9"}}) }>View Listing Page</button>

    </div>
}

export default Home;