import React, {useState, useRef} from "react";
import StarRatings from "react-star-ratings";
import instance from "../../axios.config";
import { useNavigate } from "react-router-dom";

const AddReview = (props) => {
    const [rating, setRating] = useState(5);
    const [description, setDescription] = useState("");

    const handleSubmit =  () => {
        console.log("clicked");
        console.log(props.listing_id)
        const review = {
            rating: rating, 
            description: description, 
            listing: props.listing_id
        };
        instance.patch(`/listing/${props.listing_id}?review=true`, review)
            .then(res => {
                console.log(res.data);
                        
            })
            .catch(err => console.log(err))
    }

    return <div className="text-center">
            <h3 className="mb-3">Rate and Review</h3>
            <p>Share your experience to help the owner and other consumers!</p>
            <div className="">
                <div className="">
                    <div className="mb-3">
                        <p className="me-2">How was your experience?</p> 
                        <StarRatings
                        rating={rating} // The initial rating value
                        changeRating={setRating}
                        starRatedColor="orange" // Color of the selected stars
                        numberOfStars={5} // Total number of stars
                        starDimension="20px" // Size of the stars
                        starSpacing="2px" // Spacing between the stars
                        />
                        <textarea ref={props.reviewRef} reid="newReview" className="form-control mt-3" 
                        placeholder="Add your own review!" value={description} onChange={(e) => setDescription(e.target.value)}
                        onClick={() => props.setTyping(true)} rows={props.typing ? 5 : 2}></textarea>
                    </div>

                    
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={handleSubmit}>
                            Submit Review
                        </button>
                    </div>
                    <hr />

                </div>
            </div>
        </div>
}

export default AddReview;