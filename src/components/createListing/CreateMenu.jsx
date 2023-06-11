import React, {useState} from "react";
import Modal from "react-modal";
import createListingCSS from "../../styles/createListing.module.css"
import FileUpload from "./FileUpload";
import MenuListing from "./MenuListing";
import { GrAdd } from "react-icons/gr";
import {MdAddBox} from "react-icons/md";

const CreateMenu = (props) => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [menu, setMenu] = useState([]);

    const handleSubmit = () => {
        const listing = {
            title: name,
            price: price,
            image: image,
        };
        setMenu(prev => {
            return [...prev, listing];
        })

    }

    const handleUpload = (event) => {
        if (event.target.files && event.target.files.length > 0 ) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0])
            reader.onload = () => {
                setImage(reader.result);
            }
        }
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
        onRequestClose={props.onRequestClose}
        style={{
            overlay: {
              zIndex: 10000,
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

                        <input className="form-control" type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
                        <input className="form-control" type="text" placeholder="price" value={price} onChange={(e) => setPrice(e.target.value)}/>
                    </div>
                    <FileUpload multiple={false} title={"An image that showcases your product or service"} handleUpload={handleUpload} />
                    <MdAddBox size={40} onClick={handleSubmit}/>
                </div>
                <hr />
                <h4>Menu</h4>
                {menu.map((ls, index) => <MenuListing key={index} name={ls.title} price={ls.price} image={ls.image} />)}
                <button className="btn btn-primary" onClick={handleConfirm}>Save</button>
                
            </div>
    </Modal>
}

export default CreateMenu