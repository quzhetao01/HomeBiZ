import React from "react";
import Modal from "react-modal";
import ReactLoading from "react-loading";

const LoadingModal = (props) => {
    return <Modal 
    isOpen={props.isOpen}
    onRequestClose={props.onRequestClose}
    shouldCloseOnOverlayClick={false}
    style={{
        overlay: {
        zIndex: 1,
        margin: "auto",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.4)",
        
        },
        content: {
        backgroundColor: "white",
        height: "70%",
        width: "70%",
        margin: "auto",
        border: "transparent",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        // zIndex: 1500,
        marginTop: "7rem"
        },
    }}>
        <div className="d-flex flex-column align-items-center justify-content-around">
            <ReactLoading type="spokes" color="#FF9F45" height="60%" width="60%"/>
            <div className="text-center">

            <p className="mb-0">The submitting process might take up to a minute.</p>
            <p>Please stay on this page and wait patiently. Thank you!</p>
            </div>
        </div>
    </Modal>
}

export default LoadingModal;