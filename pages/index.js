import CarList from '../components/CarList';
import Board from '../components/Board';
import Notification from '../components/Notification';
import { useState, useEffect, useCallback } from 'react';
import { useGlobalContext } from '../lib/context';
import mqtt from 'mqtt'
import Spinner from '../components/Spinner';
import { string } from 'yup/lib/locale';
import { stringToBool, filterSpacesToUpdate } from '../lib/utils';


export default function Home() {
  const [loading, setLoading] = useState(true)
  const [run, setRun] = useState(false)

  const {
    setMqttClient, 
    mqttClient, 
    spaceMessageString,
    setSpaceMessageString,
    spaces,
    setSpaces
  } = useGlobalContext()

  const host2 = 'ws://broker.emqx.io:8083/mqtt'
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
    await fetch('http://localhost:8000/space/all')
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
    // fetchData()
    setSpaceMessageString(message.toString().slice(0, 5).split(','))
    const {modified_spacesToBeUpdated, modified_spaces} = filterSpacesToUpdate(spaces, message.toString().slice(0, 5).split(','))

    if(modified_spacesToBeUpdated.length > 0){
      updateSpaces(modified_spacesToBeUpdated)
      setSpaces(modified_spaces)
    }
  })

  const updateSpaces = useCallback(async(payload) =>{
    console.log('payload', payload)
    const res = await fetch(`http://localhost:8000/spaces`, {
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
    // setSpaces(db_spaces)

    // const filtered = filterSpacesToUpdate(spaces, spaceMessageString)
    // console.log('filtered: ', filtered)
    // setFilteredSpaces(filtered)
    return ()=>{
        if(mqttClient){
          mqttClient.end()
        } 
    }

  }, [spaceMessageString])

  if(loading){
    return (
      <div className='flex flex-col items-center justify-center'>
          <Spinner message={'Loading ....'}/>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-slate-700 text-3xl md:text-6xl font-extrabold text-center'>Parking without stress</h1>
      <p className='text-slate-500 text-lg my-5'>Use smart parking system to check for parking space before you drive. </p>
      
      <Board />
      {
        spaces.length === 0 ?
        <Notification /> : <CarList/>
      }
    </div>
  )

}

// export const getServerSideProps = async () =>{
//   let db_spaces = []
//   try{
//     const res = await fetch('http://localhost:8000/space/all')
//     db_spaces = await res.json()
//   }catch(error){
//     // onOpen(type='error', message=error)
//     console.log(error)
//   }

//   return {
//     props: {
//       db_spaces
//     }
//   }
// }