import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'
function AdminPrivateRoute() {
    const {currentUser} = useSelector(state=>state.user)
  return (
    <>
        {currentUser.isAdmin?(<Outlet/>):(<Navigate to='/dashboard?tab=profile'/>)}
    </>
  )
}

export default AdminPrivateRoute