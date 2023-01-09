import React, { useState, useEffect } from 'react'
import Reservation from '../components/Reservation'
import Spinner from '../components/Spinner'
import { useFetchData } from '../hooks/useFetchData'
import { useGlobalContext } from '../lib/context'
import Modal from '../components/Modal'
import { useRouter } from 'next/router'


const url = 'http://localhost:8000/reservation/all'

const UserReservation = () => {
  
  const router = useRouter()
  const {isOpen, isAuthenticated} = useGlobalContext()
  const {isLoading, data, getData} = useFetchData(url)

  useEffect(()=>{
    getData()
  }, [isOpen])

  if(!isAuthenticated){
    router.push('/')
  }
  if(isLoading || !data){
    return(
      <div className='flex flex-col justify-center items-center gap-4 lg:gap-10'>
        <Spinner message={'Loading user reservations'}/>
      </div>
    )
  }
  return (
    <div className='flex flex-col justify-center items-center gap-4 lg:gap-10'>
      <h2 className='text-slate-700 text-2xl md:text-3xl font-extrabold text-center border-b-4 border-black lg:w-1/2'>User reservations</h2>
      {
        data?.length > 0 ?
        (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 w-full'>
              { 
                data?.map(reservation => <Reservation {...reservation} key={reservation.id} />)
              }
          </div>
        ):
        <p className='bg-slate-500 text-black text-center my-auto p-4'>You have no reservations</p>
      }

      {
        isOpen && <Modal />
      }
    </div>
  )
}


// export const getServerSideProps = async () =>{
//   let reservations = []
//   try{
//     const res = await fetch('http://localhost:8000/reservation/all', {
//       header: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}` 
//       }
//     })
//     reservations = await res.json()
//   }catch(error){
//     // onOpen(type='error', message=error)
//     console.log(error)
//   }
  
//   return {
//     props: {
//       reservations
//     }
//   }
// }

export default UserReservation