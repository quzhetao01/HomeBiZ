import React, { useEffect, useState } from 'react';
import instance from '../axios.config';
import getUser from '../helper/user';
// components
import Button from '@mui/material/Button'
import Title from '../components/createListing/Title';
import Description from '../components/createListing/Description';
import Location from '../components/createListing/Location';
import DisplayImage from '../components/editListing/DisplayImage';
import DescriptionImages from '../components/editListing/DescriptionImages';
import FileUpload from '../components/createListing/FileUpload';
import SelectCategory from '../components/createListing/SelectCategory';
import CreateMenu from '../components/createListing/CreateMenu';
import Contact from '../components/createListing/Contact';
import MultipleFileUpload from '../components/createListing/MultipleFileUpload';
import Modal from "react-modal";
import { TbAlertCircleFilled } from "react-icons/tb";
import AccordionItem from '../components/editListing/AccordionItem'
import AddService from '../components/editListing/AddService';

//others
import categories from "../helper/category";
import { useNavigate, useLocation } from 'react-router-dom';
import styles from "../styles/EditListing.module.css"

const EditListing = () => {
    const [listing, setListing] = useState({
        id: "",
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

    const [changedFields, setChangedFields] = useState({});

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            console.log(location.state);

            setListing(location.state.listing);
        }
    }, [])

    const handleTitle = (title) => {
        setListing((prev) => {
            return {
                ...prev, 
                ["title"]: title
            }
        })
        setChangedFields((prev) => {
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
        setChangedFields((prev) => {
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
        setChangedFields((prev) => {
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
        setChangedFields((prev) => {
            return {
                ...prev, 
                ["location"]: loc
            }
        })
    }

    const handleNumber = (num) => {
        setListing((prev) => {
            return {
                ...prev,
                ["contact"]: num
            };
        }) 
        setChangedFields((prev) => {
            return {
                ...prev,
                ["contact"]: num
            };
        }) 
    }

    const handleMethod = (method) => {
        let contactMethod = '';
        if (method == 1) {
            contactMethod = 'whatsapp';
        } else {
            contactMethod = 'telegram';
        }
        const tmp = listing[contactMethod];
        setListing((prev) => {
            return {
                ...prev,
                [contactMethod]: !prev[contactMethod]
            };
        }) 
        setChangedFields((prev) => {
            return {
                ...prev,
                [contactMethod]: !tmp
            };
        }) 
    }


    const handleEmail = (email) => {
        setListing((prev) => {
            return {
                ...prev,
                "email": email
            };
        }) 
        setChangedFields((prev) => {
            return {
                ...prev,
                "email": email
            };
        }) 
    }

    const handleSubmit = () => {
        console.log(listing);
        console.log(changedFields);
        instance.patch(`/listing/${listing._id}`, changedFields)
            .then(res => {
                console.log(res);
                navigate("/");
            })
            .catch(err => console.log(err));
    }

    return <div className={`${styles.accordian}`} style={{padding: "15rem"}}>
        <h1 className='mb-5' style={{}}>Edit Listing</h1>
        <div class="accordion mb-5" id="accordionFlushExample">
            <AccordionItem title='Title and Description' id='One'>
                <Title handleChange={handleTitle} title={listing.title} />
                <Description handleChange={handleDescription} value={listing.description} />
            </AccordionItem>
            <AccordionItem title='Location Details' id='Two'>
                <Location handleChange={handleTownship} location={listing.township} label="Township" placeholder="Input your township here if applicable. Eg. Bedok"/>
                <Location handleChange={handleLocation} location={listing.location} label="Address" placeholder="Address if applicable"/>
            </AccordionItem>
            <AccordionItem title='Display Image' id='Three'>
                <DisplayImage setChangedFields={setChangedFields} imageID={listing.displayImage}/>
            </AccordionItem>
            <AccordionItem title='Description Images' id='Four'>
                <DescriptionImages setListing={setListing} setChangedFields={setChangedFields} imageList={listing.descriptionImages} listing={listing}/>
            </AccordionItem>
            <AccordionItem title='Menu' id='Five'>
                <AddService menu={listing.menu} setListing={setListing} setChangedFields={setChangedFields} listingID={listing._id}/>

            </AccordionItem>
            <AccordionItem title='Display Contact Details' id='Six'>
                <Contact listing={listing} handleNumber={handleNumber} handleMethod={handleMethod} handleEmail={handleEmail} edit/>

            </AccordionItem>
        </div>
        <div className='d-flex justify-content-end'>
            <Button className="align-self-center py-3 px-1" style={{width: "20%", backgroundColor: "#FF9F45"}} variant="contained" onClick={handleSubmit}>Confirm Edits</Button>

        </div>
    </div>
}

export default EditListing;