import React from 'react'
import Link from 'next/link'
import { FaChartBar } from 'react-icons/fa'
import { AiFillCar } from 'react-icons/ai'

const NavBar = () => {
    return (
        <div className='bg-slate-700 p-2 md:p-5 md:w-2/12 rounded-xl h-fit md:py-10'>
            <ul className='list-none md:flex  gap-4 md:flex-col md:justify-center grid grid-cols-2 '>
                <li className='bg-slate-400 p-2 px-4 rounded-lg hover:bg-slate-500'>
                    <Link href='#chart' className='flex items-center gap-2'>
                        <FaChartBar /> Chart
                    </Link>
                </li>
                <li className='bg-slate-400 p-2 rounded-lg hover:bg-slate-500'> 
                    <Link href='#spaces'  className='flex items-center gap-2'>
                        <AiFillCar/> Spaces
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default NavBar