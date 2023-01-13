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
        <div className='flex flex-col gap-2 rounded-sm bg-slate-400 shadow-md shadow-slate-700 hover:bg-slate-500 hover:shadow-md hover:shadow-slate-600 transition-all duration-150'>
            <h3 className='text-2xl text-slate-600 p-2 bg-slate-300 text-center font-bold'>{name}</h3>
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
                                className='m-2 py-2 p-2 text-xl border-2 border-slate-300 rounded-0 bg-slate-500 shadow-lg text-slate-300 hover:bg-slate-700 block'
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