import React from 'react'
import { FaCar, FaLock, FaLockOpen, FaUser, FaHome} from 'react-icons/fa'
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

            <li  className='bg-slate-800 rounded-full w-full p-2 px-4 text-amber-600 hover:bg-slate-700'>
                <Link href='/' className='flex gap-2 items-center' onClick={hideSidebar}>
                    <FaHome /> Home
                </Link>
            </li>
            {
                isAuthenticated ? (
                    <>
                        <li  className='bg-slate-800 rounded-full w-full p-2 px-4 text-amber-600 hover:bg-slate-700'>
                            <Link href='/userReservations' className='flex gap-2 items-center' onClick={hideSidebar}>
                                <FaCar /> My reservations
                            </Link>
                        </li>
                        <li  className='bg-slate-800 rounded-full w-full p-2 px-4 text-amber-600 hover:bg-slate-700'>
                            <Link href='/logout' className='flex gap-2 items-center'>
                                <FaLock /> Logout
                            </Link>
                        </li>
                    </>
                ) :(
                    <li  className='bg-slate-800 rounded-full w-full p-2 px-4 text-amber-600 hover:bg-slate-700'>
                        <Link href='/login' className='flex gap-2 items-center' onClick={hideSidebar}>
                            <FaLockOpen /> Login
                        </Link>
                    </li>
                ) 
            }
            
        </ul>
    )
}

export default NavItems