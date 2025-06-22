import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineMenu, AiOutlineBell, AiOutlineCreditCard } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Admin/AdminSidebar';

const DisplayPayment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
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
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/getPayment');
        const paymentList = Array.isArray(response.data?.response) 
          ? response.data.response 
          : [];
        setPayments(paymentList);
        setError(null);
      } catch (err) {
        console.error("Error fetching payment data:", err);
        setError('Failed to load payments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filteredPayments = payments.filter(payment => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (payment.cardNumber?.toString()?.toLowerCase().includes(searchLower)) ||
      (payment.holderName?.toString()?.toLowerCase().includes(searchLower)) ||
      (payment.expDate?.toString()?.toLowerCase().includes(searchLower)) ||
      (payment.cvv?.toString()?.includes(searchTerm))
    );
  });

  const formatCardNumber = (cardNumber) => {
    if (!cardNumber) return '•••• •••• •••• ••••';
    const str = cardNumber.toString();
    return `•••• •••• •••• ${str.slice(-4)}`;
  };

  const formatCVV = (cvv) => {
    if (!cvv) return '•••';
    const str = cvv.toString();
    return `••${str.length > 1 ? str.slice(-1) : '•'}`;
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

        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <AiOutlineCreditCard className="mr-2 text-blue-500" />
              Payment Records
            </h2>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative mt-4 md:mt-0 w-full md:w-64"
            >
              <input
                type="text"
                placeholder="Search payments..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </motion.div>
          </motion.div>

          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center h-64"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
              />
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6"
            >
              <p>{error}</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Card Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Card Holder
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Expiry Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        CVV
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <AnimatePresence>
                      {filteredPayments.length > 0 ? (
                        filteredPayments.map((payment, index) => (
                          <motion.tr
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ backgroundColor: '#f8fafc' }}
                            className="transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {formatCardNumber(payment.cardNumber)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {payment.holderName || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {payment.expDate || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatCVV(payment.cvv)}
                            </td>
                          </motion.tr>
                        ))
                      ) : (
                        <motion.tr
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="transition-colors"
                        >
                          <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                            {payments.length === 0 ? 'No payment records found' : 'No matching payments found'}
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>

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

export default DisplayPayment;