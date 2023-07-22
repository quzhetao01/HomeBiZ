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
import ViewListingCSS from "../styles/ViewListing.module.css"
import { AiFillEdit, AiFillDelete, AiFillHeart } from "react-icons/ai";
import WarningModal from "../components/WarningModal";
import SuccessModal from "../components/SuccessModal";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


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
    const [isLoading, setIsLoading] = useState(true);
    const [submittingReview, setSubmittingReview] = useState(false);
    const [serviceImage, setServiceImage] = useState("");
    const [ownListing, setOwnListing] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [successDelete, setSuccessDelete] = useState(false);
    const [isFavourite, setIsFavourite] = useState(false);
    const [userID, setUserID] = useState("");
    const [self, setSelf] = useState(false);


    useEffect(() => {
        console.log(location);
        if (location.state) {
            const id = location.state.id ? location.state.id : "self";
            if (id === "self") {
                setSelf(true);
            }
            setIsFavourite(location.state.saved);
            setUserID(location.state.user);
            instance.get(`/listing/${id}`)
            .then(res => {
                console.log("okay")
                console.log(res.data.listing);
                setListing(res.data.listing);
                setOwnListing(res.data.self);
            })
            .catch(err => console.log("err"));
            
        } else {
            navigate('/');
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
        if (listing) {
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
            })));
        
        }
    }, [listing])

    //tried to add timeout to give time for the images to load
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);


    const handleHeartClick = () => {
        setIsFavourite(!isFavourite);

        const data = {
            id: location.state.id
        };
        if (!isFavourite) {
            console.log('adding to favourites');
            instance.patch(`/favourites/${userID}`, data)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
        } else {
            console.log('removing from favourites');
            instance.patch(`/removeFavourites/${userID}`, data)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
        }
    }

    const handleEdit = () => {
        navigate('/editListing', {state: {listing: listing}});
    }

    const handleDelete = () => {
        instance.delete(`/listing/${listing._id}`)
            .then(res => {
                setSuccessDelete(true);
                setTimeout(() => {
                    setSuccessDelete(false);
                    navigate("/");
                }, 2000)
            })
    }
    

    return <div className="container" style={{paddingTop: "10rem"}}>


        {listing ? <div>
        <div className="mb-4">
            <div className="d-flex justify-content-between">
                <h1 className="mb-3">{listing.title}</h1> 
                <div>
                {!self ? <button className='btn me-3' style={{backgroundColor: "#FF9F45"}} onClick={handleHeartClick}>
                        <AiFillHeart size={30} color={isFavourite ? "#E3242B" : "white"} title="Save Listing"/>
                    </button> : <div>
                    <button className='btn me-3' style={{backgroundColor: "#FF9F45"}} onClick={handleEdit} data-testid="edit">
                        <AiFillEdit size={30} color="white" title="Edit Listing"/>
                    </button>
                    <button className='btn' style={{backgroundColor: "#FF9F45"}} onClick={() => setConfirmDelete(true)} data-testid="delete">
                        <AiFillDelete size={30} color="white" title="Delete Listing" />
                    </button>
                    </div>}
                </div>
            </div>
            <div style={{display: "flex", fontSize: 20}}>
                <div>
                    <AiFillStar/> {`${averageRating()} . ${listing.reviews.length} reviews .` + " "}   
                    <span style={{textDecoration: "underline"}}>{listing.township}</span>, <span style={{textDecoration: "underline"}}> {listing.location}</span>
                </div>
                <div className="ms-auto">
                    <h3>{listing.category}</h3>
                </div>
            </div>
            <hr />
        </div>
        <div className="row d-flex justify-content-center mt-5">
            <div className="">
                <div className={`mb-4 `}>
                    {isLoading && <Skeleton width={1296} height={800} />}
                    {!isLoading && <ImageGallery items={images} />}
                    {/* <Gallery photos={images}/> */}
                </div>
                <div className="row">

                    <div className="col-7">
                    <Menu menu={listing.menu} setServiceImage={setServiceImage}/>
                    </div>
                    <div className="col-5 d-flex justify-content-center" style={{flexDirection: "column"}}>
                        <div className="mb-5 text-center">
                            <h3 className='mb-3' style={{fontWeight: 700}}>Know more about our business!</h3>
                            {listing.description }
                        </div>
                        <ContactDetails listing={listing}/>

                    </div>
                </div>
                <hr />
                <div className="mt-5">
                <Review id={listing._id} reviews={listing.reviews} 
                setSubmittingReview={setSubmittingReview} averageRating={averageRating()}
                enableAddReview={!ownListing}/>

                </div>
            </div>
            
        </div> 
        {serviceImage && <ServiceModal isOpen={!!serviceImage} onRequestClose={() => setServiceImage("")} image={serviceImage}/>}
        </div> :
        <div className="d-flex flex-column align-items-center">
            <p>
                You have no listing of your own! Start your home business journey now by creating your own business listing now!
            </p>
            <div>

            <button style={{backgroundColor: "#FF9F45", color: "white"}} className="btn px-3 me-3"
                onClick={() => navigate('/')}>
                See other listings
            </button>
            <button style={{backgroundColor: "#FF9F45", color: "white"}} className="btn px-3 ms-3"
                onClick={() => navigate('/CreateListing')}>
                Create a new listing
            </button>
            </div>
        </div>}
        <WarningModal isOpen={confirmDelete} onRequestClose={() => setConfirmDelete(false)}>
            <div data-testid="confirmDelete">
                <p>Are you sure you want to delete?</p>
                <div className="d-flex justify-content-around mt-4">
                    <button style={{backgroundColor: "green", color: "white"}} className="btn px-3 me-3"
                        onClick={handleDelete}>
                        Confirm
                    </button>
                    <button style={{backgroundColor: "red", color: "white"}} className="btn px-3 ms-3"
                        onClick={() => setConfirmDelete(false)}>
                        Cancel
                    </button>
                </div>
            </div>
        </WarningModal>
        <SuccessModal isOpen={successDelete} onRequestClose={() => setSuccessDelete(false)}>
            <p>Your listing has been successfully deleted</p>
            <p>We will redirect you back to the home page shortly</p>
        </SuccessModal>
    </div>
}

export default ViewListing;