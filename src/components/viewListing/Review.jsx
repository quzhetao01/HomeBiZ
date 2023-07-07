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
                {props.enableAddReview && <AddReview listing_id={props.id} typing={typing} setTyping={setTyping} reviewRef={reviewRef} setSubmittingReview={props.setSubmittingReview}/>}
            <div className="mt-3">
                <h4 className="text-center" style={{fontWeight: 700}}>See what other customers reviewed!</h4>
                <p style={{fontSize: 20, fontWeight: 700}}>

                    <AiFillStar></AiFillStar> {`${props.averageRating} | ${props.reviews.length} reviews`} 
                </p>
                {props.reviews.map((review, index) => {
                console.log(review);
                return <SingleReview key={index} review={review}/>})}
            </div>
        </div>
}

export default Review;