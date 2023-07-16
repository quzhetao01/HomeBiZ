import React from "react";
import { BsFillImageFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import styles from '../../styles/EditListing.module.css';
import ServiceModal from "../viewListing/ServiceModal";
import instance from "../../axios.config";

const MenuDetail = ({service, setServiceImage, setListing, setChangedFields}) => {
    const handleClick = () => {
        instance.get(`/images/${service.image}`).then(res => setServiceImage(res.data));
    }

    const deleteItem = (id) => {
        console.log(id);
        setListing(prev => {
            setChangedFields(prev2 => {
                const arr = prev2["menu"] ? [...prev2["menu"]]: [...prev.menu].map(item => item._id);
                
                return {
                    ...prev2,
                    "menu": arr.filter(item => item !== id)
                }
            })
            return {
                ...prev,
                "menu": [...prev.menu].filter(item => item._id !== id)
            }
        })
        
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
            <MdCancel className={`ms-5 ${styles.menuPrice}`} color="red" size={20} style={{marginTop: "3px"}} title="Delete"
                onClick={() => deleteItem(service._id)}/>
            </div>
        </div>
    </div>
}

export default MenuDetail