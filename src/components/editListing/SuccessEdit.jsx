import React from "react";
import Modal from "react-modal";

const SuccessEdit = (props) => {
    return <Modal
    isOpen={props.isOpen}
    onRequestClose={props.onRequestClose}
    shouldCloseOnOverlayClick={false}
    style={{
        overlay: {
          zIndex: 10,
          margin: "auto",
          backgroundColor: "rgba(0,0,0,0.4)",
        },
        content: {
          backgroundColor: "white",
          height: `40%`,
          width: `35%`,
          margin: "auto",
          border: "#393E46",
          borderRadius: "15px",
          padding: 0,
        },
      }}>
        <div className='d-flex flex-column justify-content-center align-items-center w-100 h-100 text-center'>
                    <div>
                        <p>
                            Your business listing is successfully updated.
                        </p>
                        <p>
                            We will redirect you back to the home page shortly
                        </p>
                    </div>
                </div>
    </Modal>

}

export default SuccessEdit;