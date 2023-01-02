const client = mqtt.connect('mqtt://tatrawo:K1FADvCXcoL0pYaf@tatrawo.cloud.shiftr.io', {clientId: 'tatrawo'})
  console.log(client)

  
  let interval = null

  client.on('connect', function(){
    console.log('connected')
    setConnected(true)
    client.subscribe('/space')
    interval = setInterval(()=>{
      client.publish('greeting', `morning ${Math.random()*10}`)
    }, 2000)
  })

  client.on('message', (topic, message)=>{
    console.log(topic, message.toString())
  })
  
  export const clientObj = () =>{}