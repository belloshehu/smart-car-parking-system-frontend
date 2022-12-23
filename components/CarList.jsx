import { useMqttState, useSubscription } from 'mqtt-react-hooks'
import React, {useEffect} from 'react'
import { useGlobalContext } from '../lib/context'
import Car from './Car'

const CarList = () => {
  const {spaceStatus, setSpaceStatus} = useGlobalContext()
  
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-5 w-full'>
        {
          spaceStatus.map((space, index)=>  <Car name={`Space ${index + 1}`} message={spaceStatus[index]}/>)
        }
    </div>
  )
}

export default CarList