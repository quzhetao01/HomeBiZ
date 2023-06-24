import React from "react";
import viewListingCSS from "../../styles/viewListing.module.css"
import instance from "../../axios.config";

const Services = ({service, setServiceImage}) => {

    const handleClick = () => {
        instance.get(`/images/${service.image}`).then(res => setServiceImage(res.data));
        // setServiceImage(service.image);
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