import React from 'react'
import { UpdateFollower } from 'react-mouse-follower'
import { motion } from "framer-motion"
import { FaHeadphones } from "react-icons/fa"

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

const pulse = {
  scale: [1, 1.03, 1],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }
}

function BannerText() {
  return (
    <section className='py-16 text-center relative overflow-hidden bg-brandDark'>
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: Math.random() * 60 + 20,
              height: Math.random() * 60 + 20,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 80 - 40],
              x: [0, Math.random() * 80 - 40],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 px-4">
        <UpdateFollower
          mouseOptions={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            zIndex: 999,
            followSpeed: 1.2,
            scale: 4,
            mixBlendMode: "lighten"
          }}
        >
          <motion.div 
            className="bg-black border-2 border-gray-800 text-white rounded-2xl p-8 relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            whileHover={{ 
              scale: 1.01,
              borderColor: "rgba(255,255,255,0.3)"
            }}
            transition={{ duration: 0.5 }}
            variants={fadeIn}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 to-blue-500/20 blur-md opacity-0 hover:opacity-50 transition-opacity duration-300"></div>

            <motion.div 
              className="flex flex-col items-center relative z-10"
              animate={pulse}
            >
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mb-8"
              >
                <FaHeadphones className="text-5xl text-yellow-400" />
              </motion.div>
              
              <h2 className="font-bold text-4xl md:text-5xl max-w-[700px] mx-auto leading-normal">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                  Headphones with </span>
                <span className="text-yellow-400">Exceptional</span> 
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"> Quality & </span>
                <span className="text-yellow-400">Affordable</span> 
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"> Price</span>
              </h2>
              
              <motion.p 
                className="mt-6 text-lg text-gray-400 max-w-[600px] mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Premium audio experience without compromising your budget
              </motion.p>
              
              <motion.button
                whileHover={{ 
                  y: -3, 
                  backgroundColor: "#facc15",
                  color: "#000"
                }}
                whileTap={{ scale: 0.95 }}
                className="mt-10 px-8 py-3.5 bg-gray-900 border border-gray-700 text-white rounded-full font-medium flex items-center gap-2 group"
              >
                <span>Shop Now</span>
                <motion.span
                  className="group-hover:translate-x-1 transition-transform"
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          </motion.div>
        </UpdateFollower>
      </div>
    </section>
  )
}

export default BannerText