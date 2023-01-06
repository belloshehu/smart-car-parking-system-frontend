import Link from 'next/link'
import React from 'react'

const success = () => {
  return (
    <div className='flex flex-col gap-4 justify- items-center'>
        <div className='w-full p-2 md:w-4/12 md:p-10 bg-slate-600 shadow-md shadow-slate-500'>
            <h2 className='text-2xl text-slate-50 font-bold mb-4'>Reservation success</h2>
            <p className='text-slate-300'>Your reservation was successfully made.</p>
            <div className='flex justify-between gap-4 mt-8'>
                <Link className='w-full p-3 bg-slate-200 my-3 text-black' href='/'>Go home</Link>
            </div>
        </div>
    </div>
  )
}

export default success