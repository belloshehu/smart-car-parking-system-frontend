import React from 'react'
import { createContext, useContext, useState } from 'react'
const mqtt =  require('mqtt')

const AppContext = createContext({});

const AppProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [reservations, setReservations] = useState([])
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [reservation, setReservation] = useState({
        space_id: '',
        hours: 0,
        minutes: 0,
        cost: 0
    })

    const [toggleSidebar, setToggleSidebar] = useState(false)
    const [mqttClient, setMqttClient] = useState(null)
    const [spaces, setSpaces] = useState([])
    const [spaceMessageString, setSpaceMessageString] = useState(['0','0','0'])
    const [msg, setMsg] = useState('no message')
    const [state, setState] = useState({ 
        isOpen: false, 
        type: 'success', 
        message: '', 
      }); 

    const [rate, setRate] = useState(500)

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
                toggleSidebar,
                mqttClient, 
                setMsg, 
                msg, 
                rate,
                spaces,
                setSpaces,
                isAuthenticated,
                setIsAuthenticated,
                ...state,
                onOpen: (type, message)=> setState({isOpen: true, type, message}),
                onClose: ()=> setState({isOpen: false, type: '', message: ''}),
                showSidebar: ()=> setToggleSidebar(true),
                hideSidebar: ()=> setToggleSidebar(false)
            }
        }>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => useContext(AppContext);

export default AppProvider