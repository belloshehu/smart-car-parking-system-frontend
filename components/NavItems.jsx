import React from 'react'
import { FaCar, FaLock, FaLockOpen, FaUser, FaHome, FaBell} from 'react-icons/fa'
import {GiArchiveRegister} from 'react-icons/gi'
import { useGlobalContext } from '../lib/context'
import Link from 'next/link'


const NavItems = () => {

    const {isAuthenticated, user, hideSidebar} = useGlobalContext()
    return (
        <ul className='flex flex-col gap-4 w-full'>
            {
                isAuthenticated && user ? (
                    <div className='mb-10'>
                        <li  className='w-full p-2 px-4 text-slate-200 hover:bg-slate-700'>
                            <Link href='/userReservations' 
                                className='flex gap-2 items-center'
                                onClick={hideSidebar}
                            >
                                <FaUser />  Hi, {user.first_name}
                            </Link>
                        </li>
                        <hr/>
                    </div>
                ): ""
            }

            <li  className='bg-slate-800 rounded-full w-full p-2 px-4 text-amber-600 nav-item-hover'>
                <Link href='/' className='flex gap-2 items-center' onClick={hideSidebar}>
                    <FaHome /> Home
                </Link>
            </li>
            <li  className='bg-slate-800 rounded-full w-full p-2 px-4 text-amber-600 nav-item-hover'>
                <Link href='/spaces' className='flex gap-2 items-center' onClick={hideSidebar}>
                    <FaCar /> Spaces
                </Link>
            </li>
            {
                isAuthenticated ? (
                    <>
                        <li  className='bg-slate-800 rounded-full w-full p-2 px-4 text-amber-600 nav-item-hover'>
                            <Link href='/userReservations' className='flex gap-2 items-center' onClick={hideSidebar}>
                                <FaCar /> Reservations
                            </Link>
                        </li>
                        <li  className='bg-slate-800 rounded-full w-full p-2 px-4 text-amber-600 nav-item-hover'>
                            <Link href='/subscriptions' className='flex gap-2 items-center' onClick={hideSidebar}>
                                <FaBell /> Subscriptions
                            </Link>
                             {/* <span className='hidden p-2 px-4 bg-slate-100 text-slate-500 rounded-full absolute right-2 bottom-8 group-hover:block transition-all duration-200'>{0}</span> */}
                        </li>
                        <li  className='bg-slate-800 rounded-full w-full p-2 px-4 text-amber-600 nav-item-hover'>
                            <Link href='/logout' className='flex gap-2 items-center'>
                                <FaLock /> Logout
                            </Link>
                        </li>
                    </>
                ) :(
                    <>
                        <li  className='bg-slate-800 rounded-full w-full p-2 px-4 text-amber-600 nav-item-hover'>
                            <Link href='/login' className='flex gap-2 items-center' onClick={hideSidebar}>
                                <FaLockOpen /> Login
                            </Link>
                        </li>
                        <li  className='bg-slate-800 rounded-full w-full p-2 px-4 text-amber-600 nav-item-hover'>
                            <Link href='/signup' className='flex gap-2 items-center' onClick={hideSidebar}>
                                <GiArchiveRegister /> Signup
                            </Link>
                        </li>
                    </>
                ) 
            }
            
        </ul>
    )
}

export default NavItems