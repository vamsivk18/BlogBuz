import { TextInput,Button, Label, Alert, Spinner } from 'flowbite-react'
import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth'

const SignUp = () => {
  const [formData,setFormData] = useState({})
  const [errorMessage,setErrorMessage] = useState(null)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  function handleChange(e){
    setFormData({... formData,[e.target.id]:e.target.value})
  }
  async function handleSubmit(e){
    setLoading(true)
    setErrorMessage(null)
    e.preventDefault()
    try{
      const res =await fetch('/api/auth/signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      })
      const data = await  res.json()
      if(!data.success){
        setErrorMessage(data.message)
      }else{
        navigate('/sign-in')
      }
      setLoading(false)
    }catch(error){
      setErrorMessage('Internal Server Error')
      setLoading(false)
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
            <span className='block'>Sign Up with your email and password or with Google to get started</span>
          </p>
        </div>
        <div className='flex-1 flex flex-col gap-4'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Username'></Label>
              <TextInput type='text' placeholder='Username' id='username' onChange={handleChange}></TextInput>
            </div>
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
                ):'Sign Up'
              }
            </Button>
            <OAuth/>
          </form>
          <div>
            <p className='mt-3'>Have an account? <span className='ml-2 text-blue-500'><Link to={'/sign-in'}>Sign In</Link></span></p>
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

export default SignUp