import React, {useState} from "react";

const FileUpload = (props) => {
    return <div className="my-5">
        <form onChange={props.handleUpload}>

        <label htmlFor="formFile" className="form-label">{props.title}</label>
        <input className="form-control" type="file" id="formFile" multiple={props.multiple}  />
        </form>
    </div>
}

export default FileUpload;