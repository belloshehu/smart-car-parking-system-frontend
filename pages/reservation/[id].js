import React, {useState, useEffect} from 'react'
import ReservationForm from '../../components/ReservationForm'
import { useGlobalContext } from '../../lib/context'
import {useRouter} from 'next/router'

const Reservation = () => {
    const router = useRouter()
    const spaceId = router.query.id
    const {setReservation, reservation, isAuthenticated} = useGlobalContext()
    
    useEffect(()=>{
        if(!isAuthenticated){
            router.push('/login')
        }
    }, [])

    useEffect(()=>{
          setReservation({...reservation, space_id:spaceId})
    }, [])
    
    return (
        <div className='flex flex-col gap-4 justify- items-center'>
            <h3 className='text-slate-200 font-bold'>Reservation for space with id of {spaceId}</h3>
            <ReservationForm />
        </div>
    )
}

export default Reservation