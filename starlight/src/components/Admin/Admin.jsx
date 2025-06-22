import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineMenu, AiOutlineBell,AiOutlineShoppingCart,AiOutlineDollar  } from 'react-icons/ai';
import { FiUserPlus, FiUsers } from 'react-icons/fi';
import axios from 'axios';
import UserTable from './UserTable';
import { useNavigate } from 'react-router-dom';
import Sidebar from './AdminSidebar';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [isEdit, setIsEdite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const userName = localStorage.getItem('userName');
  const userFirstLetter = localStorage.getItem('userFirstLetter');

  const handleLogout = () => {
    document.body.classList.add('animate-fadeOut');
    setTimeout(() => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userAge');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userPassword');
      localStorage.removeItem('userFirstLetter');
      navigate('/login');
    }, 500);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setIsLoading(true);
    const token = localStorage.getItem('authToken');
    axios.get("http://localhost:3001/api/getUsers", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setUsers(response.data?.response || []);
      setIsLoading(false);
    })
    .catch(error => {
      console.error("Axios error", error);
      setIsLoading(false);
    });
  };

  const deleteUser = (_id) => {
    axios.delete(`http://localhost:3001/api/deleteUser/${_id}`)
    .then(() => {
      getUsers();
    })
    .catch(error => {
      console.error("Axios error", error);
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        handleLogout={handleLogout}
      />

      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-between items-center mb-8 bg-white p-4 shadow-sm sticky top-0 z-10"
        >
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <AiOutlineMenu className="w-6 h-6 text-gray-600" />
            </motion.button>
            
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xl font-bold w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
            >
              {userFirstLetter}
            </motion.div>
            <h2 className="text-3xl font-semibold text-gray-800">
              Welcome, <span className="text-blue-600">{userName}</span>
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="relative p-2 rounded-full hover:bg-gray-100 cursor-pointer"
            >
              <AiOutlineBell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </motion.div>
          </div>
        </motion.header>

        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6"
          >
            {[
              {
                title: "Total Users", 
                value: users.length, 
                icon: <FiUsers className="w-8 h-8 text-blue-500" />,
                change: "+12%",
                bg: "bg-gradient-to-r from-blue-50 to-blue-100"
              },
              {
                title: "Orders Today", 
                value: "320", 
                icon: <AiOutlineShoppingCart className="w-8 h-8 text-green-500" />,
                change: "+5%",
                bg: "bg-gradient-to-r from-green-50 to-green-100"
              },
              {
                title: "Revenue", 
                value: "$45,000", 
                icon: <AiOutlineDollar className="w-8 h-8 text-purple-500" />,
                change: "+23%",
                bg: "bg-gradient-to-r from-purple-50 to-purple-100"
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className={`${stat.bg} p-6 rounded-xl shadow-md border border-gray-100`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-600">{stat.title}</h3>
                    <p className="text-3xl font-bold mt-2 text-gray-800">{stat.value}</p>
                    <p className="text-sm mt-2 text-green-600 font-medium">{stat.change}</p>
                  </div>
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="p-3 rounded-full bg-white shadow"
                  >
                    {stat.icon}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mx-6 mb-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">User Management</h3>
            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: "#3b82f6" }}
              whileTap={{ scale: 0.97 }}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow"
            >
              <FiUserPlus className="w-5 h-5" />
              Add User
            </motion.button>
          </div>
          
          {isLoading ? (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto my-10"
            />
          ) : (
            <UserTable
              rows={users}
              selectedUser={data => {
                setSelectedUser(data);
                setIsEdite(true);
              }}
              deleteUser={data => window.confirm('Are you sure?') && deleteUser(data)}
            />
          )}
        </motion.section>

        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center text-gray-500 text-sm pb-6"
        >
          © {new Date().getFullYear()} Admin Panel. All rights reserved.
        </motion.footer>
      </div>
    </motion.div>
  );
};

export default Admin;