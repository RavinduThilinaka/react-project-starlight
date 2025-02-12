import { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineHome, AiOutlineUser, AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";

export default function Admin() {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <AiOutlineHome className="w-6 h-6" /> },
    { name: "Users", icon: <AiOutlineUser className="w-6 h-6" /> },
    { name: "Settings", icon: <AiOutlineSetting className="w-6 h-6" /> },
  ];

  return (
    <>
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col">
                <h1 className="text-2xl font-bold mb-6">Admin <span className="text-3xl">Panel</span></h1>
                <nav className="flex-1">
                    {menuItems.map((item) =>(
                        <motion.div
                            key={item.name}
                            whileHover={{scale:1.1}}
                            whileTap={{scale:0.9}}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                                active === item.name ? "bg-gray-700" : "hover:bg-gray-800"
                            }`}
                            onClick={()=>setActive(item.name)}
                        >
                            {item.icon}
                            <span>{item.name}</span>

                        </motion.div>
                    ))}
                </nav>

                <button className="flex items-center gap-3 p-3 mt-5 border-red-600 rounded-lg hover:bg-red-700 transition">
                    <AiOutlineLogout/>
                    Login
                </button>
            </aside>

            <main className="flex-1 p-6">
                <header className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-semibold">Welcome,Admin</h2>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {title:"Total Users",value:"1,200"},
                        {title:"Orders Today",value:"320"},
                        {title:"Revenue",value:"$45,000"}
                    ].map((stat,index) =>(
                        <motion.div
                            key={stat.title}
                            initial={{opacity:0,y:50}}
                            animate={{opacity:1,y:0}}
                            transition={{delay:index*0.2}}
                            className="bg-white p-6 rounded-xl shadow-md"
                        >
                            <h3 className="text-lg font-semibold">{stat.title}</h3>
                            <p className="text-2xl font-bold mt-2">{stat.value}</p>

                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    </>
  );
}
