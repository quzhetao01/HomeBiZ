import React, {useState} from "react";
import Modal from "react-modal";
import createListingCSS from "../../styles/CreateListing.module.css"
import FileUpload from "./FileUpload";
import MenuListing from "./MenuListing";
import MissingFields from "./MissingFields";
import { GrAdd } from "react-icons/gr";
import {MdAddBox} from "react-icons/md";

const CreateMenu = (props) => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [menu, setMenu] = useState([]);
    const [error, setError] = useState(false);

    const handleSubmit = () => {
        if (name === "" || price === "") {
            setError(true);
        } else {

            const listing = {
                title: name,
                price: price,
                image: image,
            };
            setMenu(prev => {
                return [...prev, listing];
            })
            setName("");
            setPrice("");
            setImage();
            
        }
        }

    const handleUpload = (event) => {
        setImage(event.target.files[0]);
        // if (event.target.files && event.target.files.length > 0 ) {
        //     const reader = new FileReader();
        //     reader.readAsDataURL(event.target.files[0])
        //     reader.onload = () => {
        //         setImage(reader.result);
        //     }
        // } else {
        //     setImage("");
        // }
    }

    const handleConfirm = () => {
        props.setListing(prev => {
            return {
                ...prev,
                ["menu"]: menu
            }
        })
        props.setIsOpen(false);
    }

    return <Modal
        isOpen={props.isOpen}
        onRequestClose={() => {
            setName("");
            setPrice("");
            setImage();
            props.onRequestClose()
        }}
        style={{
            overlay: {
              zIndex: 1,
              margin: "auto",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.4)",
            },
            content: {
              backgroundColor: "#D3756B",
              height: "50%",
              width: "50%",
              margin: "auto",
              border: "2px solid #393E46",
            },
          }}>
            <div>
                <h3 className="mb-5">Add your products and services here</h3>
                <div className={`p-3 ${createListingCSS.menuDiv}`}>
                    <div className={`me-5 ${createListingCSS.labels}`}>
                        <div>

                            <input className="form-control" type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
                            <input className="form-control" type="text" placeholder="price" value={price} onChange={(e) => setPrice(e.target.value)}/>
                        </div>
                    </div>
                    <FileUpload multiple={false} title={"An image that showcases your product or service"} handleUpload={handleUpload} />
                    <MdAddBox size={40} onClick={handleSubmit}/>
                </div>
                <hr />
                <h4>Menu</h4>
                <div className="p-5"> 
                    {menu.map((ls, index) => <MenuListing key={index} name={ls.title} price={ls.price} image={ls.image} />)}
                </div>
                <button className="btn btn-primary" onClick={handleConfirm}>Save</button>
                
            </div>
            <MissingFields isOpen={error} isRequestClose={setError} message={"Please fill in the price and name to save the menu listing"}/>

            
    </Modal>
}

export default CreateMenu