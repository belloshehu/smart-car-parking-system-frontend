import React from 'react'
import LoginForm from '../components/LoginForm'
import Link from 'next/link'

const Login = () => {
  return (
    <div className='flex items-center flex-col'>
        <div className='flex items-center gap-3 text-white'>
            <h2 className='text-2xl md:text-3xl text-center font-extrabold text-white mb-4'>Login</h2> |
            <p className='text-slate-500'>don't have account? </p>
            <Link href='/signup' className='text-white'>Sign up</Link>
        </div>
        <LoginForm />
    </div>
  )
}

export default Login