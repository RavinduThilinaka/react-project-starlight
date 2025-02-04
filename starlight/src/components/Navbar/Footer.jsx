import React from 'react'
import { FaPhone,FaMapMarkerAlt, FaFacebook, FaLinkedin, FaGithub  } from 'react-icons/fa'
import Cards from "../../assets/paypal.png"
import{motion} from "framer-motion"
function Footer() {
  return (
    <>
        <footer className="bg-primary pt-12 pb-8 text-white">
            <div className="container">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    <motion.div className="space-y-6" initial={{opacity:0,y:100}} whileInView={{opacity:1,y:0}} transition={{delay:0.2,duration:0.6}}>
                        <h1 className='text-3xl font-bold uppercase'>Playing</h1>
                        <p className='text-sm max-w-[300px]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex dignissimos aut eius optio quis eum, deserunt quidem atque quae! Incidunt accusamus ullam, 
                            excepturi labore molestias laborum iusto sunt ducimus totam.
                        </p>
                        <div className="">

                            <p className='flex items-center gap-2'>
                                <FaPhone/>
                                +94123456789
                            </p>
                            <p className='flex items-center gap-2'>
                                <FaMapMarkerAlt />
                                Colombo,Sri lanka
                            </p>

                        </div>
                    </motion.div>

                    <motion.div className="space-x-6" initial={{opacity:0,y:100}} whileInView={{opacity:1,y:0}} transition={{delay:0.4,duration:0.6}}>
                        <h1 className='text-3xl font-bold'>Quick Links</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <ul className="space-y-2">
                                    <li>Home</li>
                                    <li>About</li>
                                    <li>Contact Us</li>
                                    <li>Privency policy</li>
                                </ul>
                            </div>

                            <div>
                                <ul  className="space-y-2">
                                    <li>Home</li>
                                    <li>About</li>
                                    <li>Contact Us</li>
                                    <li>Privency policy</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div className="space-y-6" initial={{opacity:0,y:100}} whileInView={{opacity:1,y:0}} transition={{delay:0.6,duration:0.6}}>
                        <h1 className='text-3xl font-bold'>Follow us</h1>
                        <div className="flex items-center gap-4">
                            <FaFacebook className='text-3xl hover:scale-105 duration-300'/>
                            <FaLinkedin className='text-3xl hover:scale-105 duration-300'/>
                            <FaGithub className='text-3xl hover:scale-105 duration-300'/>
                            <FaFacebook className='text-3xl hover:scale-105 duration-300'/>
                        </div>
                        <div className="space-y-2">
                            <p>Payment Method</p>
                            <img src={Cards} alt="" className='w-[80%]'/>
                        </div>
                    </motion.div>
                   
                </div>
                <p className='text-white text-center mt-8 border-t-2 pt-8'>@2025. All Right Reserved || Ravindu Thilinaka ❤️</p>
            </div>
        </footer>
    </>
  )
}

export default Footer