import Link from 'next/link'
import React from 'react'
import { FaHome, FaCar, FaTimes } from 'react-icons/fa'
import { useGlobalContext } from '../lib/context'
import NavItems from './NavItems'

const links = [
    {
        text: "Home",
        icon: <FaHome />,
        url: '/'  
    },
    {
        text: "My reservations",
        icon: <FaCar />,
        url: '/user-reservations'  
    }
]
const Sidebar = () => {
    const {toggleSidebar, hideSidebar} = useGlobalContext()
  return (
    <div className={`${toggleSidebar? 'w-10/12 absolute left-0 top-0 z-10 pt-20 transition-all duration-1000 ease-linear' : 'hidden w-2/12 relative'} lg:flex flex-col items-center justify-center gap-10 bg-slate-900 h-screen p-2`}>
        <FaTimes 
            className='text-5xl font-extrabold p-2 rounded-full bg-slate-700 text-amber-700 lg:hidden absolute top-2 right-2'
            onClick={()=>hideSidebar()}
            />
        <NavItems className=''/>
    </div>
  )
}

export default Sidebar