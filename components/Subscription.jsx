import React from 'react'
import { FaCalendar, FaClock, FaMoneyBill } from 'react-icons/fa'
import { useModal } from '../hooks/useModal'
import { useGlobalContext } from '../lib/context'

const Subscription = ({id, title, expired, datetime}) => {
    const {openAndClose} = useModal()
    const {backendUrl} = useGlobalContext()

    const handleCancel = async()=>{
        try {
            const response = await fetch(`${backendUrl}/notification/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            openAndClose('success', 'Subscription cancelled', 5000)
        } catch (error) {
            openAndClose('error', 'Subscription cancellation failed', 5000)
        }
    }

    return (
        <div className='bg-slate-300 rounded-md p-4 flex flex-col gap-4 justify-center items-center'>
            <div className='p-2 bg-slate-400'>
                <h3 className='bg-slate-600 p-2 text-xl font-bold text-white'>{title}</h3>    
            </div>
            
            <div className='flex justify-between w-full text-slate-700'>       
                <div className='flex justify-center gap-4 items-center'>
                        <FaClock /> <p>{datetime.substring(11, 16)}</p>
                </div>

                <div className='flex justify-center gap-4 items-center text-amber-600'>
                        <FaCalendar /> <p>{datetime.substring(0, 10)}</p>
                </div>
            </div>
            <button 
                className='p-2 rounded-md bg-slate-800 text-slate-50 w-full hover:bg-slate-700'
                onClick={handleCancel}
                >Cancel</button>
        </div>
    )
}

export default Subscription