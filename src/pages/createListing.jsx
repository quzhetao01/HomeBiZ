import React, { useEffect, useState } from 'react';
import instance from '../axios.config';
import getUser from '../helper/user';
// components
import Button from '@mui/material/Button'
import Title from '../components/createListing/Title';
import Description from '../components/createListing/Description';
import Location from '../components/createListing/Location';
import FileUpload from '../components/createListing/FileUpload';
import Carousel from '../components/createListing/Carousel';
import SelectCategory from '../components/createListing/SelectCategory';
import CreateMenu from '../components/createListing/CreateMenu';
import Contact from '../components/createListing/Contact';

//others
import categories from "../helper/category";
import { useNavigate } from 'react-router-dom';

const CreateListing = () => {

    useEffect(() => {
        getUser().then((user) => {
        
            console.log(user);
            if (user === null) {
              navigate("/login");
            }
          })
    }, []);

    const [listing, setListing] = useState({
        title: "",
        description: "",
        township: "",
        location: "",
        displayImage: "",
        descriptionImages: [],
        contact: "",
        contactMethod: "",
        email: "",
        category: "",
        menu: []
    });
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

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
        if (event.target.files && event.target.files.length > 0 ) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0])
            reader.onload = () => {
                setListing((prev) => {
                    return {
                        ...prev,
                        ["displayImage"]: reader.result
                    }
                })
            }
        } else {
            setListing(prev => {
                return {
                    ...prev,
                    ["displayImage"]: ""
                }
            })
        }
    }

    const handleDescImages = (event) => {
        if (event.target.files && event.target.files.length > 0 ) {
            console.log(event.target.files);
            for (let i = 0; i < event.target.files.length; i++) {
                const reader = new FileReader();
                reader.readAsDataURL(event.target.files[i])
                reader.onload = () => {
                    setListing((prev) => {
                        return {
                            ...prev,
                            ["descriptionImages"]: [...prev.descriptionImages, reader.result]
                        }
                    })
                }
            }
        } else {
            setListing(prev => {
                return {
                    ...prev,
                    ["descriptionImages"]: []
                }
            })
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
    }

    const handleNumber = (num) => {
        setListing((prev) => {
            return {
                ...prev,
                ["contact"]: num
            };
        }) 
    }

    const handleMethod = (method) => {
        setListing((prev) => {
            return {
                ...prev,
                ["contactMethod"]: method
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

    const handleSubmit = e => {
        instance.post("/listing", listing)
            .then(res => {
                console.log(res);
                navigate("/");
        })
    }

    return <div>
        <div className="row justify-content-evenly mt-5">
            <div className="card col-5 p-3" >
                <h3>Create your listing here</h3>
                    <Title handleChange={handleTitle} value={listing.title}/>
                    <Description handleChange={handleDescription} value={listing.description}/>
                    <Location handleChange={handleTownship} value={listing.township} label="Township" placeholder="Input your township here if applicable. Eg. Bedok"/>
                    <Location handleChange={handleLocation} value={listing.location} label="Address" placeholder="Address if applicable"/>
                    <div className="row my-5">

                        <div className="col-4">

                            <FileUpload multiple={false} handleUpload={handleTitleImage} title={"Select your display picture"}/>
                        </div>
                        <div className="col-8">
                            <img src={listing.displayImage} alt="" height={250} width={"auto"}/>
                        </div>
                    </div>
                    
                    <SelectCategory handleCategory={handleCategory} categories={categories}></SelectCategory>
                
            </div>
            <div className="card p-3 col-5 mb-3">
                <FileUpload multiple={true} handleUpload={handleDescImages} title={"Select other photos to show users your product or service"}/>
                <Carousel images={listing.descriptionImages}></Carousel>
                <Button style={{width: "50%"}} variant="contained" onClick={() => setShowMenu(true)}>Create menu</Button>
                <Contact listing={listing} handleNumber={handleNumber} handleMethod={handleMethod} handleEmail={handleEmail}/>
                <Button style={{width: "50%"}} variant="contained" onClick={handleSubmit}>Submit listing</Button>

            </div>
        </div>
        <CreateMenu 
            isOpen={showMenu}
            onRequestClose={() => setShowMenu(false)}
            setListing={setListing}
            setIsOpen={setShowMenu}
        />
    </div>
}

export default CreateListing;