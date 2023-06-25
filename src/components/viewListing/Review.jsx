import React, { useState, useRef, useEffect } from "react"
import SingleReview from "./SingleReview";
import AddReview from "./AddReview";
import { AiFillStar } from "react-icons/ai";


const Review = (props) => {
    const [typing, setTyping] = useState(false);
    const reviewRef = useRef(null);

    const handleClickOutside = (event) => {
        if (reviewRef.current && !reviewRef.current.contains(event.target)) {
            setTyping(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    },[])

    return <div className="card p-4 mb-5">
                <AddReview listing_id={props.id} typing={typing} setTyping={setTyping} reviewRef={reviewRef} setSubmittingReview={props.setSubmittingReview}/>
            <div className="">
                <p style={{fontSize: 20, fontWeight: 700}}>

                    <AiFillStar></AiFillStar> {`${props.averageRating} - ${props.reviews.length} reviews`} 
                </p>
                {props.reviews.map((review) => <SingleReview review={review}/>)}
            </div>
        </div>
}

export default Review;