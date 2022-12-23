import Link from 'next/link'
import React, {useState} from 'react'
import { AiFillCar } from 'react-icons/ai'
import { useMqttState } from 'mqtt-react-hooks'

const Car = ({name, message}) => {
    const [state, setState] = useState("free")
    const {client} = useMqttState()
    // const [btnEnabled, setBtnEnabled] = useState(false)
    const updateState = () =>{
        
    }

    const handleClick = (msg) =>{
        return client.publish('/reservation', msg)
    }
    
    return (
        <div className='flex flex-col gap-2 rounded-sm bg-slate-700 shadow-sm shadow-white hover:bg-slate-500 hover:shadow-md hover:shadow-white transition-all duration-150'>
            <h3 className='text-2xl text-amber-500 p-2 bg-black text-center font-extrabold'>{name}</h3>
            <div className='p-5 text-center items-center text-white justify-center w-full'>
                <p>{message == 0 ? "free": "occupied"}</p>
                <button onClick={()=>handleClick('11')}>reservation</button>
                {
                    message == 0? (
                        <Link 
                            className='m-2 py-3 p-2 text-xl rounded-md bg-amber-500 shadow-lg text-white hover:bg-amber-400 block'
                            disabled={message==="1"}
                            href='/reservation'
                        >Reserve now
                        </Link>
                        
                    ): (
                        <AiFillCar className='text-5xl m-auto my-2'/>
                    )
                }
            </div>
        </div>
    )
}

export default Car