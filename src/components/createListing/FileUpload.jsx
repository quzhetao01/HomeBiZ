import React, {useState} from "react";
import RequiredIcon from "../RequiredIcon";

const FileUpload = (props) => {
    return <div className="my-5">
        <form onChange={props.handleUpload}>

        <label htmlFor="formFile" className="form-label"> <RequiredIcon /> {props.title}</label>
        <input className="form-control" type="file" id="formFile" multiple={props.multiple}  />
        </form>
    </div>
}

export default FileUpload;