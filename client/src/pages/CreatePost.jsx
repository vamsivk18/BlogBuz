import { Alert, Button, FileInput, Select, Spinner, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, uploadBytesResumable, ref} from 'firebase/storage'
import { app } from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import { useDispatch,useSelector } from 'react-redux';
import { createPostStart,createPostSuccess,createPostFailure,initRefresh } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state=>state.user)
    const [formData,setFormData] = useState({})
    const [imageFileUrl,setImageFileUrl] = useState(null)
    const [imageFile,setImageFile] = useState(null)
    const [imageUploadError,setImageUploadError] = useState(null)
    const [imageFileUploading,setImageFileUploading] = useState(false)
    const [imageUploadProgress,setImageUploadProgress] = useState(null)
    console.log(formData)

    function handleImageChange(e){
        const file = e.target.files[0]
        setImageFile(file)
    }

    useEffect(()=>{
        dispatch(initRefresh())
    },[formData])

    function uploadImage(){
        setImageFileUploading(true)
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
                    setFormData({...formData,image:downloadURL})
                    setImageFileUploading(false)
                    setImageUploadProgress(null)
                })
            }
        )
    }

    function handleUploadImage(){
        setImageUploadError(null)
        if(imageFile===null){
            setImageUploadError('Please Upload Image')
            return
        }
        uploadImage()
    }

    async function handleFormSubmit(e){
        e.preventDefault()
        dispatch(createPostStart())
        try{
            const res = await fetch('/api/admin/create-post',{
                method: 'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(formData)
            })
            const data = await res.json()
            console.log(data)
            if(data.success){
                dispatch(createPostSuccess(data.message))
                navigate(`/posts/${data.slug}`)
            }else{
                dispatch(createPostFailure(data.message))
            }
        }catch(error){
            dispatch(createPostFailure(error))
        }
    }

    return (
        <div className='flex flex-col max-w-3xl mx-auto pt-10 p-4 gap-4 min-h-screen'>
            <h2 className='text-center text-3xl font-semibold'>Create a post</h2>
            <form className='flex flex-col gap-4' onSubmit={handleFormSubmit}>
                <div className='flex flex-col sm:flex-row w-full gap-2'>
                    <TextInput type='text' placeholder='Title' className='w-full sm:w-2/3' onChange={(e)=>{setFormData({...formData,title:e.target.value})}}></TextInput>
                    <Select className='w-full sm:w-1/3' onChange={(e)=>{setFormData({...formData,category:e.target.value})}}>
                        <option value="uncategorized">Select a category</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="FullStack">FullStack</option>
                    </Select>
                </div>
                <div className='flex flex-col sm:flex-row gap-2 p-1 border-2 rounded  w-full items-center justify-between sm:p-4 border-dotted sm:border-4 border-[#3396b5]'>
                    <FileInput type='file' accept='image/*' onChange={handleImageChange}></FileInput>
                    <div className='relative'>
                        {imageUploadProgress && (
                        <CircularProgressbar 
                            value={imageUploadProgress} 
                            text={`${imageUploadProgress}%`}
                            strokeWidth={5}
                            styles={{
                                root:{
                                    width:'100px',
                                    height:'100px',
                                    position:'relative',
                                    top:0,
                                    right:0,
                                },
                                path:{
                                    stroke: `rgba(62,152,199,${imageUploadProgress/100})`
                                }
                            }}
                        >
                        </CircularProgressbar>)}
                        {!imageUploadProgress && <Button outline gradientDuoTone='purpleToBlue' onClick={handleUploadImage}>Upload Image</Button>}
                    </div>
                    
                </div>
                {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
                {imageFileUrl && <img src={imageFileUrl}></img>}
                <ReactQuill theme='snow' placeholder='Write Something...' className='h-72 mb-12' onChange={(value)=>{setFormData({...formData,content:value})}}></ReactQuill>
                <Button gradientDuoTone='purpleToPink' type='submit'>{user.loading?(
                <>
                    <Spinner size='sm'/>
                    <span className='pl-3'>Loading...</span>
                </>
                ):"Publish"}</Button>
                {(user.success || user.error) && <Alert color={`${user.error?'failure':'success'}`}>{user.success || user.error}</Alert>}
            </form>

        </div>
    )
}

export default CreatePost