import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import RequiredIcon from '../RequiredIcon';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


const MultipleFileUpload = (props) => {
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(prev => {
        return [...prev, ...acceptedFiles.map(file => Object.assign(file, {
                      preview: URL.createObjectURL(file)
                    })
                  )]
                  });
      console.log(acceptedFiles);
      props.handleUpload(acceptedFiles);
    }
  });
  
  const deleteImage = (num) => {
    setFiles(prev => {
      return [
        ...prev.filter((file, index) => index !== num)
      ]
    })
    props.handleDelete(num);
  }

  const thumbs = files.map((file, index) => (
    <div style={thumb} key={index} onDoubleClick={() => deleteImage(index)}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview)}}
          alt=""
        />
      </div>
    </div>
  ));


  return (
    <section className="mb-3">
        {!props.edit && <label className="mb-3"> <RequiredIcon /> Add more images to showcase your business!</label>}
        <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            borderWidth: 5,
            borderRadius: 10,
            borderColor: '#eeeeee',
            borderStyle: 'dashed',
            backgroundColor: '#fafafa',
            color: '#bdbdbd',
            outline: 'none',
            transition: 'border .24s ease-in-out'
            }} {...getRootProps({className: 'dropzone'})}>
        <input onChange={props.handleUpload} {...getInputProps()} accept="image/*"/>
        <p>Drag 'n' drop some images here, or click to select files. Delete images by double clicking on the</p>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </section>
  );
}

export default MultipleFileUpload;