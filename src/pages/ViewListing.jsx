import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import instance from "../axios.config";
import { AiFillStar } from "react-icons/ai";
import Modal from "react-modal";

import Menu from "../components/viewListing/Menu";
import ServiceModal from "../components/viewListing/ServiceModal";
import Review from "../components/viewListing/Review";
import ImageGallery from 'react-image-gallery';
import {FaWhatsappSquare, FaTelegram} from "react-icons/fa"

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

const ViewListing = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [images, setImages] = useState([
        // {
        //   original: 'https://picsum.photos/id/1018/1000/600/',
        //   thumbnail: 'https://picsum.photos/id/1018/250/150/',
        // },
        // {
        //   original: 'https://picsum.photos/id/1015/1000/600/',
        //   thumbnail: 'https://picsum.photos/id/1015/250/150/',
        // },
        // {
        //   original: 'https://picsum.photos/id/1019/1000/600/',
        //   thumbnail: 'https://picsum.photos/id/1019/250/150/',
        // },
      ]);
    const [listing, setListing] = useState({
        _id: "",
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
        menu: [],
        reviews: [],
        user: ""
    });
    const [reviews, setReviews] = useState([]);
    const [submittingReview, setSubmittingReview] = useState(false);
    const [serviceImage, setServiceImage] = useState("");


    

    useEffect(() => {
        console.log(location);
        
        const id = location.state ? location.state.id : null;
        if (id == null) {
            navigate('/');
        } else {

            instance.get(`/listing/${id}`)
                .then(res => {
                    console.log(res);
                    setListing(res.data)
                })
                .catch(err => console.log(err));

            
        }
    }, [location, submittingReview]);

    // useEffect(() => {
    //     const id = location.state ? location.state.id : null;
    //     if (id == null) {
    //         navigate('/');
    //     } else {
    //         instance.get(`/review/${id}`)
    //                 .then(res => {
    //                     console.log(res);
    //                     setReviews(res.data)
    //                 })
    //                 .catch(err => console.log(err));
    //     }
    // }, [submittingReview])

    useEffect(() => {
        setImages([listing.displayImage, ...listing.descriptionImages].map(img => {
            return {
                original: img,
                thumbnail: img
            };
        }))
    }, [listing])

    return <div className="container p-1">
        <div className="mb-4">
            <h1 className="mb-3">{listing.title}</h1> 
            <div style={{display: "flex", fontSize: 20}}>
                <div>
                <AiFillStar></AiFillStar> 5.00 - 20 reviews -   
                <span style={{textDecoration: "underline"}}>{listing.township}</span>, <span style={{textDecoration: "underline"}}> {listing.location}</span>
                </div>
                <div className="ms-auto">
                <h3>{listing.category}</h3>

                </div>
            </div>
        </div>
        <div className="row d-flex justify-content-between">
            <div className="col-7">
                <div className="mb-4">
                    <ImageGallery originalHeight={"10px"} originalWidth={"50%"} items={images} />
                </div>
                {/* <hr /> */}
                <div className="mt-5">
                <Review id={listing._id} reviews={listing.reviews} setSubmittingReview={setSubmittingReview}/>

                </div>
            </div>
            <div className="col-4">
                
                <div className="card p-4 mb-5">
                    <h3 className="mb-3">Contact Us!</h3>
                    <p>{"Business Owner(s): "} Zhetao and Stephen</p>
                    <div className="d-flex justify-content-between pe-5">
                        <span>Mobile Number: </span><span>{listing.contact} via {listing.contactMethod == 1 
                                    ? <FaWhatsappSquare onClick={() => window.location.href = "https://google.com"} color="green" />  
                                    : 2 ? <FaTelegram onClick={() => window.location.href = "https://google.com"} color="blue" />
                                    : ""}</span>
                    </div>
                    <div className="d-flex justify-content-between pe-5">
                        <span>Email: </span><span>{listing.email}</span>
                    </div>
                </div>
                <Menu menu={listing.menu} setServiceImage={setServiceImage}/>
                
                
            </div>
        </div> 
        {serviceImage && <ServiceModal isOpen={!!serviceImage} onRequestClose={() => setServiceImage("")} image={serviceImage}/>}
    </div>
}

export default ViewListing;