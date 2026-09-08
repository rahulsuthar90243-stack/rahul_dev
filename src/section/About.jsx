import { div, section } from 'framer-motion/client'
import React from 'react'
import {motion} from "framer-motion"
import profile from "../assets/profile.png"

function About() {

  const glows = [
    "-top-10 -left-10 w-[360px] h-[360px] opacity-2 blur-[120px]",
    "bottom-0 right-10 w-[420px] h-[420px] opacity-9 blur-[140px] delay-300",
    // "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-10 blur-[100px]"
  ]

  return (
    <section id='about'
     className='min-h-screen w-full felx items-center justify-center relative bg-black text-white overflow-hidden'>
    
    <div className='absolute inset-0 pointer-events-none'>
      {glows.map((c, i) => (
        <div key={i} className={`absolute rounded-full bg-gradient-to-r from-[#302b63] via-[#08a17b] to-[#109793] animate-pulse ${c}`}/>
      ))}
    </div>

    <div className='relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12'>
    <motion.div className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
     initial={{ opacity: 0, y: 12 }}
     whileInView={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.6 }}
     viewport={{ once: true , amount: 0.5}}>

    <motion.div className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-r from-[#302b63]/20 to-[#302b63]/20 border border-[#1cd8d2]/25" >
      <img src={profile} alt="profile"className='absolute  inset-0' />
    </motion.div>

    <div className='flex-1 flex flex-col justify-center text-center md:text-left'>
      <h2 className='text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#01b689] to-[#04a19c] animate-pulse'>
        Rahul Suthar
      </h2>
    </div>
    </motion.div>
    </div>
    </section>
  )
}

export default About 