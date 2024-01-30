import { TextInput,Button, Label, Alert, Spinner } from 'flowbite-react'
import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'


function SignIn() {
  const [formData,setFormData] = useState({})
  const {loading, error: errorMessage} = useSelector(state=>state.user)
  const navigate = useNavigate()
  const dispach = useDispatch()
  function handleChange(e){
    setFormData({... formData,[e.target.id]:e.target.value})
  }
  async function handleSubmit(e){
    dispach(signInStart())
    e.preventDefault()
    try{
      const res =await fetch('/api/auth/signin',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      })
      const data = await res.json()
      if(data.success === false){
        dispach(signInFailure(data.message))
      }else if(res.ok){
        dispach(signInSuccess(data))
        navigate('/')
      }
    }catch(error){
      dispach(signInFailure(error.message))
    }
  }
  console.log(formData)
  return (
    <div className='min-h-screen mt-20'>
      <div className='p-3 max-w-4xl mx-auto flex flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <Link to="/" className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Blog</span>
            Buzz
          </Link>
          <p className='text-sm mt-5'>
            Welcome to BlogBuzz where you can create and view the current trending blogs. 
            <span className='block'>Sign In with your email and password or with Google</span>
          </p>
        </div>
        <div className='flex-1 flex flex-col gap-4'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Email'></Label>
              <TextInput type='email' placeholder='Email' id='email' onChange={handleChange}></TextInput>
            </div>
            <div>
              <Label value='Password'></Label>
              <TextInput type='password' placeholder='Password' id='password' onChange={handleChange}></TextInput>
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {
                loading?(
                  <>
                    <Spinner size='sm'/>
                    <span className='pl-3'>Loading...</span>
                  </>
                ):'Sign In'
              }
            </Button>
          </form>
          <div>
            <p className='mt-3'>Don't have an account? <span className='ml-2 text-blue-500'><Link to={'/sign-up'}>Sign Up</Link></span></p>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>{errorMessage}</Alert>
            )
          }
        </div>
      </div>
      
      
    </div>
  )
}

export default SignIn