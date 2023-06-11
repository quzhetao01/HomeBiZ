import React from "react";
import createListingCSS from "../../styles/createListing.module.css"

const MenuListing = (props) => {
    return <div className={`p-5 mb-3 ${createListingCSS.listingDiv}`}>
        <p>{props.name}</p>
        <img src={props.image} alt="" width={160} height={90}/>
        <p>{props.price}</p>
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