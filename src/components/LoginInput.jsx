import React from "react";
import LoginInputCSS from "../styles/LoginInput.module.css"

const LoginInput = ({type, value, onChange}) => {
    return <div className="form-floating mb-2">
        <input id={type} type={type} className="form-control" value={value} onChange={onChange}/>
        <label htmlFor={type}>{type}</label>
    </div>
    
}

export default LoginInput;
