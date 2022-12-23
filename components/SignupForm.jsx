import React from 'react'
import {BsFacebook} from 'react-icons/bs'
import {AiFillGoogleCircle} from 'react-icons/ai'

const SignupForm = () => {
  return (
    <div className='w-full p-2 md:w-4/12 md:p-10 bg-slate-600 shadow-md shadow-slate-500'>
        <form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2  text-left'>
                <label htmlFor='email' className='text-white'>Email</label>
                <input type='email' placeholder='Enter email' className='p-4 outline-none border-none'/>
            </div>
            <div className='flex flex-col gap-2 text-left'>
                <label htmlFor='password' className='text-white'>Password</label>
                <input type='password' placeholder='Enter password' className='p-4 outline-none border-none'/>
            </div>
            <div className='flex flex-col gap-2 text-left'>
                <label htmlFor='password' className='text-white'>Repeat Password</label>
                <input type='password' placeholder='Enter password' className='p-4 outline-none border-none'/>
            </div>
            <input  type='submit' className='w-full p-3 bg-amber-600 my-3' value='Submit'/>
            <div className='flex justify-between items-center text-slate-100'>
                <p>Sign up with</p>
                <div className='flex gap-4'>
                    <BsFacebook className='bg-blue-600 rounded-full text-3xl hover:text-4xl transition-all duration-200 ease-linear'/>
                    <AiFillGoogleCircle className='bg-green-700 rounded-full text-3xl hover:text-4xl transition-all duration-200 ease-linear' />
                </div>
            </div>
        </form>
    </div>
  )
}

export default SignupForm