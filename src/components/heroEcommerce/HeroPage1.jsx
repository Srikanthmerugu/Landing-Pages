import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiShoppingBag, FiArrowRight, FiChevronDown } from "react-icons/fi";
import { FaTshirt, FaSocks, FaHatCowboy } from "react-icons/fa";
import GlassNavbar from "./GlassNavbar";
// Add these imports at the top of your file
import summerCollectionImg from "./beautiful-young-woman-choosing-what-wear-looking-front.jpg";
import winterEssentialsImg from "./portrait-handsome-smiling-man-wearing-summer-jeans-clothes-model-male-taking-picture-old-vintage-photo-camera.jpg";
import accessoriesImg from "./woman-white-blouse-green-skirt-holding-shopping-packages.jpg";

const HeroEcommerce = () => {
  const [ripples, setRipples] = useState([]);
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [activeProduct, setActiveProduct] = useState(0);
  const containerRef = useRef(null);

  const controls = useAnimation();

  // Correct useInView implementation
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
    dits: false,
  });

  // Product showcase data
  const products = [
    {
      id: 1,
      name: "Summer Collection",
      description: "Lightweight fabrics for warm days",
      price: "$49.99",
      colors: ["bg-red-500", "bg-blue-400", "bg-yellow-300"],
      icon: summerCollectionImg, // Use the imported image
      bg: "bg-gradient-to-br from-pink-200 to-red-300",
    },
    {
      id: 2,
      name: "Winter Essentials",
      description: "Stay warm in style",
      price: "$79.99",
      colors: ["bg-gray-700", "bg-green-600", "bg-purple-500"],
      icon: winterEssentialsImg, // Use the imported image
      bg: "bg-gradient-to-br from-blue-200 to-cyan-300",
    },
    {
      id: 3,
      name: "Accessories",
      description: "Complete your look",
      price: "$29.99",
      colors: ["bg-black", "bg-brown-500", "bg-pink-400"],
      icon: accessoriesImg, // Use the imported image
      bg: "bg-gradient-to-br from-yellow-200 to-orange-300",
    },
  ];

  // Typewriter texts for fashion e-commerce
  const typewriterTexts = [
    "New Arrivals Just Dropped",
    "Summer Sale: Up to 50% Off",
    "Premium Quality Fashion",
  ];

  // Create ripple effect
  const createRipple = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const size = Math.max(width, height);

    const newRipple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples([...ripples, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1000);
  };

  // Typewriter effect
  useEffect(() => {
    if (inView) {
      const fullText = typewriterTexts[textIndex];
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayText(fullText.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setTextIndex((textIndex + 1) % typewriterTexts.length);
            setDisplayText("");
          }, 2000);
        }
      }, 100);

      return () => clearInterval(typingInterval);
    }
  }, [textIndex, inView]);

  // Product carousel auto-rotation
  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setActiveProduct((prev) => (prev + 1) % products.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [inView, products.length]);

  // Background animations
  useEffect(() => {
    if (inView) {
      controls.start({
        scale: [1, 1.05, 1],
        transition: {
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        },
      });
    }
  }, [controls, inView]);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <GlassNavbar />

      <div
        ref={ref}
        className="relative w-full h-screen bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden flex items-center justify-center"
        onClick={createRipple}
      >
        {/* Animated background texture */}
        <motion.div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-10"
          animate={controls}
        />

        {/* Background grid cells */}
        <div className="absolute inset-0 gap-1 p-1 opacity-10">
          {Array.from({ length: 0 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-sm cursor-pointer hover:bg-opacity-30 transition-all duration-300"
            />
          ))}
        </div>

        {/* Ripple effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              className="absolute bg-white rounded-full opacity-0 transform -translate-x-1/2 -translate-y-1/2"
              initial={{
                width: 0,
                height: 0,
                x: ripple.x,
                y: ripple.y,
                opacity: 0.5,
              }}
              animate={{
                width: ripple.size,
                height: ripple.size,
                opacity: 0,
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          ))}
        </div>

        {/* Floating clothing items */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/6 w-24 h-24 bg-gradient-to-br from-red-400 to-pink-500 rounded-full shadow-xl"
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              rotate: [0, 15, 0],
              transition: {
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/5 w-32 h-32 bg-gradient-to-br from-blue-400 to-teal-300 rounded-lg shadow-xl"
            animate={{
              y: [0, -30, 0],
              x: [0, -15, 0],
              rotate: [0, -10, 0],
              transition: {
                duration: 7,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.5,
              },
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-xl"
            animate={{
              y: [0, 30, 0],
              x: [0, -20, 0],
              rotate: [0, 20, 0],
              transition: {
                duration: 9,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1,
              },
            }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between">
          {/* Text content */}
          <div className="text-center lg:text-left mb-12 lg:mb-0 lg:w-1/2">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500">
                Fashion Forward
              </span>
              <br />
              For Every Season
            </motion.h1>

            <motion.div
              className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-300 h-12 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {displayText}
              <motion.span
                className="inline-block w-1 h-8 bg-white ml-1"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 flex items-center gap-2">
                Shop Now <FiShoppingBag />
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center gap-2">
                View Collection <FiArrowRight />
              </button>
            </motion.div>
          </div>

          {/* Product showcase */}
          <div className="relative lg:w-1/2 h-96">
            <AnimatePresence mode="wait">
              {products.map(
                (product, index) =>
                  activeProduct === index && (
                    <motion.div
                      key={product.id}
                      className="absolute inset-0  bg-opacity-10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white border-opacity-20"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className="text-2xl font-bold text-white">
                              {product.name}
                            </h3>
                            <p className="text-gray-300">
                              {product.description}
                            </p>
                          </div>
                          <div className="text-3xl font-bold text-white bg-gradient-to-r from-pink-500 to-red-500 p-3 rounded-lg">
                            {product.price}
                          </div>
                        </div>

                        <div className="flex-1 flex items-center justify-center">
                          <motion.div
                            className="w-84 h-84 rounded-full overflow-hidden flex items-center justify-center"
                            animate={{
                              scale: [1, 1.05, 1],
                              rotate: [0, 5, 0],
                              transition: {
                                duration: 5,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut",
                              },
                            }}
                          >
                            <img
                              src={product.icon}
                              alt={product.name}
                              className="w-full h-full object-cover rounded-full"
                            />
                          </motion.div>
                        </div>

                        <div className="flex justify-center gap-3 mt-6">
                          {product.colors.map((color, i) => (
                            <motion.div
                              key={i}
                              className={`w-8 h-8 rounded-full ${color} cursor-pointer`}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>

            {/* Product indicators */}
            <div className="absolute  bottom-4 left-0 top-30 opacity-0 right-0 flex justify-center gap-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProduct(index)}
                  className={`w-3 h-3 cursor-pointer rounded-full transition-all ${
                    activeProduct === index ? "bg-white w-6" : "bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute  bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
            <motion.div
              className="w-1 h-2 bg-white rounded-full"
              animate={{
                y: [0, 6, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          </div>
          <button className="text-white mt-2 text-sm flex items-center gap-1">
            Explore <FiChevronDown className="mt-1" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroEcommerce;
