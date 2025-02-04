import React from 'react'
import Shoes from "../../assets/shoes.png"
import Laptop from "../../assets/laptop.png"
import Cloths from "../../assets/cloths.png"
import Phone from "../../assets/phones.png"
import Headphone from "../../assets/headphones4.png"
import { FaWhatsapp } from 'react-icons/fa'
import { UpdateFollower } from 'react-mouse-follower'
import{AnimatePresence, easeInOut, motion} from "framer-motion"
import { FaShoppingCart } from "react-icons/fa";
const fadeUp = (delay ) =>{
  return{
    hidden:{
      opacity:0,
      y:100,
      scale:0.5,
    },
    show:{
      opacity:1,
      y:0,
      scale:1,
      transition:{
        duration:0.5,
        delay:delay,
        ease:easeInOut
      },
    },

    exit:{
      opacity:0,
      y:50,
      scale:0.5,
      transition:{
        duration:0.5,
        ease:easeInOut,
      }
    }
  }
}
const starlightData = [
    {
        id:1,
        image:Headphone,
        title:"Wireless Headphones",
        subtitle:"Experience high-quality sound with our top-notch wireless headphones.",
        price:"$150",
        size: "Over-Ear",
        bgColor:"#000000"
    },
    {
        id: 2,
        image: Shoes,
        title: "Sport Shoes",
        subtitle: "Get the best comfort and grip with our premium sports shoes.",
        price: "$120",
        size: "Size 10",
        bgColor: "#0000FF"
  },
  {
    id: 3,
    image: Cloths,
    title: "Stylish Apparel",
    subtitle: "Trendy and comfortable clothing for all occasions.",
    price: "$80",
    size: "Medium",
    bgColor: "#4169E1"
},
{
    id: 4,
    image: Laptop,
    title: "Powerful Laptop",
    subtitle: "Boost your productivity with our high-performance laptops.",
    price: "$1200",
    size: "15-inch",
    bgColor: "#36454F"
},
{
    id: 5,
    image: Phone,
    title: "Latest Smartphone",
    subtitle: "Stay connected with the latest technology in your hands.",
    price: "$999",
    size: "6.5-inch",
    bgColor: "#C0C0C0"
},
]
const Hero = () => {
  const [activeData,setActiveData] = React.useState(starlightData[0])
  const handleActiveData = (data)=>{
    setActiveData(data);
  }
  return (
    <>
        <section className='bg-brandDark text-white'>
            <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
              <div className="flex flex-col justify-center py-14 md:py-0 xl:max-w-[500px]">
                <div className="space-y-5 text-center md:text-left">
                  <AnimatePresence mode='wait'>
                    <UpdateFollower mouseOptions={{backgroundColor:"white",zIndex:9999,followSpeed:0.5,rotate:-720,mixBlendMode:"difference",scale:10}}>
                      <motion.h1 key={activeData.id} variants={fadeUp(0.2)} initial="hidden" animate="show" exit="exit" className='text-3xl lg:text-6xl font-bold font-varela'>{activeData.title}</motion.h1>
                    </UpdateFollower>
                  </AnimatePresence>
                  <AnimatePresence>
                      <motion.p key={activeData.id} variants={fadeUp(0.3)} initial="hidden" animate="show" exit="exit"  className='text-sm leading-loose text-white/80'>{activeData.subtitle}</motion.p>
                  </AnimatePresence>

                  <AnimatePresence>
                    <UpdateFollower mouseOptions={{backgroundColor:activeData.bgColor,zIndex:9999,followSpeed:0.5,rotate:-720,mixBlendMode:"difference",scale:6,backgroundElement:<div><img src={activeData.image} alt="" /></div>}}>
                      <motion.button key={activeData.id} variants={fadeUp(0.3)} initial="hidden" animate="show" exit="exit" className='px-4 py-2 inline-block font-normal rounded-sm' style={{backgroundColor:activeData.bgColor,transition: "background-color 0.3s ease-in-out"}}>Buy Now</motion.button>
                    </UpdateFollower>
                  </AnimatePresence>
                  <div className="flex items-center justify-center md:justify-start gap-4 !mt-24'">
                    <div className="w-20 h-[1px] bg-white"></div>
                    <p className="uppercase text-sm">Best Deals for You</p>
                    <div className="w-20 h-[1px] bg-white"></div>
                  </div>
                    <div className="grid grid-cols-3 gap-10">
                      {starlightData.map((item)=>{
                        return(
                          <motion.div key={item.id} variants={fadeUp(0.2)} initial="hidden" animate="show" exit="exit">
                          <UpdateFollower mouseOptions={{backgroundColor:item.bgColor,zIndex:9999,followSpeed:0.5,scale:5,text:"View Details",textFontSize:"3px"}}>
                            <div className="grid grid-cols-2 place-items-center cursor-pointer" key={item.id} onClick={()=>handleActiveData(item)}>
                              <div className="">
                                <img src={item.image} alt="" className='w-[190px]'/>
                              </div>
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
              <div className="flex flex-col justify-end items-center">
                <AnimatePresence mode='wait'>
                  <motion.img src={activeData.image} alt="" className='w-[300px] md:w-[400px] xl:w-[550px]' variants={fadeUp(0.4)} initial={{opacity:0,scale:0.9,y:100}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.9,y:100,transition:{duration:0.2}}} transition={{duration:0.4,delay:0.2,ease:easeInOut}}  key={activeData.id}/>
                </AnimatePresence>
              </div>
              <div className="text-3xl text-white fixed bottom-10 right-10 hover:rotate-[360deg] duration-500 z-[99999] mix-blend-difference">
                <a href="">
                  <FaWhatsapp className=''/>
                </a>
              </div>
            </div>
        </section>
    </>
  )
}

export default Hero