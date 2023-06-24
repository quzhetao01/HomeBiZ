import React from "react";
import {FaWhatsappSquare, FaTelegram} from "react-icons/fa"

const ContactDetails = ({listing}) => {
    return <div className="card p-4 mb-5">
                <h3 className="mb-3">Contact Us!</h3>
                <div className="d-flex justify-content-between pe-5">
                    <span>Business Owner(s): </span>
                    <span>{`${listing.user.username}`}</span>
                </div>
                <div className="d-flex justify-content-between pe-5">
                    <span>Mobile Number: </span>
                    <span>{listing.contact} via {listing.contactMethod == 1 
                                ? <FaWhatsappSquare onClick={() => window.location.href = "https://google.com"} color="green" />  
                                : 2 ? <FaTelegram onClick={() => window.location.href = "https://google.com"} color="blue" />
                                : ""}</span>
                </div>
                <div className="d-flex justify-content-between pe-5">
                    <span>Email: </span><span>{listing.email}</span>
                </div>
            </div>
}

export default ContactDetails;