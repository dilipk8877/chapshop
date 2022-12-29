import React, { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

const Dropzone = ({setImages,images}) => {

    const onDrop = useCallback((acceptedFiles,rejectedFiles)=>{
        setImages(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
          })));
        // acceptedFiles.forEach(file => {
        //     const reader = new FileReader()
        //     reader.onload=()=>{
        //         setImages(prevState=>[...prevState,reader.result])
        //     }
        //     reader.readAsDataURL(file)
        // });
        console.log("accept",acceptedFiles)
        console.log("reject",rejectedFiles)
    },[])

    useEffect(()=>{
        console.log(images)
    },[images])
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

export default Dropzone