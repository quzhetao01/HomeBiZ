import React from "react";
import CarouselImg from "./CarouselImg";

const Carousel = (props) => {
    return <div id="carouselExampleControls" className="mb-5 carousel slide" data-bs-ride="carousel">
    <div className="carousel-inner">
        {props.images.map((url, index) => <CarouselImg key={index} imgURL={url}/>
        )}
        {/* <CarouselImg imgURL={"https://picsum.photos/id/237/200/300"}/> */}
    </div>
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
}

export default Carousel;