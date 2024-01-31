import React from 'react'
import { FaGoogle } from 'react-icons/fa'
import { Button } from 'flowbite-react'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signInSuccess } from '../redux/user/userSlice'

function Oauth() {
  const dispach = useDispatch()
  const navigate = useNavigate()
  const auth = getAuth(app)
  async function handleGoogleOAuth(){
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({prompt:'select_account'})
    try{
      const resultsFromGoogle = await signInWithPopup(auth,provider)
      const decodedData = {
        name: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email,
        photoURL: resultsFromGoogle.user.photoURL
      }
      const res = await fetch('/api/auth/OAuth',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(decodedData)
      })
      const data = await res.json()
      dispach(signInSuccess(data.userInfo))
      navigate('/')
    }catch (error){

    }
  }

  return (
    <Button gradientDuoTone='pinkToOrange' outline onClick={handleGoogleOAuth}>
      <div className='flex gap-2 items-center'>
        <FaGoogle/>
        Continue with Google
      </div>
    </Button>
  )
}

export default Oauth