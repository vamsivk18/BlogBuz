import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'
import DashPosts from '../components/DashPosts'

const Dashboard = () => {
  console.log('rerendered')
  const location = useLocation()
  const [tab,setTab] = useState('')
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl){
      setTab(tabFromUrl)
    }else{
      setTab('profile')
    }
  },[location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='w-full md:w-56'>
        <DashSidebar tab={tab}/>
      </div>
      {tab==='profile' && <DashProfile/>}
      {tab==='posts' && <DashPosts/>}
    </div>
  )
}

export default Dashboard