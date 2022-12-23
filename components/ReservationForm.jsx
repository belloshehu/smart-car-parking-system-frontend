import React, {useState} from 'react'
import { FaCoins, FaMoneyBill } from 'react-icons/fa'

const ReservationForm = () => {
    const [charge, setCharge] = useState(500)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)

    const calculateCost = () =>{
        return charge * (hours + minutes /60)
    }
  return (
    <div className='w-full p-2 md:w-4/12 md:p-10 bg-slate-600 shadow-md shadow-slate-500'>
        <form className='flex flex-col gap-4'>
            <div className='bg-slate-500 p-2 shadow-lg flex justify-between gap-4 items-center text-slate-800'>
                <p>{charge} Naira / hour</p>
                <div className='flex justify-between items-center gap-2'>
                    <FaMoneyBill className='text-slate-700 text-2xl'/>
                    <p>Cost: { calculateCost() } Naira</p>
                </div>
            </div>
            <section className='grid grid-cols-2 gap-2'>
                <div className='flex flex-col gap-2 text-left'>
                    <label htmlFor='hour' className='text-white'>Hour</label>
                    <input type='number' placeholder='Enter hour' className='p-4 outline-none border-none'/>
                </div>
                <div className='flex flex-col gap-2 text-left'>
                    <label htmlFor='minute' className='text-white'>Minute</label>
                    <input type='number' placeholder='Enter minute' className='p-4 outline-none border-none'/>
                </div>
            </section>
            
            <input  type='submit' className='w-full p-3 bg-amber-600 my-3' value='Submit'/>
            
        </form>
    </div>
  )
}

export default ReservationForm