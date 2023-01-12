import React from 'react'
import TypewriterText from '../components/TypewriterText';
import carParkImage1 from '../images/car-park1.jpg'
import carParkImage2 from '../images/car-park2.jpg'
import carParkImage4 from '../images/car-park4.jpg'

import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center'>

        <div className='flex flex-col lg:flex-row justify-center gap-4 items-start px-2 pb-20 pt-10 lg:px-20'>
            <div className='flex flex-col lg:justify-start w-full items-start lg:pt-20 text-center lg:text-left'>         
                <TypewriterText  wordList={['Parking without stress']}/>
                <p className='text-slate-600 text-2xl mt-2'>Park your car with convenience.</p>
                <p className=' text-slate-900 text-lg my-5'>Use smart parking system to check for parking space before you drive.</p>
                
                <Link className='shadow-lg p-4 mt-5 mb-10 hover:bg-slate-800 bg-slate-900 text-white mx-auto lg:ml-0 px-10 rounded-md' href='/spaces'>
                    Get Started
                </Link>
            </div>
            <div className='w-full'>
                <Image src={carParkImage2} className='object-cover aspect-square rounded-full h-[300px] lg:h-[500px]' alt='car-park'/>
            </div>
        </div>

        <div className='flex flex-col lg:flex-row-reverse justify-center gap-8 items-start bg-slate-300 px-2 py-20 lg:px-20 group'>
            <div className='flex flex-col lg:justify-start w-full items-center lg:items-start lg:pt-20 text-center lg:text-left'>         
                <h1 className='font-bold text-xl lg:text-3xl text-slate-600'>Reserve a parking space</h1>
                <hr className='border-8 border-amber-100 rounded-lg w-20 group-hover:border-amber-500 mt-2 group-hover:w-8/12 transition-all duration-200 ease-linear'/>
                <p className='text-slate-900 text-lg my-5'>To ensure you have a space to park your car when you arrived, make a reservation.</p>
                
                <Link className='shadow-lg p-4 mt-5 mb-10 hover:bg-slate-800 bg-amber-600 text-white mx-auto lg:ml-0 px-10 rounded-md' href='/spaces'>
                    Reserve a space now
                </Link>
            </div>
            <div className='w-full'>
                <Image src={carParkImage4} className='aspect-square rounded-lg lh-[300px] lg:h-[400px]' alt='car-park'/>
            </div>
        </div>

        <div className='flex flex-col lg:flex-row justify-center gap-8 items-start bg-slate-700 px-2 py-20 lg:px-20 group'>
            <div className='flex flex-col lg:justify-start w-full items-center lg:items-start lg:pt-20 text-center lg:text-left text-white'>         
                <h1 className='font-bold text-xl lg:text-3xl text-center'>Subscribe for notification</h1>
                <hr className='border-8 border-amber-100 rounded-lg w-20 group-hover:border-slate-600 mt-2 group-hover:w-8/12 transition-all duration-200 ease-linear'/>
                <p className='text-slate-200 text-lg my-5'>
                    Wondering what to do when all spaces are occupied? No worry, our notification system alert you when space is available. 
                </p>
                
            </div>
            <div className='w-full'>
                <Image src={carParkImage1} className='aspect-square rounded-lg h-[300px] lg:h-[400px]' alt='car-park'/>
            </div>
        </div>
    </div>
  )
}

export default Home