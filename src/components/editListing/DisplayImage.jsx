import React, { useState, useEffect } from "react";
import instance from "../../axios.config";
import styles from '../../styles/EditListing.module.css';
import FileUpload from "../createListing/FileUpload";
import { Button } from "@mui/material";
import Modal from "react-modal"


const DisplayImage = (props) => {
    const [isPortrait, setIsPortrait] = useState(false);
    const [image, setImage] = useState("");
    const [imageFile, setImageFile] = useState();
    const [newImage, setNewImage] = useState("");
    const [modal, setModal] = useState(false);

    useEffect(() => {
        console.log(props.imageID)
        instance.get(`/images/${props.imageID}`).then(res => setImage(res.data));
    }, [props.imageID])

    const handleUpload = (event) => {
        
        if (event.target.files && event.target.files.length > 0 ) {
            setImageFile(event.target.files[0]);
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0])
            reader.onload = () => {
                setNewImage(reader.result);
            }
        } else {
            setNewImage("");
        }
    }

    const handleConfirm = () => {
        let formData = new FormData();
        formData.append("file", imageFile);
        instance.post('/images', formData)
            .then(res => {
                props.setChangedFields(prev => {
                    return {
                        ...prev,
                        "displayImage": res.data
                    }
                })
                setModal(true);
            })
        
    }

    return <div className="p-3"> 
        <div className="row mb-2 d-flex justify-content-around">
            <div className="col-5">
            <h5 className='mb-3'>Current Image</h5>
            <div className="d-flex justify-content-center">
            {image && <img src={image} width={isPortrait ? "50%" : "100%"} height="100%"/>}

            </div>

            </div>
            <div className="col-5">
                <div className='d-flex justify-content-between align-items-center'>
                    <h5 className='' style={{flex: 1}}>New Image</h5>
                    <form onChange={handleUpload}>
                        <input className="form-control" type="file" id="formFile" multiple={false} accept="image/*" style={{flex:2}}/>

                    </form>

                </div>
                {newImage && <div className={`${styles.previewContainer}`}>
                <div className="d-flex justify-content-center">
                    <img src={newImage} width={isPortrait ? "50%" : "100%"} height="100%"/>

                </div>
            </div>}
            </div>
        </div>
        <div className="d-flex justify-content-end">
        <Button className="py-2 px-1 me-5" style={{width: "10%", backgroundColor: "#FF9F45"}} 
            onClick={handleConfirm} variant="contained" >
            Confirm
        </Button>

        </div>
        <Modal
            isOpen={modal}
            onRequestClose={() => setModal(false)}
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
                    {imageFile ? <div>

                        <p>
                            Your image has been saved. 
                        </p>
                        <p>
                        You can continue to edit other sections.
                        </p>
                    </div> : <div>
                        No new image was selected
                    </div>}
                </div>
                
        </Modal>

    </div>
}

export default DisplayImage;