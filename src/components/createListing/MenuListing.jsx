import React, {useState} from "react";
import createListingCSS from "../../styles/createListing.module.css"

const MenuListing = (props) => {
    const [image, setImage] = useState();
    if (props.image) {

        const reader = new FileReader();
        reader.readAsDataURL(props.image)
        reader.onload = () => {
            setImage(reader.result);
        }
    }

    return <div className={`p-5 mb-3 ${createListingCSS.listingDiv}`}>
        <div style={{fontSize: 20}}>
            <p>Service Product: {props.name}</p>
            <p>Price:{props.price}</p>
        </div>
        {image && <img src={image} alt="" width={160} height={90}/>}
        {/* <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr>
                        <td><p>{props.name}</p></td>
                        <td><img src={props.image} alt="" width={160} height={90}/></td>
                        <td><p>{props.price}</p></td>
                    </tr>
                </tbody>
        </table> */}
    </div>
}

export default MenuListing;