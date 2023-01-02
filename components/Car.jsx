import Link from 'next/link'
import React, {useState, useEffect} from 'react'
import { AiFillCar } from 'react-icons/ai'
import { useGlobalContext } from '../lib/context'

const Car = ({name, message, publishStatus, identity}) => {
    
    const [state, setState] = useState("free")
    // const [btnEnabled, setBtnEnabled] = useState(false)
    const {publish, client, mqttClient} = useGlobalContext()

    function handleClick(){
        client.publish('hello', 'world')
        console.log('publishing')
        console.log(client.connected)
    }
    let count = 0;
    setInterval(()=>{count = count +1 }, 1000)
    console.log('client: ', mqttClient?.options)

    useEffect(() => {
        console.log('from car: ', message)
    }, [message, count])
    
    return (
        <div className='flex flex-col gap-2 rounded-sm bg-slate-700 shadow-sm shadow-white hover:bg-slate-500 hover:shadow-md hover:shadow-white transition-all duration-150'>
            <h3 className='text-2xl text-amber-500 p-2 bg-black text-center font-extrabold'>{name}</h3>
            <div className='p-5 text-center items-center text-white justify-center w-full'>
                <p>{message == 0 ? "free": "occupied"}</p>
                <button className='p-2 bg-red-500' onClick={()=>publishStatus(`${identity}1`, mqttClient)}>{mqttClient?.connected? 'yes': 'no'}</button>
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