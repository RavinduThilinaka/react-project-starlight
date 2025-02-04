import React from 'react'
import Watches from "../../assets/watches.png"
import {delay, motion} from 'framer-motion'
import { UpdateFollower } from 'react-mouse-follower'

const fadeUp = (delay) =>{
    return{
        hidden:{
            opacity:0,
            y:100,
        },
        show:{
            opacity:1,
            y:0,
            transition:{
                duration:0.5,
                delay:delay,
            }
        }
    }
  }
function Banner() {
  return (
    <>
        <section>
            <div className="container py-14 grid grid-cols-1 md:grid-cols-2 space-y-6 md:space-y-0 gap-12">
                <div className="">
                    <motion.img src={Watches} alt=""  className='w-[300px] md:w-[400px] mx-auto'initial={{opacity:0,x:-100,rotate:-10}} animate={{opacity:1,x:0,rotate:0}} transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }} />
                </div>
                <div className="flex flex-col justify-center ">
                    <div className="text-center md:text-left space-y-4 lg:max-w-[450px]">
                        <motion.h1 className='text-3xl lg:text-4xl font-semibold' variants={fadeUp(0.9)} initial="hidden" whileInView="show" >The latest headphone with the latest technology</motion.h1>
                        <motion.p variants={fadeUp(0.7)} initial="hidden" whileInView="show">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos culpa dignissimos repellendus reiciendis nulla necessitatibus facilis amet harum asperiores! Eligendi ea officia praesentium corrupti ullam sint quam nemo sapiente asperiores.</motion.p>
                        <UpdateFollower 
                            mouseOptions={{
                                backgroundColor:"white",
                                zIndex:9999,
                                followSpeed:0.5,
                                mixBlendMode:"difference",
                                scale:5}}>
                            <motion.button variants={fadeUp(1.3)} initial="hidden" whileInView="show" className='border-2 border-[#e33343] text-[#e33343] px-6 py-2 rounded-md hover:bg-[#e33343] hover:text-white'>Shop Now</motion.button>
                        </UpdateFollower>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Banner