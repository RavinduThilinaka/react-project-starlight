import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdMenu, MdClose } from 'react-icons/md';
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { UpdateFollower } from 'react-mouse-follower';
import { motion, AnimatePresence } from "framer-motion";

const NavbarMenu = [
  {
    id: 1,
    title: "Home",
    link: "/"
  },
  {
    id: 2,
    title: "Categories",
    link: "/product"
  },
  {
    id: 3,
    title: "Blog",
    link: "#"
  },
  {
    id: 4,
    title: "Register",
    link: "/register"
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);
  const userName = localStorage.getItem('userName');
  const userFirstLetter = localStorage.getItem('userFirstLetter');
  const token = localStorage.getItem('authToken');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuVariants = {
    open: { 
      opacity: 1,
      y: 0,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2,
        when: "beforeChildren"
      }
    },
    closed: { 
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    }
  };

  const itemVariants = {
    open: { 
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300 }
    },
    closed: { 
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="bg-brandDark text-white py-4 sticky top-0 z-50 shadow-lg">
      <motion.nav
        className="container flex justify-between items-center relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left side: Logo/User */}
        <div className="flex items-center gap-3">
          {token ? (
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span 
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-md"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {userFirstLetter}
              </motion.span>
              <span className="text-sm uppercase font-medium hidden sm:block">
                {userName}
              </span>
            </motion.div>
          ) : (
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <FaUserCircle className="text-2xl text-blue-400" />
              <span className="text-sm font-medium hidden sm:block">Guest</span>
            </motion.div>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-2">
            {NavbarMenu.map((item) => (
              <motion.li 
                key={item.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <UpdateFollower
                  mouseOptions={{
                    backgroundColor: 'white',
                    zIndex: 999,
                    followSpeed: 1.5,
                    scale: 5,
                    mixBlendMode: "difference"
                  }}
                >
                  <a 
                    href={item.link} 
                    className="inline-block text-sm py-2 px-4 uppercase font-medium hover:text-blue-300 transition-colors relative group"
                  >
                    {item.title}
                    <motion.span 
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                    />
                  </a>
                </UpdateFollower>
              </motion.li>
            ))}

            {token ? (
              <motion.li
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <UpdateFollower
                  mouseOptions={{
                    backgroundColor: 'white',
                    zIndex: 999,
                    followSpeed: 1.5,
                    scale: 5,
                    mixBlendMode: "difference"
                  }}
                >
                  <button
                    onClick={handleLogout}
                    className="inline-block text-sm py-2 px-4 uppercase font-medium hover:text-red-400 transition-colors relative group"
                  >
                    Logout
                    <motion.span 
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                    />
                  </button>
                </UpdateFollower>
              </motion.li>
            ) : (
              <motion.li
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <UpdateFollower
                  mouseOptions={{
                    backgroundColor: 'white',
                    zIndex: 999,
                    followSpeed: 1.5,
                    scale: 5,
                    mixBlendMode: "difference"
                  }}
                >
                  <a 
                    href="/login" 
                    className="inline-block text-sm py-2 px-4 uppercase font-medium hover:text-green-400 transition-colors relative group"
                  >
                    Login
                    <motion.span 
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                    />
                  </a>
                </UpdateFollower>
              </motion.li>
            )}
          </ul>

          {/* Cart with badge */}
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <UpdateFollower
              mouseOptions={{
                backgroundColor: 'white',
                zIndex: 999,
                followSpeed: 1.5,
                scale: 5,
                mixBlendMode: "difference"
              }}
            >
              <button 
                className="text-xl p-2 relative"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <FaShoppingCart />
                <motion.span 
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  animate={{ scale: isHovering ? 1.2 : 1 }}
                >
                  3
                </motion.span>
              </button>
            </UpdateFollower>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden text-2xl p-2 z-50"
          onClick={toggleMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? <MdClose /> : <MdMenu />}
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden fixed inset-0 bg-black bg-opacity-90 z-40 pt-20 px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.ul 
                className="flex flex-col gap-6"
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                {NavbarMenu.map((item) => (
                  <motion.li 
                    key={item.id}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <a 
                      href={item.link} 
                      className="text-xl py-3 block border-b border-gray-700 hover:text-blue-400 transition-colors"
                      onClick={toggleMenu}
                    >
                      {item.title}
                    </a>
                  </motion.li>
                ))}

                {token ? (
                  <motion.li
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                      className="text-xl py-3 block border-b border-gray-700 hover:text-red-400 transition-colors w-full text-left"
                    >
                      Logout
                    </button>
                  </motion.li>
                ) : (
                  <motion.li
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <a 
                      href="/login" 
                      className="text-xl py-3 block border-b border-gray-700 hover:text-green-400 transition-colors"
                      onClick={toggleMenu}
                    >
                      Login
                    </a>
                  </motion.li>
                )}

                <motion.li
                  variants={itemVariants}
                  className="flex justify-center mt-8"
                >
                  <button 
                    className="flex items-center gap-2 text-lg p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full px-6 shadow-lg hover:shadow-xl transition-all"
                    onClick={toggleMenu}
                  >
                    <FaShoppingCart />
                    <span>Cart (3)</span>
                  </button>
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;