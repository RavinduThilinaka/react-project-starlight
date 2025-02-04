import React from 'react'
import { MdMenu } from 'react-icons/md'
import { FaShoppingCart } from "react-icons/fa";
import { UpdateFollower } from 'react-mouse-follower'
import{motion} from "framer-motion"
const NavbarMenu = [
  {
    id:1,
    title:"Home",
    link:"/"
  },
  {
    id:2,
    title:"Catogories",
    link:"#"
  },
  {
    id:3,
    title:"Blog",
    link:"#"
  },
  {
    id:4,
    title:"Register",
    link:"/register"
  },
  {
    id:5,
    title:"Login",
    link:"/login"
  },
]
const Navbar = () => {
  return (
    <>
      <div className="bg-brandDark text-white py-4">    
        <motion.nav className='container flex justify-between items-center' initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{duration:1,delay:0.5}}>
            <div className="">
              <a href="#" className='text-xl font-bold uppercase'>
                Playing / <span className='font-extralight text-white 70'>Market</span>
              </a>
            </div>

            <div className="hidden md:block">
              <ul className='flex items-center gap-4'>
                {
                  NavbarMenu.map((item)=>(
                    <li key={item.id}>
                      <UpdateFollower mouseOptions={{backgroundColor:'white',zIndex:999,followSpeed:1.5,scale:5,mixBlendMode:"difference"}}>
                        <a href={item.link} className='inline-block text-sm py-2 px-3 uppercase'>{item.title}</a>
                      </UpdateFollower>
                      
                    </li>
                  ))
                }

                  <UpdateFollower mouseOptions={{backgroundColor:'white',zIndex:999,followSpeed:1.5,scale:5,mixBlendMode:"difference"}}>
                    <button className="text-xl ps-14">
                      <FaShoppingCart/>
                    </button>
                  </UpdateFollower>
                
              </ul>
            </div>
            <div className="md:hidden">
              <MdMenu className='text-4xl'/>
            </div>
        </motion.nav>  
      </div>
    </>
   
  )
}

export default Navbar