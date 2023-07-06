import React from "react";
import StarRatings from "react-star-ratings";

const SingleReview = ({review}) => {
    console.log(review);
    console.log(review.created_by_id)
    const name = review.created_by_id.firstName + " " + review.created_by_id.lastName;
    return <div className="card p-3 mb-3">
        <div className="mb-3" style={{display: "flex", justifyContent: "space-between"}}>
            <h6 className="mt-2">{name} commented: </h6>
            <StarRatings
                rating={review.rating} // The initial rating value
                starRatedColor="orange" // Color of the selected stars
                numberOfStars={5} // Total number of stars
                starDimension="20px" // Size of the stars
                starSpacing="2px" // Spacing between the stars
            />
        </div>
        <p>{review.description}</p>

    </div>
}

export default SingleReview;