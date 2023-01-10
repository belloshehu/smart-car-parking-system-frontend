import React from 'react'
import { useState, useEffect } from 'react'
import { useGlobalContext } from '../lib/context'
import Modal from './Modal'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useModal } from '../hooks/useModal'


const ConfirmReservation = () => {
    const {reservation, rate, setReservation, isOpen, mqttClient, backendUrl} = useGlobalContext()
    const {minutes, hours, spaceId} = reservation
    const router = useRouter()
    const {openAndClose} = useModal()

    const calculateCost = () =>{
        const totalCost = rate * (hours + minutes / 60)
        setReservation({...reservation, cost: totalCost})
    }

    const sendRequest = async()=>{
        try {
                await fetch(`${backendUrl}/reservation`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(reservation)
            })
            mqttClient.publish('/car/parking/system/reservation', `${reservation.space_id}1`)
            openAndClose('success', 'Your reservation was successfully made.', 3000)
            router.push('/userReservations')
        } catch (error) {
            openAndClose('error', error, 3000)
            router.push('/')
        }
    }

    const handleConfirmClick = () =>{
        sendRequest()
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
                <Link className='w-full p-3 bg-slate-200 my-3 text-black' href={`/reservation/${spaceId}`}>Go back</Link>
            </div>
        </div>
    </div>
  )
}

export default ConfirmReservation