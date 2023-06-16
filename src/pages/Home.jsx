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

    return <div>
        <button onClick={() => navigate("/createListing")}>Add Page</button>
    </div>
}

export default Home;