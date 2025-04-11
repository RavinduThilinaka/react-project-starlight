import React from 'react'
import Shoes from "../../assets/shoes.png"
import Laptop from "../../assets/laptop.png"
import Cloths from "../../assets/cloths.png"
import Phone from "../../assets/phones.png"
import Headphone from "../../assets/headphones4.png"
import { FaWhatsapp } from 'react-icons/fa'
import { UpdateFollower } from 'react-mouse-follower'
import { AnimatePresence, easeInOut, motion } from "framer-motion"
import { FaShoppingCart, FaStar, FaArrowRight } from "react-icons/fa";

// Enhanced animation variants
const fadeUp = (delay) => {
  return {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.5,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: delay,
        ease: easeInOut
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.5,
      transition: {
        duration: 0.5,
        ease: easeInOut,
      }
    }
  }
}

const rotate = {
  hidden: { rotate: -180, opacity: 0 },
  show: {
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      type: "spring",
      bounce: 0.4
    }
  }
}

const starlightData = [
  {
    id: 1,
    image: Headphone,
    title: "Wireless Headphones",
    subtitle: "Experience high-quality sound with our top-notch wireless headphones.",
    price: "$150",
    size: "Over-Ear",
    bgColor: "#000000",
    rating: 4.8
  },
  {
    id: 2,
    image: Shoes,
    title: "Sport Shoes",
    subtitle: "Get the best comfort and grip with our premium sports shoes.",
    price: "$120",
    size: "Size 10",
    bgColor: "#0000FF",
    rating: 4.6
  },
  {
    id: 3,
    image: Cloths,
    title: "Stylish Apparel",
    subtitle: "Trendy and comfortable clothing for all occasions.",
    price: "$80",
    size: "Medium",
    bgColor: "#4169E1",
    rating: 4.5
  },
  {
    id: 4,
    image: Laptop,
    title: "Powerful Laptop",
    subtitle: "Boost your productivity with our high-performance laptops.",
    price: "$1200",
    size: "15-inch",
    bgColor: "#36454F",
    rating: 4.9
  },
  {
    id: 5,
    image: Phone,
    title: "Latest Smartphone",
    subtitle: "Stay connected with the latest technology in your hands.",
    price: "$999",
    size: "6.5-inch",
    bgColor: "#C0C0C0",
    rating: 4.7
  },
]

const Hero = () => {
  const [activeData, setActiveData] = React.useState(starlightData[0])
  const [isHovering, setIsHovering] = React.useState(false)

  const handleActiveData = (data) => {
    setActiveData(data)
  }

  return (
    <>
      <section className='bg-brandDark text-white relative overflow-hidden'>
        {/* Floating background elements */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 2 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[600px] relative z-10">
          <div className="flex flex-col justify-center py-14 md:py-0 xl:max-w-[500px]">
            <div className="space-y-5 text-center md:text-left">
              <AnimatePresence mode='wait'>
                <UpdateFollower mouseOptions={{ backgroundColor: "white", zIndex: 9999, followSpeed: 0.5, rotate: -720, mixBlendMode: "difference", scale: 10 }}>
                  <motion.h1 
                    key={activeData.id} 
                    variants={fadeUp(0.2)} 
                    initial="hidden" 
                    animate="show" 
                    exit="exit" 
                    className='text-3xl lg:text-6xl font-bold font-varela bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'
                  >
                    {activeData.title}
                  </motion.h1>
                </UpdateFollower>
              </AnimatePresence>
              
              <AnimatePresence>
                <motion.p 
                  key={activeData.id} 
                  variants={fadeUp(0.3)} 
                  initial="hidden" 
                  animate="show" 
                  exit="exit"  
                  className='text-sm leading-loose text-white/80'
                >
                  {activeData.subtitle}
                </motion.p>
              </AnimatePresence>

              <div className="flex items-center gap-2">
                <AnimatePresence>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: i < Math.floor(activeData.rating) ? 1 : 0.8 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <FaStar className={i < Math.floor(activeData.rating) ? "text-yellow-400" : "text-gray-500"} />
                    </motion.div>
                  ))}
                </AnimatePresence>
                <motion.span 
                  className="text-xs text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  ({activeData.rating})
                </motion.span>
              </div>

              <AnimatePresence>
                <UpdateFollower mouseOptions={{ backgroundColor: activeData.bgColor, zIndex: 9999, followSpeed: 0.5, rotate: -720, mixBlendMode: "difference", scale: 6, backgroundElement: <div><img src={activeData.image} alt="" /></div> }}>
                  <motion.button 
                    key={activeData.id} 
                    variants={fadeUp(0.3)} 
                    initial="hidden" 
                    animate="show" 
                    exit="exit" 
                    className='px-6 py-3 inline-flex items-center gap-2 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'
                    style={{ 
                      backgroundColor: activeData.bgColor,
                      transition: "all 0.3s ease-in-out" 
                    }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <span>Buy Now</span>
                    <motion.span
                      animate={{ x: isHovering ? 5 : 0 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <FaArrowRight />
                    </motion.span>
                  </motion.button>
                </UpdateFollower>
              </AnimatePresence>

              <div className="flex items-center justify-center md:justify-start gap-4 !mt-24">
                <motion.div 
                  className="w-20 h-[1px] bg-gradient-to-r from-transparent to-white"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.p 
                  className="uppercase text-sm tracking-widest"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Best Deals for You
                </motion.p>
                <motion.div 
                  className="w-20 h-[1px] bg-gradient-to-l from-transparent to-white"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div className="grid grid-cols-3 gap-6">
                {starlightData.map((item) => {
                  return (
                    <motion.div 
                      key={item.id} 
                      variants={fadeUp(0.2)} 
                      initial="hidden" 
                      animate="show" 
                      exit="exit"
                      whileHover={{ y: -5 }}
                      className="relative"
                    >
                      <UpdateFollower mouseOptions={{ backgroundColor: item.bgColor, zIndex: 9999, followSpeed: 0.5, scale: 5, text: "View Details", textFontSize: "3px" }}>
                        <div 
                          className={`grid grid-cols-2 place-items-center cursor-pointer p-3 rounded-xl transition-all duration-300 ${activeData.id === item.id ? 'ring-2 ring-white' : 'hover:ring-1 hover:ring-white/50'}`}
                          key={item.id} 
                          onClick={() => handleActiveData(item)}
                          style={{ backgroundColor: `${item.bgColor}20` }}
                        >
                          <motion.div 
                            className=""
                            whileHover={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            <img src={item.image} alt="" className='w-[190px] hover:scale-105 transition-transform duration-300' />
                          </motion.div>
                          <div className="space-y-2">
                            <p className='text-base font-bold'>{item.size}</p>
                            <p className='text-xs font-normal text-nowrap'>{item.price}</p>
                          </div>
                        </div>
                      </UpdateFollower>
                    </motion.div>
                  )
                })}
              </div>  
            </div>
          </div>
          
          <div className="flex flex-col justify-end items-center relative">
            {/* Floating price tag */}
            <motion.div 
              className="absolute top-20 right-10 md:right-20 bg-white text-black px-4 py-2 rounded-full shadow-xl flex items-center gap-2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
            >
              <span className="font-bold">{activeData.price}</span>
              <motion.div
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <FaShoppingCart />
              </motion.div>
            </motion.div>
            
            <AnimatePresence mode='wait'>
              <motion.img 
                src={activeData.image} 
                alt="" 
                className='w-[300px] md:w-[400px] xl:w-[550px] drop-shadow-2xl' 
                variants={fadeUp(0.4)} 
                initial={{ opacity: 0, scale: 0.9, y: 100 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.9, y: 100, transition: { duration: 0.2 } }} 
                transition={{ duration: 0.4, delay: 0.2, ease: easeInOut }}  
                key={activeData.id}
                whileHover={{ scale: 1.05 }}
              />
            </AnimatePresence>
            
            {/* Floating particles around the product */}
            <motion.div 
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: Math.random() * 10 + 2,
                    height: Math.random() * 10 + 2,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: 0.3
                  }}
                  animate={{
                    y: [0, Math.random() * 100 - 50],
                    x: [0, Math.random() * 100 - 50],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </div>
          
          {/* Enhanced WhatsApp button */}
          <motion.div 
            className="fixed bottom-10 right-10 z-[99999]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
          >
            <a href="#" className="relative group">
              <motion.div
                className="absolute inset-0 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <FaWhatsapp className="text-4xl text-white mix-blend-difference group-hover:rotate-[360deg] transition-transform duration-500 relative z-10" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Hero