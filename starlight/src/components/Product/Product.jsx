import React, { useState } from 'react';
import { FaShoppingCart, FaTrash, FaSearch, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import CheckoutPage from './CheckoutPage';
import Logo from "../../assets/logo.png";
import Shoes from "../../assets/shoes.png";
import Laptop from "../../assets/laptop.png";
import Cloths from "../../assets/cloths.png";
import Phone from "../../assets/phones.png";
import Headphone from "../../assets/headphones4.png";

const products = [
  {
    id: 0,
    image: Laptop,
    title: 'Wireless Headphones',
    price: 120,
    category: 'Electronics'
  },
  {
    id: 1,
    image: Phone,
    title: 'Smart Watch',
    price: 150,
    category: 'Electronics'
  },
  {
    id: 2,
    image: Headphone,
    title: 'Leather Wallet',
    price: 45,
    category: 'Accessories'
  },
  {
    id: 3,
    image: Cloths,
    title: 'Cotton T-Shirt',
    price: 25,
    category: 'Clothing'
  },
  {
    id: 4,
    image: Shoes,
    title: 'Running Shoes',
    price: 85,
    category: 'Footwear'
  },
  {
    id: 5,
    image: Headphone,
    title: 'Bluetooth Speaker',
    price: 75,
    category: 'Electronics'
  },
  {
    id: 6,
    image: Cloths,
    title: 'Sunglasses',
    price: 65,
    category: 'Accessories'
  },
  {
    id: 7,
    image: Cloths,
    title: 'Denim Jeans',
    price: 55,
    category: 'Clothing'
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

const EcommercePage = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);

  const categories = ['All', ...new Set(products.map(item => item.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleBackToShop = () => {
    setIsCheckout(false);
  };

  const handlePlaceOrder = (orderData) => {
    console.log('Order placed:', orderData, cart);
    setCart([]);
  };

  if (isCheckout) {
    return (
      <CheckoutPage 
        cart={cart} 
        totalPrice={totalPrice} 
        onBackToShop={handleBackToShop}
        onPlaceOrder={handlePlaceOrder}
      />
    );
  }

  return (
    <div className="min-h-screen bg-brandDark text-white">
      {/* Navigation */}
      <nav className="bg-brandDark text-white shadow-lg border-b border-gray-700">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-3 text-1xl font-bold"
          >
            <img 
              src={Logo} 
              alt="Start Light Logo" 
              className="h-14 w-14 object-contain" 
            />
            <span>Start Light</span>
          </motion.div>

          <div className="flex items-center space-x-4">
            <motion.div 
              className="relative hidden md:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <input
                type="text"
                placeholder="Search products..."
                className="py-1 px-4 pr-8 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute right-3 top-2 text-gray-500" />
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition"
              >
                <span>{selectedCategory}</span>
                <FaChevronDown className={`transition-transform ${isMenuOpen ? 'transform rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10 border border-gray-700"
                  >
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsMenuOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-white hover:bg-gray-700 ${
                          selectedCategory === category ? 'bg-indigo-600 font-medium' : ''
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="p-2 relative"
            >
              <FaShoppingCart className="text-xl" />
              {cart.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {cart.length}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </nav>

      <div className="md:hidden px-4 py-2 bg-brandDark border-b border-gray-700">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full py-2 px-4 pr-8 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute right-3 top-3 text-gray-400" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row">
          <div className={`w-full ${isCartOpen ? 'lg:w-3/4' : 'lg:w-full'} pr-0 lg:pr-6 transition-all duration-300`}>
            <h2 className="text-2xl font-bold mb-6">
              {selectedCategory === 'All' ? 'All Products' : selectedCategory}
            </h2>

            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-gray-400"
              >
                No products found matching your criteria
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -5 }}
                    className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg border border-gray-700"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.title}</h3>
                      <p className="text-gray-400 text-sm mb-2">{product.category}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-white">${product.price.toFixed(2)}</span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => addToCart(product)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md text-sm transition"
                        >
                          Add to Cart
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <AnimatePresence>
            {isCartOpen && (
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25 }}
                className="fixed lg:relative inset-0 lg:inset-auto lg:w-1/4 bg-gray-800 shadow-lg lg:shadow-none z-20 lg:z-0 border-l border-gray-700"
              >
                <div className="h-full flex flex-col">
                  <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-indigo-600 text-white">
                    <h3 className="text-xl font-bold">My Cart</h3>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="lg:hidden hover:text-indigo-200"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4">
                    {cart.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 text-gray-400"
                      >
                        Your cart is empty
                      </motion.div>
                    ) : (
                      <motion.div
                        variants={scaleUp}
                        initial="hidden"
                        animate="visible"
                        className="space-y-4"
                      >
                        {cart.map((item, index) => (
                          <motion.div
                            key={index}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="max-w-[120px]">
                                <h4 className="font-medium text-white text-sm line-clamp-1">{item.title}</h4>
                                <p className="text-xs text-gray-400">${item.price.toFixed(2)}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFromCart(index)}
                              className="text-red-400 hover:text-red-300 p-1"
                            >
                              <FaTrash size={14} />
                            </button>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </div>

                  <div className="p-4 border-t border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-lg text-white">${totalPrice.toFixed(2)}</span>
                    </div>
                    <button
                      disabled={cart.length === 0}
                      onClick={() => {
                        setIsCheckout(true);
                        setIsCartOpen(false);
                      }}
                      className={`w-full py-3 rounded-md font-medium transition ${
                        cart.length === 0
                          ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default EcommercePage;