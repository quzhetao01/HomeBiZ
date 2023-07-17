import React, { useState, useEffect, useRef } from 'react';
import FileUpload from '../createListing/FileUpload';
import styles from '../../styles/EditListing.module.css';
import MenuDetail from './MenuDetail';
import ServiceModal from '../viewListing/ServiceModal';
import { Button } from '@mui/material';
import instance from '../../axios.config';
import MissingFields from '../createListing/MissingFields';

const AddService = (props) => {
    
    const [image, setImage] = useState("");
    const [serviceImage, setServiceImage] = useState(""); //for Service Modal 
    const [isPortrait, setIsPortrait] = useState(false);
    // for the backend
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [imageFile, setImageFile] = useState();
    const [error, setError] = useState(false);
    const inputRef= useRef(null);

    useEffect(() => {
        const img = new Image();
        img.src = image;
        img.onload = () => {
          const { width, height } = img;
          setIsPortrait(height > width);
        };
      }, [image]);

    const handleUpload = (event) => {
        
        if (event.target.files && event.target.files.length > 0 ) {
            setImageFile(event.target.files[0]);
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0])
            reader.onload = () => {
                setImage(reader.result);
            }
        } else {
            setImage("");
        }
    }

    const addItem = () => {
        if (name === "" || price === "") {
            setError(true);
        } else {
            const item = {
                title: name,
                price: price,
            };
            if (imageFile) {

                let formData = new FormData();
                formData.append("file", imageFile);
                instance.post('/images', formData)
                .then(res => {
                    item.image = res.data;
                    instance.post(`/service/${props.listingID}`, item)
                    .then(res => {
                        console.log(res);
                        props.setListing(prev => {
                            return {
                                ...prev,
                                "menu": [
                                    ...prev.menu,
                                    res.data
                                ]
                            }
                        })
                            props.setChangedFields(prev => {
                                console.log("change1")

                                const arr = prev["menu"] ? [...prev["menu"]]: [...props.menu].map(item => item._id);
                                arr.push(res.data._id);
                                return {
                                    ...prev,
                                    "menu": arr 
                                }
                            })
                        })
                    })
                } else {
                    instance.post(`/service/${props.listingID}`, item)
                    .then(res => {
                        console.log(res);
                        props.setListing(prev => {
                            return {
                                ...prev,
                                "menu": [
                                    ...prev.menu,
                                    res.data
                                ]
                            }
                        })
                        props.setChangedFields(prev => {
                            console.log("change2")
                            const arr = prev["menu"] ? [...prev["menu"]]: [...props.menu].map(item => item._id);
                            arr.push(res.data._id);
                            console.log(arr);
                            return {
                                ...prev,
                                "menu": arr 
                            }
                        })
                    })
            }
            setName("");
            setPrice("");
            setImageFile();
            setImage("");
            inputRef.current.value = null;

        }
    }

    return <div>

        <div className='row d-flex justify-content-around'>
            <div className='col-5'>
                <div className='mb-2'>
                    <label className="form-label">New Menu Item</label>
                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className='mb-2'>
                    <label htmlFor="" className="form-label">Price in Dollars</label>
                    <input type="text" className="form-control" value={price} onChange={e => setPrice(e.target.value)}/>
                </div>
                <div className="mb-4" >
                <FileUpload multiple={false} title={"An image that showcases your product or service"} handleUpload={handleUpload} inputRef={inputRef} edit />
                </div>
                <Button className="py-3 px-1" style={{width: "40%", backgroundColor: "#FF9F45"}} variant="contained" onClick={addItem}>Add New Item</Button>

            </div>
            <div className={`col-6 ${styles.previewContainer}`}>
                <div className="d-flex justify-content-center">
                    {image && <img src={image} width={isPortrait ? "50%" : "100%"} height="100%"/>}

                </div>
            </div>
        </div>
        <hr/>
        <div className='p-4'>
            {props.menu.map((service, index) => <MenuDetail key={index} service={service} setServiceImage={setServiceImage}
                setListing={props.setListing} setChangedFields={props.setChangedFields}/>)}
        </div>
        {serviceImage && <ServiceModal isOpen={!!serviceImage} onRequestClose={() => setServiceImage("")} image={serviceImage}/>}
        <MissingFields isOpen={error} isRequestClose={setError} message={"Please fill in the price and name to add menu item"}/>
    </div>
}

export default AddService;