import React from "react";
import Services from "./Services";

const Menu = ({menu, setServiceImage}) => {
    return <div className="card p-5">
        <h3 className="mb-5" style={{textAlign: "center"}}>Our Products and Services</h3>
        <div className="p-1 mt-2">
            {menu.map(item => <Services key={item.id} service={item} setServiceImage={setServiceImage}/>)}
        </div>
    </div>
}

export default Menu;