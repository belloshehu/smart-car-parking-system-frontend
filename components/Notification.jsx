import React from 'react'
import { AiFillBell } from 'react-icons/ai'

const Notification = () => {
  return (
    <div className='flex flex-col items-center gap-4 mt-10 text-white bg-slate-700 shadow-md p-10 md:w-6/12'>
        <p>There are no free parking space for now. Click the button below to be notified when anyone leaves.</p>
        <button className='p-2 flex bg-amber-500 items-center px-10 rounded-md gap-2'>
            <AiFillBell className='text-2xl'/> <p>Notify me</p>
        </button>
    </div>
  )
}

export default Notification