import React from 'react'
import { useGlobalContext } from '../lib/context'
import { FaTimes } from 'react-icons/fa'

const Modal = () => {
    const {type, message, onClose} = useGlobalContext()

    return (
        <div className='flex justify-center absolute mx-auto lg:w-full top-0 right-0 left-0 h-screen z-20 bg-slate-900 p-4 text-center rounded-xl opacity-90'>
           <div className='flex flex-col items-center p-10 text-center gap-4 bg-slate-100 lg:w-1/2 my-auto h-auto rounded-md'>
                <FaTimes 
                    className='text-3xl top-4 right-4 absolute text-red-900 font-bold bg-slate-400'
                    onClick={onClose}
                    />
                <h2 className='text-amber-600 text-2xl lg:text-3xl  font-extrabold bg-slate-700 p-2 rounded-xl w-1/2'>{type}</h2>
                <p className='text-black'>{message}</p>
           </div>
        </div>
    )
}

export default Modal