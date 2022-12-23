import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Car from '../components/Car';
import CarList from '../components/CarList';
import Board from '../components/Board';
import LoginForm from '../components/LoginForm';
import Notification from '../components/Notification';
import { useState, useEffect } from 'react';
import { useMqttState, useSubscription } from 'mqtt-react-hooks';

export default function Home() {
  
  const [freeSpace, setFreeState] = useState(1)
  const {message} = useSubscription(['/space'])

  // useEffect(() => {
  //   if(message.message.length > 0){
  //     setSpaceStatus(message?.message.split(','))
  //   }
  // }, [message])
  
  
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-white text-3xl md:text-5xl font-extrabold text-center'>Parking without stress</h1>
      <p className='text-amber-500 text-lg my-5'>Use smart parking system to check for parking space before you drive. </p>
      <Board totalSpace={3} reservedSpace={1}  freeSpace={2} />
      {
        freeSpace === 0 ?
        <Notification /> : <CarList />
      }
    </div>
  )
}
