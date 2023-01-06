import React, {useEffect} from 'react'
import { useGlobalContext } from '../lib/context'
import Car from './Car'

const CarList = ({spaces}) => {
  const {spaceStatus, space, spaceMessageString} = useGlobalContext()

  // useEffect(()=>{
  // }, [spaceMessageString])

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-5 w-full'>
        {
          spaceMessageString.map((space, index)=>  
            <Car 
              name={`Space ${index + 1}`} 
              message={spaceMessageString[index]} 
              key={index}
              identity={`${index+1}`}
            />
          )
        }
    </div>
  )
}

export default CarList