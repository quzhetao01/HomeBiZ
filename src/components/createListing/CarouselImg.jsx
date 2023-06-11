import React from "react";

const CarouselImg = (props) => {
    return <div className="carousel-item active">
     <img src={props.imgURL} className="d-block w-100" alt="..."/>
  </div>
}

export default CarouselImg;