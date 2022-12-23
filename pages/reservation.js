import React, {useState} from 'react'
import ReservationForm from '../components/ReservationForm'
import { useGlobalContext } from '../lib/context'


// const router = useRouter()

const reservation = () => {

    const {user, setUser} = useGlobalContext()
    
    if(!user){
        // router.push('/', )
        console.log('login first')
    }
    
    return (
        <div className='flex flex-col gap-4 justify- items-center'>
            <h2 className='text-2xl md:text-3xl text-center font-extrabold text-white mb-4'>Reservation</h2>
            <p className='text-slate-300'>Specify how long you want to reserve a parking space.</p>
            <ReservationForm />
        </div>
    )
}

export default reservation