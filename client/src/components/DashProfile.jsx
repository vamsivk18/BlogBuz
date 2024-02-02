import React, { useState,useRef, useEffect } from 'react'
import { Alert, Button, Spinner, TextInput } from 'flowbite-react'
import { useSelector,useDispatch } from 'react-redux'
import {getDownloadURL, getStorage, uploadBytesResumable, ref} from 'firebase/storage'
import { app } from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateUserStart,updateUserFailure,updateUserSuccess,updateUserNothing,initRefresh, signOut } from '../redux/user/userSlice'
import {useNavigate} from 'react-router-dom'


function DashProfile() {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const {currentUser,loading,error:errorMessage,success:successMessage} = useSelector(state=>state.user)
    const [imageFileUrl,setImageFileUrl] = useState(null)
    const [imageFile,setImageFile] = useState(null)
    const [imageUploadProgress,setImageUploadProgress] = useState(null)
    const [imageFileUploading,setImageFileUploading] = useState(null)
    const [imageUploadError,setImageUploadError] = useState(null)
    const filePickerRef = useRef()
    const [formData,setFormData] = useState({'username':currentUser.username,'password':undefined})
    console.log(imageUploadProgress,imageUploadError)
    console.log(formData)
    useEffect(()=>{
        if(imageFile){
            uploadImage()
        }
    },[imageFile])
    useEffect(()=>{
        console.log('rendering')
        console.log('Calling Refresh')
        dispatch(initRefresh())
    },[formData])
    
    function uploadImage(){
        setImageFileUploading(true)
        console.log('Uploading Image...',imageFile.name)
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
                setImageFileUploading(false)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    setImageFileUrl(downloadURL)
                    setImageFileUploading(false)
                })
            }
        )
    }
    
    function handleChange(e){
        setImageUploadProgress(null)
        setImageUploadError(null)
        setFormData({... formData,[e.target.id]:e.target.value})
    }
    async function handleSubmit(e){
        dispatch(updateUserStart())
        e.preventDefault()
        try{
            const finalData = {...formData,photoURL:imageFileUrl}
            if((!finalData.username || finalData.username===currentUser.username) &&
            (!finalData.password) &&
            (!finalData.photoURL || finalData.photoURL===currentUser.photoURL)
            ){
                dispatch(updateUserNothing())
                return
            }
            console.log(finalData,'Final Data')
            const res =await fetch(`/api/user/update/${currentUser._id}`,{
              method:'PUT',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify(finalData)
            })
            const data = await res.json()
            if(data.success === false){
              dispatch(updateUserFailure(data.message))
            }else if(res.ok){
              console.log('Success')
              dispatch(updateUserSuccess(data))
              setImageUploadProgress(null)
              setImageFileUrl(null)
              setImageFile(null)
            }
          }catch(error){
            console.log(error)
          }
    }
    function handleImageChange(e){
        dispatch(initRefresh())
        setImageUploadError(null)
        const file = e.target.files[0]
        setImageFile(file)
        if(file){
            setImageFileUrl(URL.createObjectURL(file))
        }
    }
    async function deleteUser(){
        try{
            const res =await fetch(`/api/user/delete/${currentUser._id}`,{
              method:'DELETE',
              headers:{'Content-Type':'application/json'}
            })
            const data = await res.json()
            if(data.success === false){
              dispatch(updateUserFailure(data.message))
            }else if(res.ok){
              console.log('Success')
              dispatch(signOut())
            }
        }catch(error){

        }
    }
  
  return (
    <div className='w-full '>
        <div className='pt-8 p-2 flex flex-col gap-4 md:w-[500px] mx-auto'>
            <h3 className='text-center text-3xl font-semibold'>Profile</h3>
            
            <form id='profile' className='flex flex-col gap-4' onSubmit={handleSubmit}>
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
                <Button gradientDuoTone='purpleToBlue' outline type='submit' disabled={imageFileUploading}>{
                    loading?(
                        <>
                        <Spinner size='sm'/>
                        <span className='pl-3'>Loading...</span>
                        </>
                    ):'Update'
                }</Button>
                {
                    currentUser.isAdmin && <Button type='button' gradientDuoTone='purpleToPink' onClick={()=>{navigate('/create-post')}}>Create a Post</Button>
                }
            </form>
            <div className='flex justify-between text-red-500'>
                <span className='cursor-pointer' onClick={deleteUser}>Delete Account</span>
                {/* <span className='cursor-pointer'>Sign Out</span> */}
            </div>
            {(errorMessage || successMessage)  && <Alert color={`${errorMessage?'failure':'success'}`}>{errorMessage || successMessage}</Alert>}
        </div>
    </div>

  )
}

export default DashProfile