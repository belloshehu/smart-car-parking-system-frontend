import { useMqttState } from 'mqtt-react-hooks'
import React from 'react'
import AdminDashBoard from '../components/AdminDashBoard'
import Board from '../components/Board'
import CarList from '../components/CarList'
import NavBar from '../components/NavBar'

const Dashboard = () => {
    const {connectionStatus} = useMqttState()

  return (
    <div className='text-white flex flex-col'>
        <h3 className='text-3xl md:text-4xl text-center font-extrabold mb-4'>Admin Dashboard</h3>

        <section className='flex w-full md:gap-2 relative flex-col md:flex-row'>
            <NavBar  className='w-4/12'/>
            <section className='flex flex-col md:w-10/12 gap-10'>
                <div id='#chart'>
                    <p className='text-slate-500 bg-slate-300 p-2 shadow-md shadow-white'>
                        Status: <span className='text-green-500'>{connectionStatus}</span>
                    </p>
                    <AdminDashBoard />
                </div>

                <div className='flex flex-col md:my-5 md:bg-slate-200 md:p-10 items-center' id='#spaces'>
                    <h3 className='text-3xl font-semibold text-black'>Spaces</h3>
                    <Board />
                    <CarList />
                </div>
            </section>
        </section>
    </div>
  )
}

export default Dashboard