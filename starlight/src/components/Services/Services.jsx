import React from 'react'
import Icon1 from '../../assets/plane.png'
import Icon2 from '../../assets/setting.png'
import Icon3 from '../../assets/time.png'
import { UpdateFollower } from 'react-mouse-follower'
import {motion} from "framer-motion"
import { data } from 'react-router-dom'

const ServiceData = [
  {
    id:1,
    title:"Security",
    icon:Icon1,
    desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, fugit fuga? Non sit sapiente vero ratione error recusandae sequi cum nulla voluptas corporis, reiciendis voluptates hic quaerat illo facilis consectetur.",
    delay:0.5
  },
  {
    id:2,
    title:"Gurentee",
    icon:Icon2,
    desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, fugit fuga? Non sit sapiente vero ratione error recusandae sequi cum nulla voluptas corporis, reiciendis voluptates hic quaerat illo facilis consectetur.",
    delay:0.8
  },
  {
    id:3,
    title:"Affordability",
    icon:Icon3,
    desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, fugit fuga? Non sit sapiente vero ratione error recusandae sequi cum nulla voluptas corporis, reiciendis voluptates hic quaerat illo facilis consectetur.",
    delay:1.1
  },
]

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
function Services() {
  return (
    <>
      <section className='bg-gray-100 py-8'>
        <div className="container py-14">
            <motion.h1 className='text-3xl font-bold text-center pb-10'variants={fadeUp(0.2)} initial="hidden" whileInView="show">Services</motion.h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" >
            {ServiceData.map((data) => (
              <UpdateFollower
              key={data.id} 
                mouseOptions={{
                  backgroundColor:"white",
                  zIndex:9999,
                  followSpeed:0.5,
                  scale:5,
                  rotote:720,
                  mixBlendMode:"darken",
                  backgroundElement:(
                    <motion.div>
                      <img src={data.icon} alt=""  />
                    </motion.div>
                  )
              }}
              >
                <motion.div className="flex flex-col items-center justify-center p-5 max-w-[300px] mx-auto shadow-lg rounded-xl bg-white" variants={fadeUp(data.delay)} initial="hidden" whileInView="show" key={data.id}>
                  <img src={data.icon} alt="" className='w-[100px] mb-4 ' />
                  <div className="text-center space-y-2">
                  <h1 className='text-2xl font-bold' key={data.id}>{data.title}</h1>
                  <p className='text-center text-sm text-black/75'>{data.desc}</p>
                </div>
                </motion.div>
               
              </UpdateFollower>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Services