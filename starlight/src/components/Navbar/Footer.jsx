import React from 'react'
import { FaPhone, FaMapMarkerAlt, FaFacebook, FaLinkedin, FaGithub, FaArrowRight } from 'react-icons/fa'
import { motion } from "framer-motion"
import Cards from "../../assets/paypal.png"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

function Footer() {
  return (
    <footer className="bg-black py-10 text-gray-300">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <motion.div 
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            <h1 className='text-2xl font-bold text-white'>Playing</h1>
            <p className='text-sm'>
              Premium products and services for your lifestyle. Quality you can trust.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <FaPhone className="text-gray-400"/>
                +94 123 456 789
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FaMapMarkerAlt className="text-gray-400"/>
                Colombo, Sri Lanka
              </div>
            </div>
          </motion.div>

          {/* Links Column */}
          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-white font-medium mb-3">Quick Links</h2>
              <ul className="space-y-2 text-sm">
                {['Home', 'About', 'Services', 'Products'].map((item, i) => (
                  <motion.li 
                    key={i}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a href="#" className="flex items-center gap-1 hover:text-white">
                      <FaArrowRight className="text-xs"/>
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-white font-medium mb-3">Support</h2>
              <ul className="space-y-2 text-sm">
                {['Contact', 'FAQ', 'Privacy', 'Terms'].map((item, i) => (
                  <motion.li 
                    key={i}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a href="#" className="flex items-center gap-1 hover:text-white">
                      <FaArrowRight className="text-xs"/>
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Social Column */}
          <motion.div 
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white font-medium">Connect With Us</h2>
            <div className="flex gap-3">
              {[
                { icon: <FaFacebook />, color: 'hover:text-blue-400' },
                { icon: <FaLinkedin />, color: 'hover:text-blue-500' },
                { icon: <FaGithub />, color: 'hover:text-gray-100' }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className={`text-xl ${social.color} transition-colors`}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            
            <div className="pt-2">
              <p className="text-sm mb-2">We Accept</p>
              <img src={Cards} alt="Payment methods" className="h-8 object-contain"/>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          className="mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          © {new Date().getFullYear()} Playing. All rights reserved | Ravindu Thilinaka
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer