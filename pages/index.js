
import Car from '../components/Car';
import CarList from '../components/CarList';
import Board from '../components/Board';
import Notification from '../components/Notification';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '../lib/context';
import mqtt from 'mqtt'
import Head from 'next/head'

export default function Home() {
  
  // console.log(JSON.parse(client).connected)
  const client = mqtt.connect('mqtt://tatrawo:K1FADvCXcoL0pYaf@tatrawo.cloud.shiftr.io', {
    clientId: 'tatrawo'
  })

  

  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    client.subscribe("World");
    let message = new window.Paho.MQTT.Message("Hello");
    message.destinationName = "World";
    clientPaho.send(message);
  }


  const [freeSpace, setFreeState] = useState(1)
  const {setSpaceStatus, setMqttClient, mqttClient} = useGlobalContext()
  const [msg, setMsg] = useState()
  const [cl, setCl] = useState(null)
  const [spaceMessageString, setSpaceMessageString] = useState(['0','0','0'])

  const publishStatus = (msg, clt)=>{
    
      client.publish('/reservation', msg)
      console.log('publishing ', msg)
      console.log(clt?.options)
  }

  if(client){
    setMqttClient(client)
  }

  client.on('connect', function(){
    console.log('connected')
    client.subscribe('space')
  })

  client.on('message', function(topic, message){
    console.log('receieved: ', message.toString().split(','))
    setSpaceMessageString(message.toString().split(','))
    setSpaceStatus(message.toString().split(','))
  })

  // setInterval(()=>{
  //   client?.publish('/hello', 'morning')
  // }, 5000)


  useEffect(() => {
    console.log('Random number:', window._.random(1, 10))
    const clientPaho = new window.Paho.MQTT.Client('d7a760b769824d2d80c030264fb8f386.s2.eu.hivemq.cloud', 8884, "tatra");
    clientPaho.connect({onSuccess:onConnect});
    return ()=>{
        if(mqttClient){
          mqttClient.end()
        } 
    }

  }, [spaceMessageString])

   
  return (
    <div className='flex flex-col items-center justify-center'>
      <Head>
        <script src="https://unpkg.com/lodash" async></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js"  async></script>
      </Head>

      <h1 className='text-white text-3xl md:text-5xl font-extrabold text-center'>Parking without stress</h1>
      <p className='text-amber-500 text-lg my-5'>Use smart parking system to check for parking space before you drive. </p>
      <Board />
      <p>connection: {client?.connected == true ? 'Onlined': 'Offline'}</p>
      {
        freeSpace === 0 ?
        // <Notification /> : <CarList spaceMessageString={spaceMessageString} />
        <Notification /> : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-5 w-full'>
            {
              spaceMessageString.map((space, index)=>  
                <Car 
                  name={`Space ${index + 1}`} 
                  message={spaceMessageString[index]} 
                  key={index}
                  identity={index + 1}
                  publishStatus={publishStatus}
                />
              )
            }
        </div>
        )
      }
    </div>
  )

}
