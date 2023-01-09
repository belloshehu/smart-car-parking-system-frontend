import React from 'react'
import LoginForm from '../components/LoginForm'
import Link from 'next/link'

const Login = () => {
  return (
    <div className='flex items-center flex-col'>
        <div className='flex flex-col lg:flex-row items-center gap-3 text-amber-600'>
            <h2 className='text-2xl md:text-3xl text-center font-extrabold mb-4'>Login |</h2>
            <div className='flex justify-between gap-2'>
              <p className='text-slate-500'>do not have account? </p>
              <Link href='/signup' className=''>Sign up</Link>
            </div>
        </div>
        <LoginForm />
    </div>
  )
}

export default Login