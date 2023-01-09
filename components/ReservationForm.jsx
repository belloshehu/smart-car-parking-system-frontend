import React, {useState, useEffect} from 'react'
import { FaMoneyBill, FaCoin, FaMoneyCheck } from 'react-icons/fa'
import * as Yup from 'yup'
import {useFormik} from 'formik'; 
import useSubmit from '../hooks/useSubmit';
import { useGlobalContext } from '../lib/context';
import Modal from './Modal';
import { useRouter } from 'next/router';

const ReservationForm = () => {
    const [charge, setCharge] = useState(500)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const router = useRouter()

    const {isLoading, response, submit} = useSubmit(); 
    const { onOpen, isOpen, setReservation, rate, reservation, mqttClient} = useGlobalContext(); 
    
    const formik = useFormik({ 
        initialValues: { 
            hours: reservation.hours, 
            minutes: reservation.minutes, 
        }, 
        onSubmit: (values) => {
            setReservation({...reservation, ...values, space_id: router.query.id})
            router.push('/confirm')
        }, 
        validationSchema: Yup.object({  
            hours: Yup.string().required("Required"),
            minutes: Yup.string().required('Required')
        }), 
    }); 
    
    useEffect(() => { 
        if (response) { 
            onOpen(response.type, response.message); 
            if (response.type === 'success') { 
                formik.resetForm(); 
            } 
        } 
    }, [response]); 

    const calculateCost = () =>{
        const totalCost = rate * (hours + minutes /60)
        // setReservation((prev)=>{ return {...prev, cost: totalCost}})
        return totalCost
    }

  return (
    <div className='w-full p-2 md:w-4/12 md:p-10 bg-slate-600 shadow-md shadow-slate-500'>
        {
                isOpen && <Modal />
        }
        <form className='flex flex-col gap-4' onSubmit={formik.handleSubmit}>
            <p className='text-slate-300'>Specify how long you want to reserve the parking space.</p>
            <div className='bg-slate-500 p-2 shadow-lg flex justify-between gap-4 items-center text-slate-800'>
                <p>{rate} Naira / hour</p>
                <div className='flex justify-between items-center gap-2'>
                    <FaMoneyCheck className='text-slate-700 text-2xl'/>
                    <p>Cost: {calculateCost()} Naira</p>
                </div>
            </div>
            <section className='grid grid-cols-2 gap-2'>
                <div className='flex flex-col gap-2 text-left'>
                    <label htmlFor='hour' className='text-white'>Hour</label>
                    <input 
                        type='number' 
                        placeholder='Enter hour' 
                        className='p-4 outline-none border-none'
                        {...formik.getFieldProps('hours')}
                    />
                    <small className='text-red-500'>{formik.errors.hours}</small>
                </div>
                <div className='flex flex-col gap-2 text-left'>
                    <label htmlFor='minute' className='text-white'>Minute</label>
                    <input 
                        type='number' 
                        placeholder='Enter minute' 
                        className='p-4 outline-none border-none'
                        {...formik.getFieldProps('minutes')}
                    />
                    <small className='text-red-500'>{formik.errors.minutes}</small>
                </div>
            </section>
            
            <input  type='submit' className='w-full p-3 bg-amber-600 my-3' value='Check out'/>
            
        </form>
    </div>
  )
}

export default ReservationForm