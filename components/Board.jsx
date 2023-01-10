import React, {useState, useEffect} from 'react'
import { useGlobalContext } from '../lib/context'

const Board = () => {

  const {reservations, spaceMessageString, spaces} = useGlobalContext()
  const [totalSpace, setTotalSpace] = useState(0)
  const [freeSpace, setFreeSpace] = useState(0)
  const [reservedSpace, setReservedSpace] = useState(0)

  useEffect(() => {
    setFreeSpace(spaces.filter((space)=> space.occupied==false && space.reserved == false).length)
    setReservedSpace(spaces.filter(space => space.reserved == true).length)
  }, [spaces])
  

  return (
    <div className='my-2 shadow-md shadow-white bg-slate-00 p-2 md:p-5 w-full rounded-full hover:bg-slate-300 group transition-pros'>
      <div className='p-2 px-4 bg-slate-400 rounded-full flex justify-center gap-1 lg:gap-4 w-full group-hover:bg-slate-500 transition-props'>
        <h1 className='text-xl text-white lg:font-bold'>Total : {spaces.length}</h1> |
        <h1 className='text-xl text-slate-600 lg:font-bold'>Free : {freeSpace}</h1> |
        <h1 className='text-xl text-amber-500 lg:font-bold'>Reserved: {reservedSpace}</h1>
      </div>
    </div>
  )
}

export default Board