import React from "react";
import viewListingCSS from "../../styles/viewListing.module.css"

const Services = ({service, setServiceImage}) => {

    const handleClick = () => {
        setServiceImage(service.image);
    }

    return <div className="d-flex justify-content-between mb-5">
        <div> 
            <p>{service.title}</p>
            {service.image && <p onClick={handleClick} className={viewListingCSS.serviceImg}>see image</p>}
        </div>
        <div>
            <p>${service.price}</p>
        </div>
    </div>
}

export default Services;