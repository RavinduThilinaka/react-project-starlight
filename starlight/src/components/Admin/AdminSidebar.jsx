import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  AiOutlineDashboard, AiOutlineUser, AiOutlineShoppingCart, 
  AiOutlineDollar, AiOutlinePieChart, AiOutlineLogout,
  AiOutlineSetting
} from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';

const AdminSidebar = ({ isSidebarOpen, handleLogout }) => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', icon: <AiOutlineDashboard className="w-5 h-5"/>, path: "/admin" },
    { name: 'Users', icon: <FiUsers className="w-5 h-5" />, path: "/users" },
    { name: 'Orders', icon: <AiOutlineShoppingCart className="w-5 h-5" />, path: "/orders" },
    { name: 'Payments', icon: <AiOutlineDollar className="w-5 h-5" />, path: "/payments" },
    { name: 'Analytics', icon: <AiOutlinePieChart className="w-5 h-5" />, path: "/analytics" },
    { name: 'Settings', icon: <AiOutlineSetting className="w-5 h-5" />, path: "/settings" },
  ];

  return (
    <motion.aside 
      initial={{ x: -100 }}
      animate={{ x: isSidebarOpen ? 0 : -300 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 flex flex-col shadow-xl z-10 fixed h-full"
    >
      <motion.h1 
        whileHover={{ scale: 1.05 }}
        className="text-2xl font-bold mb-8 flex items-center gap-2"
      >
        <span className="bg-blue-500 p-2 rounded-lg">Admin</span>
        {isSidebarOpen && <span className="text-gray-300">Panel</span>}
      </motion.h1>
      
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            className={({ isActive }) => 
              `flex items-center gap-3 p-3 rounded-lg transition-all ${
                isActive 
                  ? "bg-blue-600 shadow-lg" 
                  : "hover:bg-gray-700 hover:shadow-md"
              }`
            }
          >
            <motion.span 
              animate={{ 
                rotate: location.pathname === item.path ? [0, 10, -5, 0] : 0 
              }}
              transition={{ duration: 0.5 }}
            >
              {item.icon}
            </motion.span>
            {isSidebarOpen && <span className="font-medium">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      <motion.button 
        whileHover={{ scale: 1.03, backgroundColor: "#dc2626" }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-3 p-3 mt-auto rounded-lg bg-red-600 hover:bg-red-700 transition-all shadow-md"
        onClick={handleLogout}
      >
        <AiOutlineLogout className="w-5 h-5"/>
        {isSidebarOpen && <span>Logout</span>}
      </motion.button>
    </motion.aside>
  );
};

export default AdminSidebar;