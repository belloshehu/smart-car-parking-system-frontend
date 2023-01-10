import { useRouter } from 'next/router'
import React from 'react'
import { AiFillBell } from 'react-icons/ai'
import { FaCar } from 'react-icons/fa'
import { useModal } from '../hooks/useModal'
import { useGlobalContext } from '../lib/context'

const Notification = () => {
  const router = useRouter()
  const {isAuthenticated, backendUrl} = useGlobalContext()
  const {openAndClose} = useModal()

  const handleClick = async () =>{

    if(!isAuthenticated){
      router.push('/login')
    }
    else{
      await fetch(`${backendUrl}/notification/create`)
      .then(()=> {openAndClose('success', 'Your notification is created.', 3000)})
      .catch((error)=> openAndClose('error', 'Something went wrong. Try again!'))
    }
  }

  return (
    <div className='flex flex-col lg:items-start gap-4 mt-2 lg:mt-10 
                  text-white bg-slate-00 hover:bg-slate-00 
                    p-2 lg:p-10 md:w-6/12 group transition-all duration-300 rounded-lg lg:text-left lg:justify-between'
    >
        <h1 className='text-3xl lg:text-5xl text-center lg:text-left mb-2 w-full lg:mb-10 font-bold'>No Parking spaces</h1>
        <p className='text-black'>There are no free parking space for now. Click the button below to be notified when anyone leaves.</p>
        {/* <FaCar className='my-5 text-8xl font-extrabold text-center animate-ping text-amber-600'/> */}
        <button className='shadow-lg p-4 flex bg-slate-900 items-center px-10 rounded-md gap-2' onClick={handleClick}>
            <AiFillBell className='text-2xl group-hover:-translate-x-3 transition-all duration-300'/>
            <p className='group-hover:translate-x-3 transition-all duration-300'>Notify me</p>
        </button>
    </div>
  )
}

export default Notification