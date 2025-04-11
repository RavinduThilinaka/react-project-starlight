import React from 'react'
import Watches from "../../assets/watches.png"
import { motion } from 'framer-motion'
import { UpdateFollower } from 'react-mouse-follower'

const fadeUp = (delay) => {
  return {
    hidden: {
      opacity: 0,
      y: 100,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay,
        ease: "easeOut"
      }
    }
  }
}

function Banner() {
  return (
    <section className='bg-brandDark py-16 relative overflow-hidden'>
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-grid-white/[0.03]"></div>
      </div>

      <div className="container py-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image Column */}
        <div className="relative z-10">
          <UpdateFollower
            mouseOptions={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              zIndex: 999,
              followSpeed: 1,
              scale: 3,
              mixBlendMode: "lighten"
            }}
          >
            <motion.img 
              src={Watches} 
              alt="Premium Watches"  
              className='w-[300px] md:w-[400px] mx-auto drop-shadow-2xl'
              initial={{ opacity:0, x:-100, rotate:-10, scale: 0.9 }}
              animate={{ opacity:1, x:0, rotate:0, scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 10, 
                delay: 0.2 
              }}
              whileHover={{
                rotate: [0, 5, -5, 0],
                transition: { duration: 0.8 }
              }}
            />
          </UpdateFollower>
        </div>

        {/* Text Column */}
        <div className="flex flex-col justify-center relative z-10">
          <div className="text-center md:text-left space-y-6 lg:max-w-[450px]">
            <motion.h1 
              className='text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300'
              variants={fadeUp(0.3)} 
              initial="hidden" 
              whileInView="show"
              viewport={{ once: true }}
            >
              Premium <span className="text-yellow-400">Watches</span> with Cutting-Edge Technology
            </motion.h1>
            
            <motion.p 
              className='text-gray-400 leading-relaxed'
              variants={fadeUp(0.5)} 
              initial="hidden" 
              whileInView="show"
              viewport={{ once: true }}
            >
              Experience precision timekeeping with our luxury watch collection. Crafted with premium materials and innovative technology for those who appreciate the finer details in life.
            </motion.p>
            
            <motion.button 
              variants={fadeUp(0.7)} 
              initial="hidden" 
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ 
                y: -3,
                backgroundColor: "#facc15",
                color: "#000",
                boxShadow: "0 10px 20px rgba(250, 204, 21, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className='px-8 py-3 rounded-md bg-gray-900 border border-gray-700 text-white font-medium flex items-center gap-2 w-fit mx-auto md:mx-0 group'
            >
              <span>Discover Collection</span>
              <motion.span
                className="group-hover:translate-x-1 transition-transform"
                transition={{ type: "spring", stiffness: 400 }}
              >
                →
              </motion.span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
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
    </section>
  )
}

export default Banner