import React from 'react'
import { Footer } from 'flowbite-react'
import {Link} from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

function FooterComp(){
  return (
    <Footer className='border p-5 border-t-4 border-blue-500 flex flex-col'>
            <div className='flex w-full max-w-[1400px] gap-4 flex-col sm:flex-row border-b-2 pb-4 justify-between'>
                <Link to="/" className='whitespace-nowrap text-xl font-semibold'>
                    <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Blog</span>
                    Buzz
                </Link>
                <div className='flex text-gray-500 gap-20 flex-wrap'>
                    <div className='flex flex-col gap-4 text-sm'>
                        <h3 className='font-semibold text-lg'>ABOUT</h3>
                        <a href="">Portfolio</a>
                        <a href="">BlogBuzz</a>
                    </div>
                    <div className='flex flex-col gap-4 text-sm'>
                        <h3 className='font-semibold text-lg'>FOLLOW US</h3>
                        <a href="">Github</a>
                        <a href="">LinkedIn</a>
                    </div>
                    <div className='flex flex-col gap-4 text-sm'>
                        <h3 className='font-semibold text-lg'>LEGAL</h3>
                        <a href="">Privacy Policy</a>
                        <a href="">Terms & Conditions</a>
                    </div>
                </div>
            </div>
            <div className='w-full max-w-[1400px] flex flex-col items-start gap-4 sm:flex-row justify-between p-4 text-gray-500'>
                <div>
                    <p>©2024 <Link to={'/'}>BlogBuz</Link></p>
                </div>
                <div className='flex text-2xl gap-4'>
                    <a href="https://www.facebook.com" target='_blank'><FaFacebook/></a>
                    <a href='https://www.instagram.com' target='_blank'><FaInstagram/></a>
                    <a href='https://www.linkedin.com' target='_blank'><FaLinkedin/></a>
                    <a href='https://www.github.com' target='_blank'><FaGithub/></a>
                </div>
            </div>
    </Footer>
  )
}

export default FooterComp
