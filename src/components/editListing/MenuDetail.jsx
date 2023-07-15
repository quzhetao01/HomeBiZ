import React from "react";
import { BsFillImageFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import styles from '../../styles/EditListing.module.css';
import ServiceModal from "../viewListing/ServiceModal";
import instance from "../../axios.config";

const MenuDetail = ({service, setServiceImage}) => {
    const handleClick = () => {
        instance.get(`/images/${service.image}`).then(res => setServiceImage(res.data));
    }

    return <div className="card mb-3">
        <div className='d-flex justify-content-between py-3 px-5'>
            <div className='d-flex'>
                <div>
                    {service.title}
                </div>
                {service.image && <BsFillImageFill className={`ms-5 ${styles.menuPrice}`} 
                    size={20} color="orange" title="View image of item" onClick={handleClick}/>}
            </div>
            <div className='d-flex'>

            <div>
                ${service.price}
            </div>
            <MdCancel className={`ms-5 ${styles.menuPrice}`} color="red" size={20} style={{marginTop: "3px"}} title="Delete"/>
            </div>
        </div>
    </div>
}

export default MenuDetail