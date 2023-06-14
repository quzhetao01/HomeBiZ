import React from "react";
import createListingCSS from "../../styles/createListing.module.css"

const MenuListing = (props) => {
    return <div className={`p-5 mb-3 ${createListingCSS.listingDiv}`}>
        <div style={{fontSize: 20}}>
            <p>Service Product: {props.name}</p>
            <p>Price:{props.price}</p>
        </div>
        {props.image && <img src={props.image} alt="" width={160} height={90}/>}
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