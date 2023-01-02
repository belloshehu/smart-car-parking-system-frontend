import React from 'react'
import { createContext, useContext, useState } from 'react'
const mqtt =  require('mqtt')

const AppContext = createContext({});

const AppProvider = ({children}) => {


    const [user, setUser] = useState(null)
    const [reservations, setReservations] = useState([])
    const [spaceStatus, setSpaceStatus] = useState([1, 0, 0])
    const [connected, setConnected] = useState(false)
    const [mqttClient, setMqttClient] = useState(null)

    const client = null;

    return (
        <AppContext.Provider value={
            {
                user, 
                setUser, 
                spaceStatus, 
                setSpaceStatus,
                reservations,
                setReservations,
                connected, 
                setConnected,
                client,
                setMqttClient
            }
        }>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => useContext(AppContext);

export default AppProvider