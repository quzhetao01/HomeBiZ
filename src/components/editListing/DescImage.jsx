import React from 'react';
import styles from '../../styles/EditListing.module.css';


const DescImage = (props) => {
    const deleteImage = () => {
        props.setListing(prev => {
            return {
                ...prev,
                "descriptionImages": [...prev.descriptionImages].filter(id => id !== props.image.id)
            }
        })
    }

    return <div style={{width: "180px", height: "180px"}} onDoubleClick={deleteImage}>
        <img src={props.image.url} alt="" className={styles.descImage}/>
    </div>
}

export default DescImage;