import CarList from '../components/CarList';
import Board from '../components/Board';
import Notification from '../components/Notification';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '../lib/context';
import mqtt from 'mqtt'


export default function Home({spaces}) {
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
  console.log('Connecting mqtt client')
  const client = mqtt.connect(host2, options)

  const [freeSpace, setFreeState] = useState(1)
  const {
    setMqttClient, 
    mqttClient, 
    spaceMessageString,
    setSpaceMessageString
  } = useGlobalContext()

  const [run, setRun] = useState(false)

  const publishStatus = (msg)=>{
    client.publish('/bello/shehu/reservation', msg,  { qos: 0, retain: false })
  }
  const handleClick = ()=>{
    setRun(true)
    publishStatus('hsss')
  }
  if(client){
    setMqttClient(client)
  }

  client.on('connect', function(){
    console.log('connected')
    client.subscribe('/bello/shehu/test')
  })

  // timer = setInterval(()=>{
  //   if(run == true && count <= 5){
  //     publishStatus('heeey')
  //     setRun(false)
  //     count = count + 1
  //   }else{
  //     count = 0
  //     clearInterval(timer)
  //   }
  // }, 2000)

  client.on('message', (topic, message)=>{
    console.log('receieved: ', message.toString().split(','))
    setSpaceMessageString(message.toString().split(','))
  })

  useEffect(() => {
    return ()=>{
        if(mqttClient){
          mqttClient.end()
        } 
    }

  }, [spaceMessageString])
   
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-white text-3xl md:text-5xl font-extrabold text-center'>Parking without stress</h1>
      <p className='text-amber-500 text-lg my-5'>Use smart parking system to check for parking space before you drive. </p>
      
      <Board />
      {
        freeSpace === 0 ?
        <Notification /> : <CarList spaces={spaces}/>
      }
    </div>
  )

}

export const getServerSideProps = async () =>{
  try{
    const res = await fetch('http://localhost:8000/space/all')
    const spaces = await res.json()
  }catch(error){
    onOpen(type='error', message=error)
  }

  return {
    props: {
      spaces
    }
  }
}