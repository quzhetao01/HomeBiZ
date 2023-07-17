import React, {useState} from "react";
import RequiredIcon from "../RequiredIcon";

const Title = (props) => {

    return <div className="mb-3">
        <label htmlFor="title" className="form-label"><RequiredIcon /> Business Name</label>
        <input style={{width: "80%", backgroundColor: props.disabled ? "" : "#FFFBFB"}} type="email" className="form-control" id="title" placeholder="Title"
        value={props.title} onChange={e => props.handleChange(e.target.value)} disabled={props.disabled}/>
    </div>
}

export default Title;
