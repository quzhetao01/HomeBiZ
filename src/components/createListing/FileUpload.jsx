import React, {useState} from "react";
import RequiredIcon from "../RequiredIcon";

const FileUpload = (props) => {
    return <div className={props.edit ? "mb-2" : "my-5"}>
        <form onChange={props.handleUpload}>

        <label htmlFor="formFile" className="form-label"> <RequiredIcon /> {props.title}</label>
        <input className="form-control" type="file" id="formFile" multiple={props.multiple} accept="image/*" ref={props.inputRef}/>
        </form>
    </div>
}

export default FileUpload;