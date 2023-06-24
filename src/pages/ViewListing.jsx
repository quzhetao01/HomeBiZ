import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import instance from "../axios.config";
import { AiFillStar } from "react-icons/ai";
import Modal from "react-modal";
import Gallery from "react-photo-gallery";
import ContactDetails from "../components/viewListing/ContactDetails";
import Menu from "../components/viewListing/Menu";
import ServiceModal from "../components/viewListing/ServiceModal";
import Review from "../components/viewListing/Review";
import ImageGallery from 'react-image-gallery';
import viewListingCSS from "../styles/viewListing.module.css"

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
        user: {}
    });
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
                    setListing(res.data);
                })
                .catch(err => console.log(err));

            
        }
    }, [location, submittingReview]);

    const averageRating = () => {
        let avg = 0;
        for (let i = 0; i < listing.reviews.length; i++) {
            avg += listing.reviews[i].rating;
        }
        avg = avg / listing.reviews.length;

        return (typeof avg === 'number' && isFinite(avg)) ? avg : '--';
    }

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
        const images = [listing.displayImage, ...listing.descriptionImages];
        const imgPromises = [];
        for (let i = 0; i < images.length; i++) {
            if (images[i]) {

                const imgPromise = instance.get(`/images/${images[i]}`).then(res => res.data);
                imgPromises.push(imgPromise);
            }
        }
        Promise.all(imgPromises).then(results => setImages(results.map(img => {
            return {
                original: img,
                thumbnail: img
            }
            // const image = new Image();
            // image.src = img;
            // let ratio = 0;
            // image.onload = () => {
            //     ratio = Math.floor(image.width * 10 / image.height)

            // }
            // return ({
            //     src: img,
            //     width: ratio,
            //     height: 10
            // })
        })));
    }, [listing])
    

    return <div className="container" style={{paddingTop: "10rem"}}>
        <div className="mb-4">
            <h1 className="mb-3">{listing.title}</h1> 
            <div style={{display: "flex", fontSize: 20}}>
                <div>
                <AiFillStar></AiFillStar> {`${averageRating()} - ${listing.reviews.length} reviews -`}   
                <span style={{textDecoration: "underline"}}>{listing.township}</span>, <span style={{textDecoration: "underline"}}> {listing.location}</span>
                </div>
                <div className="ms-auto">
                <h3>{listing.category}</h3>

                </div>
            </div>
        </div>
        <div className="row d-flex justify-content-center mt-5">
            <div className="">
                <div className={`mb-4 `}>
                    <ImageGallery items={images} />
                    {/* <Gallery photos={images}/> */}
                </div>
                <div className="row">

                    <div className="col-7">
                    <Menu menu={listing.menu} setServiceImage={setServiceImage}/>
                    </div>
                    <div className="col-5">
                        {listing.description }
                        <ContactDetails listing={listing}/>

                    </div>
                </div>
                {/* <hr /> */}
                <div className="mt-5">
                <Review id={listing._id} reviews={listing.reviews} setSubmittingReview={setSubmittingReview}/>

                </div>
            </div>
            
        </div> 
        {serviceImage && <ServiceModal isOpen={!!serviceImage} onRequestClose={() => setServiceImage("")} image={serviceImage}/>}
    </div>
}

export default ViewListing;