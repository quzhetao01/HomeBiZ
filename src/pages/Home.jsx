import React, {useEffect} from "react";
import instance from "../axios.config";


const Home = () => {
    useEffect(() => {
        instance.get('/test')
            .then((res) => {
                console.log(res);
            })
    });

    return <div style={{backgroundColor: "red"}}>
        <p>Home</p>
    </div>
}

export default Home;