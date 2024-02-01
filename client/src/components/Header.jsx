import { Button, Navbar, TextInput, Dropdown, Avatar } from 'flowbite-react'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon,FaSun} from 'react-icons/fa'
import { useSelector,useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'
import { signOut } from '../redux/user/userSlice'

function Header() {
  const {currentUser} = useSelector(state=>state.user)
  const {theme} = useSelector(state=>state.theme)
  const path = useLocation().pathname
  const navigate = useNavigate()
  const dispach = useDispatch()
  function handleSignOut() {
    dispach(signOut())
    navigate('/')
  }
  return (
    <Navbar className='border-b-2'>
      <Link to="/" className='self-center whitespace-nowrap text-sm 
                    sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Blog</span>
        Buzz
      </Link>
      <form>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}  
          className='hidden lg:inline'
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch/>
      </Button>

      <div className='flex gap-2 md:order-last'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill
          onClick={()=>{dispach(toggleTheme())}}
        >
          {theme==='dark'?<FaSun></FaSun>:<FaMoon></FaMoon>}
        </Button>
        {currentUser?(
          <Dropdown
          className='max-w-[250px]'
            arrowIcon={false}
            inline
            label={<img className='w-10 h-10 rounded-full' src={currentUser.photoURL} referrerPolicy='no-referrer'></img>}
            // <Avatar rounded img={currentUser.photoURL}></Avatar>
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block truncate text-sm font-medium'>{currentUser.email}</span>
            </Dropdown.Header>
            <Dropdown.Item onClick={()=>{navigate('/dashboard?tab=profile')}}>Profile</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
          </Dropdown>
        ):(
          <Link to={"/sign-in"}>
            <Button outline gradientDuoTone='purpleToBlue'>Sign In</Button>
          </Link>
        )}
        
        <Navbar.Toggle></Navbar.Toggle>
      </div>
      
      <Navbar.Collapse>
          <Navbar.Link active={path==="/"} as={'div'}>
            <Link to={"/"}>Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path==="/about"} as={'div'}>
            <Link to={"/about"}>About</Link>
          </Navbar.Link>
          <Navbar.Link active={path==="/projects"} as={'div'}>
            <Link to={"/projects"}>Projects</Link>
          </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Header