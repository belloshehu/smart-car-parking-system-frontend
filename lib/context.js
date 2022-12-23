import React from 'react'
import { createContext, useContext, useState } from 'react'

const AppContext = createContext({});

const AppProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [reservations, setReservations] = useState([])
    const [spaceStatus, setSpaceStatus] = useState([1, 0, 0])
    return (
        <AppContext.Provider value={
            {
                user, 
                setUser, 
                spaceStatus, 
                setSpaceStatus,
                reservations,
                setReservations
            }
        }>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => useContext(AppContext);

export default AppProvider