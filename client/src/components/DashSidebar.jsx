import { Sidebar } from 'flowbite-react'
import {HiUser,HiArrowSmRight} from 'react-icons/hi'
import React from 'react'
import { useDispatch } from 'react-redux'
import { signOut } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

function DashSidebar({tab}) {
    const dispach = useDispatch()
    const navigate = useNavigate()

  function handleSignOut(event){
    // event.preventDefault()
    dispach(signOut())
    navigate('/')
  }

  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Sidebar.Item active={tab==='profile'} onClick={()=>{navigate('/dashboard?tab=profile')}} icon={HiUser} label={"User"} labelColor='dark'>Profile</Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
                <Sidebar.Item className='cursor-pointer'><span className='text-red-400 text-lg' onClick={handleSignOut}>Sign Out</span></Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar