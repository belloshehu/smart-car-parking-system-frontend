import React, {useState, useEffect} from 'react'
import { useGlobalContext } from '../lib/context'

const Board = () => {

  const {reservations, spaceMessageString} = useGlobalContext()
  const [totalSpace, setTotalSpace] = useState(0)
  const [freeSpace, setFreeSpace] = useState(0)
  const [reservedSpace, setReservedSpace] = useState(0)


  useEffect(() => {
    setTotalSpace(spaceMessageString.length)
    setFreeSpace(spaceMessageString.filter((val)=> val==='0' ).length)
    setReservedSpace(reservations.length)
  }, [spaceMessageString])
  

  return (
    <div className='flex justify-center gap-2 my-2 shadow-md shadow-white  bg-slate-500 p-2 md:p-5 w-full'>
        <h1 className='text-xl text-white'>Total : {totalSpace}</h1> |
        <h1 className='text-xl text-red'>Free : {freeSpace}</h1> |
        <h1 className='text-xl text-amber-500'>Reserved: {reservedSpace}</h1>
    </div>
  )
}

export default Board