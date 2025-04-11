import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCreditCard, FaLock, FaUser, FaCalendarAlt, FaCheck } from 'react-icons/fa';
import { SiVisa, SiMastercard, SiPaypal, SiApplepay } from 'react-icons/si';

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2)}`;
    }
    return value;
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardTilt = {
    hidden: { rotateY: 0 },
    visible: { rotateY: [0, 5, -5, 0], transition: { duration: 2, repeat: Infinity } }
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Secure Payment</h1>
          <p className="text-gray-300">Complete your purchase with confidence</p>
        </motion.div>

        {isSuccess ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-brandDark/90 border border-gray-700 rounded-2xl shadow-xl overflow-hidden p-8 text-center"
          >
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheck className="text-white text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
            <p className="text-gray-300 mb-6">Your transaction has been completed successfully.</p>
            <button
              onClick={() => setIsSuccess(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
            >
              Make Another Payment
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-brandDark/90 border border-gray-700 rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Payment Method Tabs */}
            <div className="flex border-b border-gray-700">
              {[
                { id: 'credit', icon: <FaCreditCard />, label: 'Card' },
                { id: 'paypal', icon: <SiPaypal />, label: 'PayPal' },
                { id: 'apple', icon: <SiApplepay />, label: 'Apple Pay' }
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex-1 py-4 px-2 text-center font-medium flex items-center justify-center gap-2 transition ${paymentMethod === method.id ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                >
                  {method.icon}
                  <span>{method.label}</span>
                </button>
              ))}
            </div>

            <div className="p-6 sm:p-8">
              {paymentMethod === 'credit' && (
                <form onSubmit={handleSubmit}>
                  {/* Card Preview */}
                  <motion.div
                    variants={cardTilt}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-5 mb-6 text-white relative overflow-hidden h-44"
                  >
                    <div className="absolute top-4 right-4">
                      <SiVisa className="text-3xl" />
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <SiMastercard className="text-3xl" />
                    </div>
                    <div className="absolute top-1/2 left-4 right-4 transform -translate-y-1/2">
                      <div className="text-xl tracking-wider mb-2">
                        {cardNumber || '•••• •••• •••• ••••'}
                      </div>
                      <div className="flex justify-between text-sm">
                        <div>{cardHolder || 'CARD HOLDER'}</div>
                        <div>{expiry || '••/••'}</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card Number */}
                  <div className="mb-6">
                    <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center">
                      <FaCreditCard className="mr-2" />
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={formatCardNumber(cardNumber)}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength={19}
                      placeholder="1234 5678 9012 3456"
                      className="w-full bg-brandDark border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Card Holder */}
                  <div className="mb-6">
                    <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center">
                      <FaUser className="mr-2" />
                      Card Holder
                    </label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                      placeholder="JOHN DOE"
                      className="w-full bg-brandDark border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Expiry Date */}
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center">
                        <FaCalendarAlt className="mr-2" />
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={formatExpiry(expiry)}
                        onChange={(e) => setExpiry(e.target.value)}
                        maxLength={5}
                        placeholder="MM/YY"
                        className="w-full bg-brandDark border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* CVV */}
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center">
                        <FaLock className="mr-2" />
                        CVV
                      </label>
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
                        maxLength={4}
                        placeholder="•••"
                        className="w-full bg-brandDark border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Pay Now'
                    )}
                  </button>
                </form>
              )}

              {paymentMethod === 'paypal' && (
                <div className="text-center py-8">
                  <SiPaypal className="text-5xl text-blue-500 mx-auto mb-6" />
                  <p className="text-gray-300 mb-6">You will be redirected to PayPal to complete your payment</p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200">
                    Continue with PayPal
                  </button>
                </div>
              )}

              {paymentMethod === 'apple' && (
                <div className="text-center py-8">
                  <SiApplepay className="text-5xl text-white mx-auto mb-6" />
                  <p className="text-gray-300 mb-6">Complete your payment with Apple Pay</p>
                  <button className="w-full bg-black hover:bg-gray-900 text-white font-medium py-3 px-4 rounded-lg transition duration-200 border border-gray-700">
                    Pay with Apple Pay
                  </button>
                </div>
              )}
            </div>

            <div className="bg-brandDark/80 px-6 py-4 border-t border-gray-700">
              <div className="flex items-center justify-center gap-4">
                <span className="text-gray-400 text-sm">Secure payment with</span>
                <div className="flex gap-3">
                  <SiVisa className="text-2xl text-gray-300" />
                  <SiMastercard className="text-2xl text-gray-300" />
                  <SiPaypal className="text-2xl text-gray-300" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;