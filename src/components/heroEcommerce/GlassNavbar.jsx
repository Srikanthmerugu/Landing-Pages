import { motion } from 'framer-motion';
import { FiSearch, FiUser, FiHeart, FiShoppingBag } from 'react-icons/fi';

const GlassNavbar = () => {
  // Navbar items
  const navItems = [
    { name: "Home", path: "#" },
    { name: "Shop", path: "#" },
    { name: "Collections", path: "#" },
    { name: "About", path: "#" },
    { name: "Contact", path: "#" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo with custom font style */}
        <motion.div
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-600 font-logo">
            FASHIONA
          </span>
        </motion.div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <motion.div 
              key={item.name}
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <a 
                href={item.path} 
                className="text-pink-100 font-medium px-2 py-1 relative group"
              >
                {item.name}
                <motion.span
                  className="absolute bottom-0 left-1/2 h-0.5 bg-pink-500"
                  initial={{ width: 0, x: "-50%" }}
                  whileHover={{ 
                    width: "100%",
                    transition: { duration: 0.3 }
                  }}
                  style={{ originX: 0.5 }}
                />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            className="text-pink-100"
          >
            <FiSearch className="text-xl" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            className="text-pink-100"
          >
            <FiUser className="text-xl" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            className="text-pink-100"
          >
            <FiHeart className="text-xl" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            className="text-pink-100 relative"
          >
            <FiShoppingBag className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default GlassNavbar;