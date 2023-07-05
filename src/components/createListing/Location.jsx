import React from "react";
import RequiredIcon from "../RequiredIcon";

const Location = (props) => {
    return <div className="mb-3">
        <label htmlFor="location" className="form-label"><RequiredIcon /> {props.label}</label>
        <input style={{width: "80%", backgroundColor: "#FFFBFB"}} type="text" className="form-control" id="location" placeholder={props.placeholder}
        value={props.location} onChange={e => props.handleChange(e.target.value)}/>
    </div>
}

export default Location;