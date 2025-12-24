import React from 'react'
import { delay, motion } from "motion/react"
import { stepsData  } from '../assets/assets/assets'

const Steps = () => {
  return (
    <motion.div 
    initial={{ opacity: 0.2, y: 100 }}
    transition={{ duration: 1 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    
    className='flex flex-col items-center justify-center my-38 '>
        
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>
            How it works
        </h1>
        <p className='text-lg text-gray-600 mb-8'>
            Transform Words Into Stunning Images
        </p>

        <div className='space-y-4 w-full max-w-3xl text-sm '>
          {stepsData.map((item, idx)=>(
            <div key={idx} className='flex items-center space-x-4 bg-white/20 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
              <img width={40} src={item.icon} alt="" />
              <div>
                <h2 className='text-xl font-medium '>{item.title}  </h2>
                <p className='text-gray-500'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
    </motion.div>
  )
}

export default Steps