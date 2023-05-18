import React from "react";

const LoginInput = ({type, value, onChange}) => {
    return <div className="form-floating">
        <input type={type} className="form-control" value={value} onChange={onChange}/>
        <label>{type}</label>
    </div>
}

export default LoginInput;
