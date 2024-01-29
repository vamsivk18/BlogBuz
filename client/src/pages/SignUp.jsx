import { TextInput,Button, Label } from 'flowbite-react'
import React from 'react'
import {Link} from 'react-router-dom'

const SignUp = () => {
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
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='Username'></Label>
              <TextInput type='text' placeholder='Username' id='username'></TextInput>
            </div>
            <div>
              <Label value='Email'></Label>
              <TextInput type='email' placeholder='Email' id='email'></TextInput>
            </div>
            <div>
              <Label value='Password'></Label>
              <TextInput type='password' placeholder='Password' id='password'></TextInput>
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit'>Sign Up</Button>
          </form>
          <div>
            <p className='mt-3'>Have an account? <span className='ml-2 text-blue-500'><Link to={'/sign-in'}>Sign In</Link></span></p>
          </div>
        </div>
      </div>
      
      
    </div>
  )
}

export default SignUp