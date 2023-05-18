import React from "react";
import LoginInputCSS from "../styles/LoginInput.module.css"

const LoginInput = ({type, value, onChange}) => {
    return <div className="form-floating">
        <input placeholder="" type={type} className="form-control" value={value} onChange={onChange}/>
        <label>{type}</label>
    </div>
    
}

export default LoginInput;
