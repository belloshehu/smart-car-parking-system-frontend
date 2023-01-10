import React from 'react'

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center pt-10 lg:pt-0'>
        <TypewriterText  wordList={['Parking without stress']}/>
        <p className='text-slate-500 text-lg my-5'>Use smart parking system to check for parking space before you drive. </p>
    
    </div>
  )
}

export default Home