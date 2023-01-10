import React from 'react'
import {useTypewriter} from 'react-simple-typewriter'

const TypewriterText = ({wordList}) => {
    const [text, helper ]= useTypewriter({
        words: wordList,
        loop: 0
    })

    const { isType, isDelete, isDelay, isDone } = helper
    return (
        <div className='text-center md:text-left pb-0 w-full bg-slate-0 duration-200 transition-all ease-in-out'>
            <h1 className='text-slate-900 text-3xl md:text-6xl font-extrabold text-center align-bottom'>
                {text}
                <span className='text-amber-500 text-md font-normal'>|</span>
            </h1>
        </div>
    )
}

export default TypewriterText