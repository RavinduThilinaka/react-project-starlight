import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineMenu, AiOutlineBell, AiOutlineCreditCard, AiOutlineDelete, AiOutlineEdit, AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Admin/AdminSidebar';

const DisplayPayment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [formData, setFormData] = useState({
    cardNumber: '',
    holderName: '',
    expDate: '',
    cvv: ''
  });
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

  const handleDeletePayment = async (paymentId) => {
    try {
      await axios.delete(`http://localhost:3001/api/deletePayment/${paymentId}`);
      setPayments(payments.filter(payment => payment?._id !== paymentId));
      alert('Payment deleted successfully');
    } catch (err) {
      console.error("Error deleting payment:", err);
      alert('Failed to delete payment');
    }
  };

  const handleUpdateClick = (payment) => {
    setCurrentPayment(payment);
    setFormData({
      cardNumber: payment?.cardNumber || '',
      holderName: payment?.holderName || '',
      expDate: payment?.expDate || '',
      cvv: payment?.cvv || ''
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdatePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/api/updatePayment/${currentPayment?._id}`,
        formData
      );
      
      setPayments(payments.map(payment => 
        payment?._id === currentPayment?._id ? response.data.updatedPayment : payment
      ));
      
      setIsModalOpen(false);
      alert('Payment updated successfully');
    } catch (err) {
      console.error("Error updating payment:", err);
      alert('Failed to update payment');
    }
  };

  const filteredPayments = payments.filter(payment => {
    if (!payment) return false;
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <AnimatePresence>
                      {filteredPayments.length > 0 ? (
                        filteredPayments.map((payment, index) => (
                          <motion.tr
                            key={payment?._id || index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ backgroundColor: '#f8fafc' }}
                            className="transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {formatCardNumber(payment?.cardNumber)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {payment?.holderName || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {payment?.expDate || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatCVV(payment?.cvv)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleUpdateClick(payment)}
                                className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
                                title="Edit Payment"
                              >
                                <AiOutlineEdit className="w-5 h-5" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => payment?._id && handleDeletePayment(payment._id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                                title="Delete Payment"
                              >
                                <AiOutlineDelete className="w-5 h-5" />
                              </motion.button>
                            </td>
                          </motion.tr>
                        ))
                      ) : (
                        <motion.tr
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="transition-colors"
                        >
                          <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
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

        {/* Update Payment Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-xl shadow-xl w-full max-w-md"
              >
                <div className="flex justify-between items-center border-b p-4">
                  <h3 className="text-lg font-semibold text-gray-800">Update Payment</h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <AiOutlineClose className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleUpdatePayment} className="p-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Holder Name
                    </label>
                    <input
                      type="text"
                      name="holderName"
                      value={formData.holderName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expDate"
                      value={formData.expDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Update Payment
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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