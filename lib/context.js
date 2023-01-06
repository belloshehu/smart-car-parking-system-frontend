import React from 'react'
import { createContext, useContext, useState } from 'react'
const mqtt =  require('mqtt')

const AppContext = createContext({});

const AppProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [reservations, setReservations] = useState([])
    const [reservation, setReservation] = useState({
        spaceId: '',
        hours: 0,
        minutes: 0,
        user: null, 
        cost: 0
    })

    const [mqttClient, setMqttClient] = useState(null)
    const [spaceMessageString, setSpaceMessageString] = useState(['0','0','0'])
    const [msg, setMsg] = useState('no message')
    const [state, setState] = useState({ 
        isOpen: false, 
        type: 'success', 
        message: '', 
      }); 

    const [rate, setRate] = useState(500)

    const client = null;

    return (
        <AppContext.Provider value={
            {
                user, 
                setUser, 
                reservations,
                reservation,
                setReservation,
                setReservations,
                spaceMessageString,
                setSpaceMessageString,
                setMqttClient,
                mqttClient, 
                setMsg, 
                msg, 
                rate,
                ...state,
                onOpen: (type, message)=> setState({isOpen: true, type, message}),
                onClose: ()=> setState({isOpen: false, type: '', message: ''})
            }
        }>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => useContext(AppContext);

export default AppProvider