import React from "react";
import StarRatings from "react-star-ratings";

const SingleReview = () => {
    return <div className="card p-3 mb-3">
        <div className="mb-3" style={{display: "flex", justifyContent: "space-between"}}>
            <h6 className="mt-2">Random Person commented: </h6>
            <StarRatings
                rating={5} // The initial rating value
                starRatedColor="orange" // Color of the selected stars
                numberOfStars={5} // Total number of stars
                starDimension="20px" // Size of the stars
                starSpacing="2px" // Spacing between the stars
            />
        </div>
        <p>It is a long established fact that a reader will be distracted by the 
            readable content of a page when looking at its layout.
            The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>

    </div>
}

export default SingleReview;