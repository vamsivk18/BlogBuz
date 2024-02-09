import { Sidebar } from 'flowbite-react'
import {HiUser,HiArrowSmRight, HiDocumentText} from 'react-icons/hi'
import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { signOut } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

function DashSidebar({tab}) {
    const dispach = useDispatch()
    const navigate = useNavigate()
    const {currentUser} = useSelector(state=>state.user)

  function handleSignOut(event){
    // event.preventDefault()
    dispach(signOut())
    navigate('/')
  }

  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='cursor-pointer'>
                <Sidebar.Item 
                  active={tab==='profile'} 
                  onClick={()=>{navigate('/dashboard?tab=profile')}} 
                  icon={HiUser} 
                  label={currentUser.isAdmin?"Admin":"User"} 
                  labelColor='dark'
                >Profile</Sidebar.Item>
                {currentUser.isAdmin && 
                  <Sidebar.Item 
                    active={tab==='posts'} 
                    icon={HiDocumentText}
                    onClick={()=>{navigate('/dashboard?tab=posts')}}
                  >Posts</Sidebar.Item>
                }
                
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
                <Sidebar.Item className='cursor-pointer'><span className='text-red-400 text-lg' onClick={handleSignOut}>Sign Out</span></Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar