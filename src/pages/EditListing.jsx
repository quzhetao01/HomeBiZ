import React, { useEffect, useState } from 'react';
import instance from '../axios.config';
import getUser from '../helper/user';
// components
import Button from '@mui/material/Button'
import Title from '../components/createListing/Title';
import Description from '../components/createListing/Description';
import Location from '../components/createListing/Location';
import FileUpload from '../components/createListing/FileUpload';
import SelectCategory from '../components/createListing/SelectCategory';
import CreateMenu from '../components/createListing/CreateMenu';
import Contact from '../components/createListing/Contact';
import MultipleFileUpload from '../components/createListing/MultipleFileUpload';
import Modal from "react-modal";
import { TbAlertCircleFilled } from "react-icons/tb";

//others
import categories from "../helper/category";
import { useNavigate, useLocation } from 'react-router-dom';
import styles from "../styles/CreateListing.module.css"

const EditListing = () => {
    const [listing, setListing] = useState({
        title: "",
        description: "",
        township: "",
        location: "",
        displayImage: null,
        descriptionImages: [],
        contact: "",
        whatsapp: false,
        telegram: false,
        email: "",
        category: "",
        menu: []
    });
    const [displayImage, setDisplayImage] = useState("");
    const [showMenu, setShowMenu] = useState(false);

    return <div className='mb-5' style={{ minHeight: "100vh", paddingTop: "6.5rem", backgroundColor: "white"}}>
        <div>
            <div className="row justify-content-evenly pt-5" >
                <div className={`card col-5 p-5 ${styles.card}`}>
                    <h3 className="mb-3">Create your listing here</h3>
                        <Title handleChange={handleTitle} value={listing.title}/>
                        <Description handleChange={handleDescription} value={listing.description}/>
                        <Location handleChange={handleTownship} value={listing.township} label="Township" placeholder="Input your township here if applicable. Eg. Bedok"/>
                        <Location handleChange={handleLocation} value={listing.location} label="Address" placeholder="Address if applicable"/>
                        <hr />
                        <div className="row my-5">

                            <div className="col-4">

                                <FileUpload multiple={false} handleUpload={handleTitleImage} title={"Select your display picture"}/>
                            </div>
                            <div className="col-8">
                                <img src={displayImage} alt="" height={250} width={"auto"}/>
                            </div>
                        </div>
                        
                        <SelectCategory handleCategory={handleCategory} categories={categories}></SelectCategory>
                    
                </div>
                <div className={`card p-5 col-5 ${styles.card} d-flex justify-content-around`}>
                    <h3 className="">Further details</h3>
                    <MultipleFileUpload handleUpload={handleDescImages}/>
                    <hr />
                    
                    <Button className="align-self-center" style={{width: "50%", backgroundColor: "#FF9F45"}} variant="contained" onClick={() => setShowMenu(true)}>
                        Showcase your menu
                    </Button>
                    <hr />
                    <Contact listing={listing} handleNumber={handleNumber} handleMethod={handleMethod} handleEmail={handleEmail}/>
                    <Button className="align-self-center" style={{width: "50%", backgroundColor: "#FF9F45"}} variant="contained" onClick={handleSubmit}>Submit listing</Button>

                </div>
            </div>
            <CreateMenu 
                isOpen={showMenu}
                onRequestClose={() => setShowMenu(false)}
                setListing={setListing}
                setIsOpen={setShowMenu}
            />
            <Modal isOpen={!!error}
            onRequestClose={() => {
                setError("");
            }}
            style={{
                overlay: {
                zIndex: 1,
                margin: "auto",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.4)",
                
                },
                content: {
                backgroundColor: "#white",
                height: "40%",
                width: "30%",
                margin: "auto",
                border: "2px solid #393E46",
                borderRadius: "10px",
                },
            }}>
            <div className='d-flex flex-column justify-content-center align-items-center w-100 h-100'>
                <TbAlertCircleFilled color="#c70f2b" size={40} className="mb-3"/>
                <p>{error}</p>
            </div>
            </Modal>
        </div> 
</div>}

export default EditListing;