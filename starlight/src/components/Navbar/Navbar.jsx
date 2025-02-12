import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';
import { FaShoppingCart } from "react-icons/fa";
import { UpdateFollower } from 'react-mouse-follower';
import { motion } from "framer-motion";

const NavbarMenu = [
  {
    id: 1,
    title: "Home",
    link: "/"
  },
  {
    id: 2,
    title: "Categories",
    link: "#"
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
  // Removed Login from NavbarMenu
];

const Navbar = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');
  const userFirstLetter = localStorage.getItem('userFirstLetter');
  const token = localStorage.getItem('authToken');  // Check if the user is logged in

  const handleLogout = () => {
    // Clear the localStorage when logging out
    localStorage.removeItem('userName');
    localStorage.removeItem('userFirstLetter');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userAge');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userPassword');

    // Navigate to login page after logout
    navigate('/login');
  };

  return (
    <div className="bg-brandDark text-white py-4">
      <motion.nav
        className="container flex justify-between items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Left side: Display user's first letter and name */}
        <div className="flex items-center gap-3">
          {token && (
            <>
              {/* Circle with the first letter */}
              <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                {userFirstLetter}
              </span>
              {/* Username */}
              <span className="text-sm uppercase">{userName}</span>
            </>
          )}
        </div>

        <div className="hidden md:block">
          <ul className="flex items-center gap-4">
            {/* Displaying Navbar Menu Items */}
            {NavbarMenu.map((item) => (
              <li key={item.id}>
                <UpdateFollower
                  mouseOptions={{
                    backgroundColor: 'white',
                    zIndex: 999,
                    followSpeed: 1.5,
                    scale: 5,
                    mixBlendMode: "difference"
                  }}
                >
                  <a href={item.link} className='inline-block text-sm py-2 px-3 uppercase'>
                    {item.title}
                  </a>
                </UpdateFollower>
              </li>
            ))}

           
            {/* Logout button if logged in */}
            {token && (
              <li>
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
                    className="inline-block text-sm py-2 px-3 uppercase"
                  >
                    Logout
                  </button>
                </UpdateFollower>
              </li>
            )}

            {/* Login button, only if the user is not logged in */}
            {!token && (
              <li>
                <UpdateFollower
                  mouseOptions={{
                    backgroundColor: 'white',
                    zIndex: 999,
                    followSpeed: 1.5,
                    scale: 5,
                    mixBlendMode: "difference"
                  }}
                >
                  <a href="/login" className="inline-block text-sm py-2 px-3 uppercase">
                    Login
                  </a>
                </UpdateFollower>
              </li>
            )}

             {/* Cart Icon */}
             <UpdateFollower
              mouseOptions={{
                backgroundColor: 'white',
                zIndex: 999,
                followSpeed: 1.5,
                scale: 5,
                mixBlendMode: "difference"
              }}
            >
              <button className="text-xl ps-14">
                <FaShoppingCart />
              </button>
            </UpdateFollower>

          </ul>
        </div>

        <div className="md:hidden">
          <MdMenu className="text-4xl" />
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
