import React from 'react'
import {AiFillCar} from 'react-icons/ai'
import {FaBars} from 'react-icons/fa'
import Link from 'next/link'
import { useGlobalContext } from '../lib/context'

const Header = () => {

    const {user} = useGlobalContext()

    return (
        <div className='flex justify-between flex-row p-3 py-3 md:px-20 w-full bg-slate-500 shadow-lg fixed top-0 left-0 z-10'>
            <Link href='/' className='flex gap-2 items-center text-white hover:text-slate-300 transition-all duration-150'>
                <AiFillCar className='text-3xl'/>
                <h3 className='text-xl md:text-2xl font-bold text-center'>Car parking system</h3>
            </Link>
            <FaBars className='text-3xl text-white inline md:hidden'/>
            
            <ul className='list-none hidden md:flex gap-4 flex-col md:flex-row md:visible'>
                <li className='hover:text-white'>
                    <Link href="/aboutus">About us</Link>
                </li>

                {
                    !user ? '' :(
                        <li className='hover:text-white'>
                            <Link href="/dashboard">Dashboard</Link>
                        </li>
                    ) 
                }

                <li className='hover:text-white'>
                    <Link href="/login">Login</Link>
                </li>
            </ul>
        
        </div>
    )
}

export default Header