import React, { useState, useEffect } from 'react'
import Reservation from '../components/Reservation'
import Spinner from '../components/Spinner'
import { useFetchData } from '../hooks/useFetchData'
import { useGlobalContext } from '../lib/context'
import Modal from '../components/Modal'
import { useRouter } from 'next/router'



const Subscritions = () => {
  const router = useRouter()
  const {isOpen, isAuthenticated, backendUrl} = useGlobalContext()
  const url = `${backendUrl}/notification`
  const {isLoading, data, getData} = useFetchData(url)

  useEffect(()=>{
    getData()
  }, [isOpen])


  if(isLoading || !data){
    return(
      <div className='flex flex-col justify-center items-center gap-4 lg:gap-10'>
        <Spinner message={'Loading user subscriptions'}/>
      </div>
    )
  }
  return (
    <div className='flex flex-col justify-center items-center gap-4 lg:gap-10'>
      <h2 className='text-slate-700 text-2xl md:text-3xl font-extrabold text-center border-b-4 border-black lg:w-1/2'>Notifications</h2>
      {
        data?.length > 0 ?
        (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 w-full'>
              { 
                data?.map(reservation => <Reservation {...reservation} key={reservation.id} />)
              }
          </div>
        ):
        <p className='bg-slate-500 text-black text-center my-auto p-4'>You have no subscritions</p>
      }

      {
        isOpen && <Modal />
      }
    </div>
  )
}

export default Subscritions