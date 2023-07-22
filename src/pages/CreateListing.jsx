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
import LoadingModal from '../components/LoadingModal';
import { TbAlertCircleFilled } from "react-icons/tb";

//others
import categories from "../helper/category";
import { useNavigate, useLocation } from 'react-router-dom';
import styles from "../styles/CreateListing.module.css"

const CreateListing = () => {

    
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
    const [hasListing, setHasListing] = useState(false);
    const [displayImage, setDisplayImage] = useState("");
    const [showMenu, setShowMenu] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setSubmitting] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        getUser().then((user) => {
            console.log(user);
            if (!user) {
              navigate("/login");
            }
            if (user.listing) {
                setHasListing(true);
            }
          });
        if (location.state) {

        }
    }, []);

    const handleTitle = (title) => {
        setListing((prev) => {
            return {
                ...prev, 
                ["title"]: title
            }
        })
    }
    const handleDescription = (desc) => {
        setListing((prev) => {
            return {
                ...prev, 
                ["description"]: desc
            }
        })
    }

    const handleTownship = (town) => {
        setListing((prev) => {
            return {
                ...prev, 
                ["township"]: town
            }
        })
    }

    const handleLocation = (loc) => {
        setListing((prev) => {
            return {
                ...prev, 
                ["location"]: loc
            }
        })
    }

    const handleTitleImage = (event) => {
        console.log(event.target.files);
        setListing((prev) => {
                    return {
                       ...prev, 
                        ["displayImage"]: event.target.files[0]
                    }
                })
        if (event.target.files && event.target.files.length > 0 ) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0])
            reader.onload = () => {
                setDisplayImage(reader.result);
            }
        } else {
            setListing(prev => {
                return {
                    ...prev,
                    ["displayImage"]: null
                }
            })
            setDisplayImage("");
        }
    }

    const handleDescImages = (files) => {
        if (files && files.length > 0 ) {
            setListing((prev) => {
                            return {
                              ...prev, 
                                "descriptionImages": [...prev.descriptionImages, ...files]
                            }
                        })
        } else {
            // setListing(prev => {
            //     return {
            //         ...prev,
            //         ["descriptionImages"]: []
            //     }
            // })
        }
    }
    
    const handleCategory = (category) => {
        setListing((prev) => {
            console.log(category);
            return {
                ...prev, 
                ["category"]: category
            };
        })
        console.log(listing);
    }

    const handleNumber = (num) => {
        console.log(listing);
        setListing((prev) => {
            return {
                ...prev,
                ["contact"]: num
            };
        }) 
    }

    const handleMethod = (method) => {
        console.log(method);
        let contactMethod = '';
        if (method == 1) {
            contactMethod = 'whatsapp';
        } else {
            contactMethod = 'telegram';
        }
        setListing((prev) => {
            return {
                ...prev,
                [contactMethod]: !prev[contactMethod]
            };
        }) 
    }


    const handleEmail = (email) => {
        setListing((prev) => {
            return {
                ...prev,
                ["email"]: email
            };
        }) 
    }


    const handleSubmit = async (e) => {
        setSubmitting(true);
        if (!listing.title || !listing.description || !listing.township || !listing.location 
            || !listing.displayImage || listing.descriptionImages.length == 0 
            || !listing.contact || !listing.whatsapp && !listing.telegram
            || !listing.email || !listing.category) {
                setError("Please fill in all the missing fields");
                return;
        } else if (listing.descriptionImages.length < 4) {
            setError("Please add more images for your future customers to refer to");
            return;
        }
        // console.log(listing.descriptionImages);
        let formData = new FormData();
        formData.append("file", listing.displayImage);

        // Upload display image
        instance.post("/images", formData)
        .then(res => {
            listing.displayImage = res.data;

            const descriptionImgPromises = [];
            const menuImgPromises = [];

            // Upload description images
            for (let i = 0; i < listing.descriptionImages.length; i++) {
                const formData2 = new FormData();
                formData2.append("file", listing.descriptionImages[i]);
                const descriptionImgPromise = instance.post("/images", formData2)
                    .then(res => res.data);
                descriptionImgPromises.push(descriptionImgPromise);
            }

            // Upload menu images
            for (let i = 0; i < listing.menu.length; i++) {
            if (listing.menu[i].image) {
                const formData3 = new FormData();
                formData3.append("file", listing.menu[i].image);
                const menuImgPromise = instance.post("/images", formData3)
                .then(res => res.data);
                menuImgPromises.push(menuImgPromise);
            }
            }

            // Wait for all image uploads to complete
            return Promise.all([...descriptionImgPromises, ...menuImgPromises]);
        })
        .then(results => {
            const descriptionImgIDs = results.slice(0, listing.descriptionImages.length);
            const menuImgIDs = results.slice(listing.descriptionImages.length);

            listing.descriptionImages = descriptionImgIDs;

            // Update menu image IDs
            let menuImgIndex = 0;
            for (let i = 0; i < listing.menu.length; i++) {
            if (listing.menu[i].image) {
                listing.menu[i].image = menuImgIDs[menuImgIndex];
                menuImgIndex++;
            }
            }

            // Send the `/listing` API request
            return instance.post("/listing", listing);
        })
        .then(res => {
            console.log(res);
            setSubmitting(false);
            navigate("/");
        })
        .catch(err => {
            console.log(err);
        });
    }

    return <div className='mb-5' style={{ minHeight: "100vh", paddingTop: "6.5rem", backgroundColor: "white"}}>
        {!hasListing ? <div>
            <div className="row justify-content-evenly pt-5" >
                <div className={`card col-5 p-5 ${styles.card}`}>
                    <h3 className="mb-3">Create your listing here</h3>
                        <Title handleChange={handleTitle} title={listing.title}/>
                        <Description handleChange={handleDescription} value={listing.description}/>
                        <Location handleChange={handleTownship} location={listing.township} label="Township" placeholder="Input your township here if applicable. Eg. Bedok"/>
                        <Location handleChange={handleLocation} location={listing.location} label="Address" placeholder="Address if applicable"/>
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
                    
                    <Button className="align-self-center" style={{width: "50%", backgroundColor: "#FF9F45"}} variant="contained" onClick={() => setShowMenu(true)} data-testid="menuButton">
                        Showcase your menu
                    </Button>
                    <hr />
                    <Contact listing={listing} handleNumber={handleNumber} handleMethod={handleMethod} handleEmail={handleEmail}/>
                    <Button className="align-self-center" style={{width: "50%", backgroundColor: "#FF9F45"}} variant="contained" onClick={handleSubmit} data-testid="submit">Submit listing</Button>

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
                <p data-testid="error">{error}</p>
            </div>
        </Modal>
        <LoadingModal isOpen={isSubmitting} onRequestClose={() => setSubmitting(false)}/>
        </div> : <div className="d-flex flex-column align-items-center m-5 p-5" data-testid="hasListing">
            <p>

            You have already created your own listing! 
            </p>
            <p>
            If you want to create a new listing,
            please delete your existing listing or you can make changes to your current listing under "View My Business"
            </p>
            <div>
                <button style={{backgroundColor: "#FF9F45", color: "white"}} className="btn px-3 me-3"
                    onClick={() => navigate('/')}>
                    See other listings
                </button>
                <button style={{backgroundColor: "#FF9F45", color: "white"}} className="btn px-3 ms-3"
                    onClick={() => navigate("/viewListing", {state: {ownListing: true}})}>
                    View My Business
                </button>
            </div>
        </div>}
    </div>
}

export default CreateListing;