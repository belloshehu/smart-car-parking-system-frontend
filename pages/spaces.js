import CarList from '../components/CarList';
import Board from '../components/Board';
import Notification from '../components/Notification';
import { useState, useEffect, useCallback } from 'react';
import { useGlobalContext } from '../lib/context';
import mqtt from 'mqtt'
import Spinner from '../components/Spinner';
import { filterSpacesToUpdate } from '../lib/utils';
import carParkImage1 from '../images/car-park1.jpg'
import Image from 'next/image';

export default function Spaces() {
  const [loading, setLoading] = useState(true)

  const {
    setMqttClient, 
    mqttClient, 
    spaceMessageString,
    setSpaceMessageString,
    spaces,
    setSpaces,
    backendUrl,
  } = useGlobalContext()

  const host2 = 'wss://broker.emqx.io:8084/mqtt'
  const clientId = `mqttjs_1+ ${Math.random().toString(16).substr(2, 8)}`;

  const options = {
    keepalive: 60,
    clientId: clientId,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    will: {
      topic: 'WillMsg',
      payload: 'Connection Closed abnormally..!',
      qos: 0,
      retain: false
    },
  }

  const fetchData = async ()=>{
    console.log(backendUrl)
    await fetch(`${backendUrl}/space/all`)
    .then(res => res.json())
    .then(data => setSpaces(data))
    .catch(error=> console.log(error))
  }

  const connectClient = useCallback(async()=>{
    console.log('Connecting mqtt client')
    const client = await mqtt.connect(host2, options)
    setMqttClient(client)
  }, [mqttClient])

  mqttClient?.on('connect', function(){
    console.log('connected')
    mqttClient?.subscribe('/car/parking/system/space')
  })

  mqttClient?.on('message', function(topic, message){
  
    setSpaceMessageString(message.toString().slice(0, 5).split(','))
    const {modified_spacesToBeUpdated, modified_spaces} = filterSpacesToUpdate(spaces, message.toString().slice(0, 5).split(','))

    if(modified_spacesToBeUpdated.length > 0){
      updateSpaces(modified_spacesToBeUpdated)
      setSpaces(modified_spaces)
    }
  })

  const updateSpaces = useCallback(async(payload) =>{
    const res = await fetch(`${backendUrl}/spaces`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
       },
      body: JSON.stringify(payload),

    })
    const data = await res.json()
  }, [spaceMessageString])

  useEffect(() => {
    fetchData()
    connectClient()
    if(!spaces){
      setLoading(true)
    }else{
      setLoading(false)
    }
  }, [])
  
  useEffect(() => {
    // return ()=>{
    //     if(mqttClient){
    //       mqttClient.end()
    //     } 
    // }

  }, [spaceMessageString])

  if(loading){
    return (
      <div className='flex flex-col items-center justify-center'>
          <Spinner message={'Loading ....'}/>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center pt-10 lg:pt-0'>
      <Board />
      {
        spaces.length === 0 ?
        (
          <div className='flex flex-col-reverse lg:flex-row justify-between gap-4 items-center mt-10 p-2 bg-slate-300 py:20 lg:p-20'>
            <Notification /> 
            <Image src={carParkImage1} alt='cap-park' className='h-500 w-full lg:w-1/2 rounded-lg'/>
          </div>
        ):
        (
          <div className='flex flex-col justify-between items-center w-full p-2 lg:p-20 mb-20'>
            <CarList/>
          </div>
        )
      }
    </div>
  )

}
