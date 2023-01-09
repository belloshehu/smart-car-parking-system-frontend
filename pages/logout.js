import React from 'react'
import { useGlobalContext } from '../lib/context'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Logout = () => {
    const router = useRouter()
    const {setUser, setIsAuthenticated} = useGlobalContext()

    const handleLogout = () =>{
        setUser(null)
        localStorage.removeItem('token')
        setIsAuthenticated(false)
        setTimeout(()=>{
            router.push('/')
        }, 2000)
    }

    return (
       <div className='flex flex-col items-center'>
            <div className='w-full p-2 md:w-4/12 md:p-10 bg-slate-600 shadow-md shadow-slate-500'>
                <h2 className='text-2xl text-slate-50 font-bold mb-4'>Want to logout?</h2>
                <div className='flex justify-between gap-4 mt-8'>
                    <button className='w-full p-3 bg-amber-500 my-3 text-white' onClick={handleLogout}>Yes</button>
                    <Link className='w-full p-3 bg-slate-200 my-3 text-black' href='/'>No</Link>
                </div>
            </div>
        </div>
    )
}

export default Logout