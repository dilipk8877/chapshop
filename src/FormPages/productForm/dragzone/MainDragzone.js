import React, { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

const MainDragzone = ({setMainImage,mainImage}) => {

    const onDrop = useCallback((acceptedFiles,rejectedFiles)=>{
        setMainImage(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
          })));
    },[])

    useEffect(()=>{
    //  mainImage.forEach(file => URL. revokeObjectURL (file.preview));
    },[mainImage])
    const {getRootProps,getInputProps,isDragAccept} = useDropzone({onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': []
          },
          maxFiles:1
        })
  return (
    <div className='dropzone' {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragAccept?"Drag Active":"You can drop your file here."}
    </div>
  )
}

export default MainDragzone