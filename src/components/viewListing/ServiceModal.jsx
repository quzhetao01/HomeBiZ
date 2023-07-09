import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import ViewListingCSS from "../../styles/ViewListing.module.css"

const ServiceModal = (props) => {
    // const i = new Image();
    // i.onload = function(){
    //   alert(i.width + ", " + i.height);
    // };
    // i.src = props.image;
    const [dimensions, setDimensions] = useState({
      width: 100,
      height: 100,
    })
    const imgRef = useRef(null);
    return <Modal 
    isOpen={props.isOpen}
    onRequestClose={props.onRequestClose}
    bodyOpenClassame={ViewListingCSS.modal}
    style={{
        overlay: {
          zIndex: 10,
          margin: "auto",
          backgroundColor: "rgba(0,0,0,0.4)",
        },
        content: {
          backgroundColor: "black",
          height: `50%`,
          width: `50%`,
          margin: "auto",
          border: "#393E46",
          padding: 0,
        },
      }}>
        <div className={ViewListingCSS.imageContainer}>
            <img className={ViewListingCSS.image} ref={imgRef} src={props.image} alt="" />
            {/* {i} */}
        </div>
    </Modal>
}

export default ServiceModal;