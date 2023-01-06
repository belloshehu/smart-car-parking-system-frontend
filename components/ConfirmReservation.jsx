import React from 'react'
import { useState, useEffect } from 'react'
import { useGlobalContext } from '../lib/context'
import Modal from './Modal'
import { useRouter } from 'next/router'

const ConfirmReservation = () => {
    const {reservation, rate, setReservation, onOpen, isOpen, onClose} = useGlobalContext()
    const {minutes, hours, spaceId} = reservation
    const router = useRouter()

    const calculateCost = () =>{
        const totalCost = rate * (hours + minutes / 60)
        setReservation({...reservation, cost: totalCost})
    }

    const sendRequest = async()=>{
        console.log('sending request')
        // const res = await fetch('http://localhost:8000/detail/33')
        try {
                const res = await fetch(`http://localhost:8000/reservation`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reservation)
            })
            const data = await res.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleConfirmClick = () =>{
        onOpen('Reservation success', 'Your reservation was successfully made.')
        sendRequest()
        setTimeout(()=>{
            router.push('/')
            onClose()
            // setReservation(null)
        }, 5000)
    }

    useEffect(() => {
        calculateCost()
    }, [])
    

  return (
    <div className='w-full flex justify-center'>
        {
            isOpen && <Modal />
        }
        <div className='w-full p-2 md:w-4/12 md:p-10 bg-slate-600 shadow-md shadow-slate-500'>
            <h2 className='text-2xl text-slate-50 font-bold mb-4'>Reservation confirmation</h2>
            <p className='text-slate-300'>You are making reservation for space with Id of {spaceId} for {hours} hours and {minutes} minutes</p>
            <p className='bg-slate-500 p-2 '>Total cost:
                <span className='line-through font-bold'> N</span> <span className='font-bold'>{reservation.cost}</span>
            </p>
            <div className='flex justify-between gap-4 mt-8'>
                <button className='w-full p-3 bg-amber-600 my-3' onClick={handleConfirmClick}>Confirm</button>
                <button className='w-full p-3 bg-slate-200 my-3 text-black'>Go back</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmReservation