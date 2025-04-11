import React from 'react'
import Icon1 from '../../assets/plane.png'
import Icon2 from '../../assets/setting.png'
import Icon3 from '../../assets/time.png'
import { UpdateFollower } from 'react-mouse-follower'
import { motion } from "framer-motion"

const ServiceData = [
  {
    id: 1,
    title: "Security",
    icon: Icon1,
    desc: "Advanced protection for your assets with cutting-edge security protocols and 24/7 monitoring.",
    delay: 0.3
  },
  {
    id: 2,
    title: "Guarantee",
    icon: Icon2,
    desc: "Our satisfaction guarantee ensures you get exactly what you pay for, with no compromises.",
    delay: 0.6
  },
  {
    id: 3,
    title: "Affordability",
    icon: Icon3,
    desc: "Premium services at competitive prices without sacrificing quality or performance.",
    delay: 0.9
  },
]

const fadeUp = (delay) => {
  return {
    hidden: {
      opacity: 0,
      y: 50,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: delay,
        ease: "easeOut"
      }
    }
  }
}

const cardHover = {
  scale: 1.03,
  y: -10,
  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  transition: {
    duration: 0.3,
    ease: "easeOut"
  }
}

function Services() {
  return (
    <section className='bg-brandDark py-16 relative overflow-hidden'>
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: Math.random() * 40 + 10,
              height: Math.random() * 40 + 10,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 60 - 30],
              x: [0, Math.random() * 60 - 30],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: Math.random() * 12 + 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        <motion.h1 
          className='text-4xl font-bold text-center pb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400'
          variants={fadeUp(0.2)} 
          initial="hidden" 
          whileInView="show"
          viewport={{ once: true }}
        >
          Our Premium Services
        </motion.h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ServiceData.map((data) => (
            <UpdateFollower
              key={data.id}
              mouseOptions={{
                backgroundColor: "rgba(255,255,255,0.1)",
                zIndex: 9999,
                followSpeed: 0.5,
                scale: 4,
                mixBlendMode: "lighten",
                backgroundElement: (
                  <motion.div>
                    <img src={data.icon} alt="" className="w-16 opacity-80" />
                  </motion.div>
                )
              }}
            >
              <motion.div 
                className="flex flex-col items-center p-8 rounded-xl bg-gray-900 border border-gray-800 hover:border-yellow-400 transition-colors h-full"
                variants={fadeUp(data.delay)} 
                initial="hidden" 
                whileInView="show"
                whileHover={cardHover}
                viewport={{ once: true }}
              >
                <div className="mb-6 p-4 bg-gray-800 rounded-full">
                  <motion.img 
                    src={data.icon} 
                    alt="" 
                    className='w-16 h-16 object-contain'
                    whileHover={{ rotate: 20 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </div>
                
                <div className="text-center space-y-4">
                  <h1 className='text-2xl font-bold text-white'>{data.title}</h1>
                  <p className='text-gray-400 leading-relaxed'>{data.desc}</p>
                </div>
              </motion.div>
            </UpdateFollower>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services