import React, {useState} from "react";

const Title = (props) => {

    return <div className="mb-3">
        <label htmlFor="title" className="form-label">Business Name</label>
        <input style={{width: "80%", backgroundColor: "#FFFBFB"}} type="email" className="form-control" id="title" placeholder="Title"
        value={props.title} onChange={e => props.handleChange(e.target.value)}/>
    </div>
}

export default Title;
