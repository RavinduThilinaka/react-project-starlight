import React from 'react'
import Blog1 from "../../assets/blog.jpg"
import Blog2 from "../../assets/blog2.jpg"
import Blog3 from "../../assets/blog3.jpg"
import Blog4 from "../../assets/blog4.jpg"
import { UpdateFollower } from 'react-mouse-follower'
import { motion, AnimatePresence } from "framer-motion"
import { FaArrowRight, FaCalendarAlt, FaUser } from "react-icons/fa"

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

const BlogData = [
    {
        id:1,
        title:"The Future of E-Commerce in 2023",
        desc:"Explore how emerging technologies are transforming online shopping experiences and what businesses need to adapt.",
        link:"#",
        img:Blog1,
        date: "June 15, 2023",
        author: "Sarah Johnson"
    },
    {
        id:2,
        title:"Sustainable Fashion Trends",
        desc:"Discover how eco-friendly materials and ethical production are reshaping the fashion industry this season.",
        link:"#",
        img:Blog2,
        date: "May 28, 2023",
        author: "Michael Chen"
    },
    {
        id:3,
        title:"Tech Gadgets You Can't Miss",
        desc:"Our roundup of the most innovative tech products hitting the market this quarter.",
        link:"#",
        img:Blog3,
        date: "April 10, 2023",
        author: "David Wilson"
    },
    {
        id:4,
        title:"Home Office Essentials",
        desc:"Create the perfect productive workspace with these must-have items for remote workers.",
        link:"#",
        img:Blog4,
        date: "March 22, 2023",
        author: "Emily Rodriguez"
    },
]

function Blog() {
  return (
    <section className='bg-brandDark py-20 relative overflow-hidden'>
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
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
              y: [0, Math.random() * 40 - 20],
              x: [0, Math.random() * 40 - 20],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className='text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600'>
            Latest Insights
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Discover our curated collection of articles and stay updated with the latest trends
          </p>
        </motion.div>

        <UpdateFollower 
          mouseOptions={{
            backgroundColor:"rgba(255,255,255,0.1)",
            zIndex:999,
            followSpeed:1.5,
            text:"Read More →",
            textColor:"white",
            textFontSize:"12px",
            scale:5
          }}
        >
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {BlogData.map((data) => (
              <motion.div 
                key={data.id}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 rounded-xl z-10" />
                
                <div className="h-full flex flex-col bg-gray-900 border border-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:border-yellow-500">
                  <div className="relative h-48 overflow-hidden">
                    <motion.img 
                      src={data.img} 
                      alt="" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                      <span className="bg-gray-800 text-yellow-400 text-xs px-2 py-1 rounded-full flex items-center gap-1 border border-yellow-400/30">
                        <FaCalendarAlt className="text-xs" />
                        {data.date}
                      </span>
                      <span className="bg-gray-800 text-yellow-400 text-xs px-2 py-1 rounded-full flex items-center gap-1 border border-yellow-400/30">
                        <FaUser className="text-xs" />
                        {data.author}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-400 transition-colors">
                      {data.title}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {data.desc}
                    </p>
                    
                    <div className="mt-auto">
                      <a 
                        href={data.link} 
                        className="inline-flex items-center text-yellow-400 font-medium group-hover:text-white transition-colors"
                      >
                        Read article
                        <motion.span
                          className="ml-2"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <FaArrowRight />
                        </motion.span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </UpdateFollower>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500">
            View All Articles
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Blog