import React from "react";
import Modal from "react-modal";
import Icon from '@mdi/react';
import { mdiAlertCircle } from '@mdi/js';
import { GoAlertFill } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";

const MissingFields = (props) => {
    return <Modal isOpen={props.isOpen}
                    isRequestClose={props.isRequestClose}
                    style={{
                        overlay: {
                          zIndex: 2,
                          margin: "auto",
                          width: "50%",
                          height: "50%",
                          backgroundColor: "rgba(0,0,0,0.4)",
                        },
                        content: {
                          backgroundColor: "white",
                          height: "50%",
                          width: "50%",
                          margin: "auto",
                          border: "2px solid #393E46",
                        },
                      }}>
                        <div style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                        <span onClick={() => props.isRequestClose(false)} style={{alignSelf: "end"}}><RxCross1/></span>
                        <Icon path={mdiAlertCircle} size={1} />
                        <div className="mt-2 px-5" style={{textAlign: "center"}}>
                            

                            <p>{props.message}</p>
                        </div>
                        </div>
            
    </Modal>
}

export default MissingFields;