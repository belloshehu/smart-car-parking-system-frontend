import Link from 'next/link'
import React, {useState, useEffect} from 'react'
import { AiFillCar } from 'react-icons/ai'
import { useGlobalContext } from '../lib/context'

const Car = ({name, id, reserved, occupied}) => {
    
    const [state, setState] = useState("free")
    const {mqttClient} = useGlobalContext()

    function handleClick(){
        setTimeout(() => {
            mqttClient?.publish('/bello/shehu/reservation2', identity,  { qos: 0, retain: false })
        }, 2000);
    }

    return (
        <div className='flex flex-col gap-2 rounded-sm bg-slate-700 shadow-sm shadow-white hover:bg-slate-500 hover:shadow-md hover:shadow-white transition-all duration-150'>
            <h3 className='text-2xl text-amber-500 p-2 bg-black text-center font-extrabold'>{name}</h3>
            <div className='p-5 text-center items-center text-white justify-center w-full'>
                {
                    reserved? 
                    (
                        <div>
                            <p>Reserved</p>
                            <AiFillCar className='text-5xl m-auto my-2 text-amber-500'/>
                        </div>
                    ): occupied ? 
                    (
                        <div>
                            <p>Occupied</p>
                            <AiFillCar className='text-5xl m-auto my-2'/>
                        </div>
                    ): 
                    (
                        <div>
                            <p>Free</p>
                            <Link 
                                className='m-2 py-3 p-2 text-xl border-2 border-amber-600 rounded-md bg-black shadow-lg text-white hover:bg-slate-700 block'
                                href={`/reservation/${id}`}           
                                >Reserve now
                            </Link> 
                        </div>
                    )
                }
               
            </div>
        </div>
    )
}

export default Car