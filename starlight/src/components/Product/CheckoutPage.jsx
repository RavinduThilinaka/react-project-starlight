import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaMapMarkerAlt, FaUser, FaPhone, FaGlobe } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = ({ cart = [], totalPrice = 0, onBackToShop }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    mobileNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Prepare order data
      const orderData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobileNumber: formData.mobileNumber,
        country: formData.country,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        items: cart.map(item => ({
          productId: item.id || Math.random().toString(36).substr(2, 9), // Fallback ID if not provided
          title: item.title,
          price: item.price,
          quantity: item.quantity || 1
        })),
        totalAmount: totalPrice
      };

      // In a real app, you would send this to your backend
      // For now, we'll just simulate a successful order
      setOrderDetails({
        ...orderData,
        orderId: `ORD-${Math.floor(Math.random() * 1000000)}`,
        orderDate: new Date().toLocaleDateString()
      });
      setOrderSubmitted(true);
      
    } catch (error) {
      console.error('Order submission error:', error);
      alert('There was an error submitting your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-brandDark text-white p-4"
    >
      <div className="container mx-auto max-w-6xl">
        <button
          onClick={onBackToShop}
          className="flex items-center text-gray-300 hover:text-white mb-6 transition"
        >
          <FaArrowLeft className="mr-2" />
          Back to Shop
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Shipping Information */}
          <div className="lg:w-2/3">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-700"
            >
              {!orderSubmitted ? (
                <>
                  <h2 className="text-xl font-bold mb-6 flex items-center">
                    <FaUser className="mr-2 text-indigo-400" />
                    Shipping Information
                  </h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-300 mb-2">First Name</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`w-full bg-gray-700 rounded-md py-2 px-4 pl-10 text-white focus:outline-none focus:ring-2 ${errors.firstName ? 'focus:ring-red-500 border-red-500' : 'focus:ring-indigo-500 border-gray-600'}`}
                            placeholder="John"
                          />
                          <FaUser className="absolute left-3 top-3 text-gray-400" />
                        </div>
                        {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 mb-2">Last Name</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`w-full bg-gray-700 rounded-md py-2 px-4 pl-10 text-white focus:outline-none focus:ring-2 ${errors.lastName ? 'focus:ring-red-500 border-red-500' : 'focus:ring-indigo-500 border-gray-600'}`}
                            placeholder="Doe"
                          />
                          <FaUser className="absolute left-3 top-3 text-gray-400" />
                        </div>
                        {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-300 mb-2">Phone Number</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            className={`w-full bg-gray-700 rounded-md py-2 px-4 pl-10 text-white focus:outline-none focus:ring-2 ${errors.mobileNumber ? 'focus:ring-red-500 border-red-500' : 'focus:ring-indigo-500 border-gray-600'}`}
                            placeholder="0771234567"
                          />
                          <FaPhone className="absolute left-3 top-3 text-gray-400" />
                        </div>
                        {errors.mobileNumber && <p className="text-red-400 text-sm mt-1">{errors.mobileNumber}</p>}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-300 mb-2">Address</label>
                      <div className="relative">
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          rows="3"
                          className={`w-full bg-gray-700 rounded-md py-2 px-4 pl-10 text-white focus:outline-none focus:ring-2 ${errors.address ? 'focus:ring-red-500 border-red-500' : 'focus:ring-indigo-500 border-gray-600'}`}
                          placeholder="123 Main Street"
                        />
                        <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                      </div>
                      {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div>
                        <label className="block text-gray-300 mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className={`w-full bg-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 ${errors.city ? 'focus:ring-red-500 border-red-500' : 'focus:ring-indigo-500 border-gray-600'}`}
                          placeholder="Colombo"
                        />
                        {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 mb-2">Country</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className={`w-full bg-gray-700 rounded-md py-2 px-4 pl-10 text-white focus:outline-none focus:ring-2 ${errors.country ? 'focus:ring-red-500 border-red-500' : 'focus:ring-indigo-500 border-gray-600'}`}
                            placeholder="Sri Lanka"
                          />
                          <FaGlobe className="absolute left-3 top-3 text-gray-400" />
                        </div>
                        {errors.country && <p className="text-red-400 text-sm mt-1">{errors.country}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 mb-2">Zip Code</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          className={`w-full bg-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 ${errors.zipCode ? 'focus:ring-red-500 border-red-500' : 'focus:ring-indigo-500 border-gray-600'}`}
                          placeholder="00100"
                        />
                        {errors.zipCode && <p className="text-red-400 text-sm mt-1">{errors.zipCode}</p>}
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting || cart.length === 0}
                      className={`w-full py-3 rounded-md font-medium transition flex items-center justify-center ${
                        isSubmitting || cart.length === 0
                          ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Order Now'
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
                  <p className="text-gray-300 mb-6">Thank you for your order. Your order ID is: <span className="font-semibold">{orderDetails.orderId}</span></p>
                  <button
                    onClick={onBackToShop}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-md transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </motion.div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700 sticky top-4"
            >
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cart && cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded mr-3"
                      />
                      <div>
                        <h4 className="font-medium text-white">{item.title}</h4>
                        <p className="text-xs text-gray-400">{item.category}</p>
                      </div>
                    </div>
                    <span className="font-medium">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-700 pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              {orderSubmitted && orderDetails && (
                <div className="bg-gray-700 p-4 rounded-md mb-4">
                  <h3 className="font-bold mb-2">Shipping Details</h3>
                  <p className="text-sm text-gray-300">{orderDetails.firstName} {orderDetails.lastName}</p>
                  <p className="text-sm text-gray-300">{orderDetails.address}</p>
                  <p className="text-sm text-gray-300">{orderDetails.city}, {orderDetails.country} {orderDetails.zipCode}</p>
                  <p className="text-sm text-gray-300">Phone: {orderDetails.mobileNumber}</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;