import { Modal, Table, Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function DashPosts() {
  const [userPosts,setUserPosts] = useState([])
  const [displayMessage,setDisplayMessage] = useState('Fetching Data')
  const {currentUser} = useSelector(state=>state.user)
  const [showMore,setShowMore] = useState(true)
  const [showModal,setShowModal] = useState(false)
  const [postToDelete,setPostToDelete] = useState(null)
  const navigate = useNavigate()
  console.log(displayMessage)
  console.log(showMore)
  console.log('User Posts ',userPosts)
  useEffect(()=>{
    async function getPosts(){
      try{
        const res = await fetch(`/api/post/getPosts?userId=${currentUser._id}`)
        const data = await res.json()
        setUserPosts(data.posts)
        if(data.posts==0) setDisplayMessage('You donot have any posts')
        if(data.posts.length<2) setShowMore(false)
      }catch(error){
        console.log(error)
      }
    }
    getPosts()
  },[currentUser._id])

  useEffect(()=>{
    if(userPosts===undefined) setDisplayMessage('You donot have any other posts')
  },[userPosts])

  async function handleDeletePost(){
    try{
      const res = await fetch(`/api/post/deletePost/${postToDelete}/${currentUser._id}`,{
        method:'DELETE',
        headers:{'Content-Type':'application/json'}}
      )
      const data = await res.json()
      if(data.success){
        console.log('Deleted Successfully')
        setUserPosts((prev)=>{
          prev.filter((post)=>post._id!==postToDelete)
        })
        if(userPosts===undefined) setDisplayMessage('You Donot have any posts to show')
      }else{
        console.log('Cannot Delete')
      }
      setShowModal(false)
      setPostToDelete(null)
    }catch(error){
      console.log(error)
    }
  }
  
  async function handleShowMore(){
    try{
      const startIndex = userPosts.length
      const res = await fetch(`/api/post/getPosts?userId=${currentUser._id}&startIndex=${startIndex}`)
      const data = await res.json()
      if(data.posts.length<2) setShowMore(false)
      setUserPosts([...userPosts,...data.posts])
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className='w-full overflow-x-scroll scrollbar scrollbar-track-slate-100
    scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
    {currentUser.isAdmin && userPosts!=undefined && userPosts.length>0?
    <div className='p-10'>
      <Table hoverable className=' rounded-xl'>
        <Table.Head>
          <Table.HeadCell>Date Updated</Table.HeadCell>
          <Table.HeadCell>Post Image</Table.HeadCell>
          <Table.HeadCell>Post Title</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
          <Table.HeadCell>Edit</Table.HeadCell>
        </Table.Head>
        <Table.Body>
        {userPosts.map((post)=>(
            <Table.Row className='bg-gray-100 dark:text-white dark:bg-gray-500 cursor-pointer' key={post._id}>
              <Table.Cell>
                {new Date(post.updatedAt).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>
                <Link to={`/posts/${post.slug}`}>
                  <img className='h-10 w-20 object-cover bg-gray-500' src={post.image}/>
                </Link>
              </Table.Cell>
              <Table.Cell className="min-w-[100px] max-w-[500px]">
                <span onClick={()=>navigate(`/posts/${post.slug}`)} className="font-medium text-gray-900 dark:text-white  block max-h-10 overflow-hidden whitespace-normal ">
                  {post.title}
                </span>
              </Table.Cell>
              <Table.Cell>{post.category}</Table.Cell>
              <Table.Cell><span className='font-medium text-red-500 hover:underline' onClick={()=>{setShowModal(true);setPostToDelete(post._id)}}>Delete</span></Table.Cell>
              <Table.Cell><span className='font-medium text-teal-500 hover:underline'>Edit</span></Table.Cell>
            </Table.Row>
        ))}
        </Table.Body>
      </Table>
      {showMore && <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>Show More</button>}
    </div>
    :
    <p>{displayMessage}</p>}
    <Modal show={showModal} onClose={()=>{setShowModal(false);setPostToDelete(null)}}>
      <Modal.Header>
        Delete Post
      </Modal.Header>
      <Modal.Body>
        <div>
          <h2 className='text-center'>Are you sure to Delete this Post?</h2>
          <div className='flex justify-center gap-8 pt-8'>
            <Button color='failure' onClick={handleDeletePost}>Yes, I'm sure</Button>
            <Button color='gray' onClick={()=>{setShowModal(false);setPostToDelete(null)}}>No, Cancel</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
    </div>
  )
}

export default DashPosts