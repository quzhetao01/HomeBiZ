import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import viewListingCSS from "../../styles/viewListing.module.css"

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
    bodyOpenClassame={viewListingCSS.modal}
    style={{
        overlay: {
          zIndex: 1,
          margin: "auto",
          // width: "100%",
          // height: "100%",
          backgroundColor: "rgba(0,0,0,0.4)",
        },
        content: {
          backgroundColor: "black",
          height: `50%`,
          width: `50%`,
          margin: "auto",
          border: "#393E46",
        },
      }}>
        <div className="d-flex justify-content-around align-items-center">
            <img ref={imgRef} src={props.image} alt="" />
            {/* {i} */}
        </div>
    </Modal>
}

export default ServiceModal;