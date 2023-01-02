import mqtt from 'mqtt'
import { useState } from 'react'



export const useMqttClient = async (brokerUrl, clientId) =>{
    const client = await mqtt.connect(brokerUrl, {clientId: clientId})
    // const [connection, setConnection] = useState('offline')

    // const substribe = (topic) =>{
    //     client.subscribe(topic)
    // }
    
    // const publish = (topic, message) =>{
    //     client.publish(topic, message)
    // }
    
    // client.on('connect', function(){
    //     setConnection('online')
    //     client.subscribe(substriptionTopic)
    //     publish(publishTopics, publishMessages)
    // })

    // const getMessage = async (topicOfInterest)=>{
    //     substribe(topicOfInterest)
    //     await client.on('message', function(topic, message){
    //         if(topic === topicOfInterest){
    //             return {topic,  message:message.toString()}
    //         }else{
    //             return {topic: topicOfInterest, message: "no matching topic found"}
    //         }
    //     })
    // }
    // const connect = async ()=>{
    //     try{

    //     }catch(err){
            
    //     }
    // }
    return {client}
}

export const useMqttConnection = async(url, clientId) =>{

    const [connected, setConnected] = useState(false);
    const [broadcast, setBoradcast] = useState(null)
    
    const client = mqtt.connect(url, {clientId})

    const getConnection = ()=>{
            client.on('connect', ()=>{
            setConnected(true)
            console.log('connected')
            console.log(connected)
        })
    }

    const subscribe = (topic)=>{
        if(connected){
            client.subscribe(topic)
        }
    }

    const publishMessage = (topic, message)=>{
        if(connected){
            client.publish(topic, message)
        }
    }

    const getMessage = () =>{
        client.on('message', function(topic, message){
            setBoradcast({topic, message: message.toString()})
        })
    }


    return {connected, broadcast, subscribe, publishMessage, getMessage}
}


export const useConnectionCallback = ({client, publisher, subscriptionTopics, publishTopics, publishMessages})=>{
    const {connection, setConnection} = useState('offline');

    client.on('connect', function(){
        setConnection('online')
        try{
            if(typeof subscriptionTopics == 'string'){
                throw new Error('subscriptionTopics must be a list')
            }
            else if(typeof publishTopics == 'string'){
                throw new Error('publishTopics must be a list')
            }
            else if(typeof publishMessages == 'string'){
                throw new Error('publishMessages must be a list')
            }
            else{
                for(let topic of subscriptionTopics){
                    client.subscribe(topic)
                }
                let size = publishTopics
                if(publishMessages.length <= publishTopics.length){
                    size = publishMessages.length
                }
                for(let index = 0; index < size; index++){
                    publisher(client, publishTopics[index], publishMessages[index])  
                }
            }
        }catch(error){
            console.log(error)
        }
    })
    return {connection, runPublisher: ()=>{}}
}

export const useMessage = async(client, topicOfInterest) =>{
    await client.on('message', function(topic, message){
        if(!topicOfInterest || topicOfInterest === topic){
            return {topic, message: message.toString()}
        }else if(topicOfInterest && topicOfInterest != topic){
            return {topic, message: `Message with topic ${topicOfInterest} not found!`}
        }
    })
}