import React from "react";
import Modal from "react-modal"
import { TbAlertCircleFilled } from "react-icons/tb";
import { AiOutlineCheck } from "react-icons/ai";

const SuccessModal = (props) => {

    
    return <Modal isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            style={{
                overlay: {
                zIndex: 1,
                margin: "auto",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.4)",
                
            },
            content: {
                backgroundColor: "#white",
                height: "40%",
                width: "30%",
                margin: "auto",
                border: "2px solid #393E46",
                borderRadius: "10px",
                },
            }}>
            <div className='d-flex flex-column justify-content-center align-items-center w-100 h-100 text-center'>
                <AiOutlineCheck color="green" size={40} className="mb-3"/>
                {props.children}
            </div>
        </Modal>
}

export default SuccessModal;