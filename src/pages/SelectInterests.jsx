import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { categoriesWithImage } from "../helper/category";
import instance from "../axios.config";

//styles
import RegisterCSS from "../styles/Register.module.css"

// components
import { AiOutlineArrowRight } from "react-icons/ai";
import WarningModal from "../components/WarningModal";


const SelectInterests = () => {
    const [selected, setSelected] = useState("");
    const [error, setError] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state) {
            console.log(location.state);
            // setUserInfo(location.state.userInfo);
        } else {
            navigate("/")
        }
    }, [])

    // const selectCategory = (name) => {
    //     setUserInfo(prev => {
    //         return {
    //             ...prev,
    //             ["category"]: name,
    //         }
    //     })
    // }


    const handleSubmit = () => {
        if (selected === "") {
            setError(true);
        } else {
            instance.patch(`/addInterest/${location.state.id}`, {category: selected})
                .then(res => {
                    console.log(res);
                        navigate("/login", {state: {justRegistered: true, loggedIn: location.state.loggedIn}});
                }).catch(err => {
                    console.log(err);
                })
            
        }
    }

    return <div className="p-5" style={{paddingTop: "7rem", }}>
        <div className="d-flex flex-column align-items-center">
            <h2 className="my-3">Before we continue, pick an interest!</h2>
            <div className="container row d-flex flex-wrap">
                {categoriesWithImage.map((c, index) => <div className={`card col-5 m-5 p-0 ${RegisterCSS.category} ${selected === c.name ? RegisterCSS.selectedCategory : ""}`} 
                    style={{overflow: "hidden"}} onClick={() => setSelected(c.name)} key={index}>

                    <img src={c.image} width="100%" height={500} alt="" />
                    <div className="text-center py-5">
                        <h5>{c.name}</h5>
                    </div>
                </div>)}
        
                <div className="d-flex justify-content-end">
                    <button className='btn me-3 p-3 ' style={{backgroundColor: "#FF9F45"}} onClick={handleSubmit}>
                        <AiOutlineArrowRight size={30} color="white" title="Continue"/>
                    </button>
                </div>
            </div>
            
        </div>
        <WarningModal isOpen={error} onRequestClose={() => setError(false)}
            message={"Please select a category"}/>
    </div>
}

export default SelectInterests;