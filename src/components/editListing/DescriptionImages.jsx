import React, { useState, useEffect } from 'react';
import MultipleFileUpload from '../createListing/MultipleFileUpload';
import DescImage from './DescImage';
import instance from '../../axios.config';
import { Button } from '@mui/material';
import Modal from 'react-modal';

const DescriptionImages = (props) => {
    const [images, setImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const imgPromises = [];
        for (const image of props.imageList) {
            const imgPromise = instance.get(`/images/${image}`).then(res => res.data);
            imgPromises.push(imgPromise);
        }
        Promise.all(imgPromises).then(result => {
            
            setImages(result.map((url, index) => {
                return {
                    url: url,
                    id: props.imageList[index]
                }
            }));
        })
    }, [props.imageList])

    const handleUpload = (files) => {
        if (files && files.length > 0 ) {
            setNewImages(prev => {
                return [...prev, ...files]
            })

        }
    }

    const handleDelete = (num) => {
        setNewImages(prev => {
            return [...prev.filter((img, index) => index !== num)];
        })
    }

    const handleConfirm = () => {
        console.log(newImages)
        setModal(true);
        const newImgPromises = [];
        for (const imageFile of newImages) {
            const formData = new FormData();
            formData.append("file", imageFile);
            newImgPromises.push(instance.post("/images", formData));
        }
        Promise.all(newImgPromises).then(results => {
            props.setChangedFields(prev => {
                return {
                    ...prev,
                    "descriptionImages": [...props.listing.descriptionImages, ...results.map(result => result.data)]
                }
            })
            setModal(false);
        })
    }

    return <div className="p-5">
        <div className='mb-5'>
            <h5 className='mb-4'>{`Current List of Images (Double-click on unwanted images to delete)`} </h5>
            <div>
                <div className="d-flex flex-wrap">
                {images.map((img, index) => <DescImage key={index} id={index} image={img} setChangedFields={props.setChangedFields} setListing={props.setListing}/>)}

                </div>
            </div>
        </div>
        <hr />
        <div className="mt-5">
            <h5 classname="mb-4">Add New Images</h5>
            <MultipleFileUpload edit handleUpload={handleUpload} handleDelete={handleDelete}/>
            <div className="d-flex justify-content-end">
                <Button className="align-self-center py-3 px-1" style={{width: "20%", backgroundColor: "#FF9F45"}} 
                    variant="contained" onClick={handleConfirm}>
                    Confirm New Images
                </Button>

            </div>

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
                    <div>

                        <p>
                            Please give us a short moment to confirm the new changes to images
                        </p>
                    </div>
                </div>
                
        </Modal>
    </div>
}

export default DescriptionImages;