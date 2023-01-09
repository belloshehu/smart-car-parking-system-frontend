import React, {useEffect} from 'react'
import { useGlobalContext } from '../lib/context'
import Car from './Car'

const CarList = () => {
  const {spaces} = useGlobalContext()

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-5 w-full'>
        {
          spaces.sort((a, b) => (a.id > b.id) ? 1: -1 ).map((space)=> <Car key={space.id} {...space} />
          )
        }
    </div>
  )
}

export default CarList