import React, {useState} from "react";
import RequiredIcon from "../RequiredIcon";

const Description = (props) => {
    // const [description, setDescription] = useState("");
    // const handleText = (e) => setDescription(e.target.value);

    return <div className="mb-3">
        <label htmlFor="description" className="form-label"> <RequiredIcon /> Business Description</label>
        <textarea className="form-control" id="description" rows="5" placeholder="Introduce and Describe your business here"
        value={props.value} onChange={e => props.handleChange(e.target.value)} disabled={props.disabled}>

        </textarea>
    </div>
}

export default Description;