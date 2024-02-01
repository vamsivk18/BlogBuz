import React, { useState,useRef, useEffect } from 'react'
import { Alert, Button, TextInput } from 'flowbite-react'
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage, uploadBytesResumable, ref} from 'firebase/storage'
import { app } from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function DashProfile() {
    const {currentUser} = useSelector(state=>state.user)
    const [imageFileUrl,setImageFileUrl] = useState(null)
    const [imageFile,setImageFile] = useState(null)
    const [imageUploadProgress,setImageUploadProgress] = useState(null)
    const [imageUploadError,setImageUploadError] = useState(null)
    const filePickerRef = useRef()
    const [formData,setFormData] = useState({'username':currentUser.username,'password':''})
    console.log(imageUploadProgress,imageUploadError)
    useEffect(()=>{
        if(imageFile){
            uploadImage()
        }
    },[imageFile])
    
    function uploadImage(){
        console.log('Uploading Image...')
        const storage = getStorage(app)
        const fileName = new Date().getTime()+imageFile.name;
        const storageRef = ref(storage,fileName)
        const uploadTask = uploadBytesResumable(storageRef,imageFile)
        uploadTask.on(
            'state_changed',
            (snapshot)=>{
                setImageUploadProgress(((snapshot.bytesTransferred/snapshot.totalBytes)*100).toFixed(0))
            },
            (error) => {
                setImageUploadError('Could not upload image (File must be less than 2MB)')
                setImageUploadProgress(null)
                setImageFileUrl(null)
                setImageFile(null)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    setImageFileUrl(downloadURL)
                })
            }
        )
    }
    
    function handleChange(e){
        setImageUploadProgress(null)
        setImageUploadError(null)
        setFormData({... formData,[e.target.id]:e.target.value})
    }
    function handleFormData(e){
        e.preventDefault()
        console.log(formData)
    }
    function handleImageChange(e){
        setImageUploadError(null)
        const file = e.target.files[0]
        setImageFile(file)
        if(file){
            setImageFileUrl(URL.createObjectURL(file))
        }
    }
  
  return (
    <div className='w-full '>
        <div className='pt-8 p-2 flex flex-col gap-4 md:w-[500px] mx-auto'>
            <h3 className='text-center text-3xl font-semibold'>Profile</h3>
            
            <form className='flex flex-col gap-4' onSubmit={handleFormData}>
                <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
                <div className='relative shadow-md self-center flex items-center justify-center h-32 w-32 bg-gray-300 rounded-full' onClick={()=>filePickerRef.current.click()}>
                    {imageUploadProgress && (
                    <CircularProgressbar 
                        value={imageUploadProgress} 
                        text={`${imageUploadProgress}%`}
                        strokeWidth={5}
                        styles={{
                            root:{
                                width:'100%',
                                height:'100%',
                                position:'absolute',
                                top:0,
                                left:0,
                            },
                            path:{
                                stroke: `rgba(62,152,199,${imageUploadProgress/100})`
                            }
                        }}
                    >
                    </CircularProgressbar>)}
                    <img 
                        className={`w-full h-full border-8 rounded-full cursor-pointer border-[lightgray] object-cover
                        ${imageUploadProgress && imageUploadProgress<100 && `opacity-50`}`} 
                        src={imageFileUrl || currentUser.photoURL} 
                        alt="" 
                    />
                </div>
                {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
                <TextInput type='text' defaultValue={currentUser.username} id='username' onChange={handleChange}></TextInput>
                <TextInput disabled defaultValue={currentUser.email}></TextInput>
                <TextInput placeholder='password' type='text' id='password' onChange={handleChange}></TextInput>
                <Button gradientDuoTone='purpleToBlue' outline type='submit'>Update</Button>
            </form>
            <div className='flex justify-between text-red-500'>
                <span className='cursor-pointer'>Delete Account</span>
                {/* <span className='cursor-pointer'>Sign Out</span> */}
            </div>
        </div>
    </div>

  )
}

export default DashProfile