import React from 'react'
import LoginForm from '../components/LoginForm'
import Link from 'next/link'
import SignupForm from '../components/SignupForm'

const Signup = () => {
  return (
    <div className='flex items-center flex-col'>
        <div className='flex items-center gap-3 text-white'>
            <h2 className='text-2xl md:text-3xl text-center font-extrabold text-white mb-4'>Signup</h2> |
            <p className='text-slate-500'>have an account? </p>
            <Link href='/login' className='text-white'>Login</Link>
        </div>
        <SignupForm />
    </div>
  )
}

export default Signup