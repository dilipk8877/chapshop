import React, { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

const SharingDragzone = ({sharingImage,setSharingImage}) => {

    const onDrop = useCallback((acceptedFiles,rejectedFiles)=>{
        setSharingImage(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
          })));
    },[])

    useEffect(()=>{
    //  sharingImage.forEach(file => URL. revokeObjectURL (file.preview));
    },[sharingImage])
    const {getRootProps,getInputProps,isDragAccept} = useDropzone({onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': []
          },
          maxFiles:5
        })
  return (
    <div className='dropzone' {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragAccept?"Drag Active":"You can drop your file here."}
    </div>
  )
}

export default SharingDragzone