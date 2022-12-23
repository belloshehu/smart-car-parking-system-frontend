import React from 'react'

const DashBoard = () => {
  return (
    <div className='w-full hidden items-center justify-center flex-col  md:flex'>
        <iframe 
          src="https://tatrawo.cloud.shiftr.io/embed?widgets=1" 
          width="100%" 
          height="500" 
          frameborder="0" 
          allowfullscreen
          className='shadow-md shadow-white'
        >
        
        </iframe>
    </div>
  )
}

export default DashBoard