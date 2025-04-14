import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiArrowRight } from 'react-icons/fi';

const JuiceHero = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [currentOffer, setCurrentOffer] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  // Juice offers data
  const offers = [
    {
      id: 1,
      title: "Tropical Blast",
      description: "Mango, Pineapple & Coconut",
      discount: "40% OFF",
      price: "$5.99",
      color: "from-yellow-300 to-orange-400",
      video: "./Watermelon Juice.mp4"
    },
    {
      id: 2,
      title: "Berry Cooler",
      description: "Strawberry, Blueberry & Mint",
      discount: "35% OFF",
      price: "$6.49",
      color: "from-pink-400 to-purple-500",
      video: "./Watermelon Juice.mp4"
    },
    {
      id: 3,
      title: "Citrus Zing",
      description: "Orange, Lemon & Lime",
      discount: "30% OFF",
      price: "$5.79",
      color: "from-orange-300 to-yellow-400",
      video: "./Watermelon Juice.mp4"
    }
  ];

  // Handle mouse movement for 360° rotation
  const handleMouseMove = (e) => {
    if (!containerRef.current || !isDragging) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setRotation({
      x: (y - centerY) / 20, // Vertical tilt
      y: (centerX - x) / 10  // Horizontal rotation
    });
    
    // Control video playback based on horizontal rotation
    if (videoRef.current) {
      const progress = ((rotation.y + 180) % 360) / 360;
      videoRef.current.currentTime = progress * videoRef.current.duration;
    }
  };

  const startDrag = () => {
    setIsDragging(true);
    document.body.style.cursor = 'grabbing';
  };

  const endDrag = () => {
    setIsDragging(false);
    document.body.style.cursor = '';
    setRotation({ x: 0, y: 0 });
  };

  // Auto-rotate offers
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer(prev => (prev + 1) % offers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Floating fruit elements */}
      {['🍍', '🍓', '🍋', '🥝'].map((fruit, i) => (
        <motion.div
          key={i}
          className={`absolute text-4xl z-10`}
          style={{
            left: `${15 + i * 20}%`,
            top: `${20 + i * 15}%`
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            transition: {
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          {fruit}
        </motion.div>
      ))}

      <div className="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center justify-center py-20">
        {/* Left side - Text content */}
        <div className="lg:w-1/3 mb-12 lg:mb-0 lg:pr-10">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-600">
              Summer Refreshment
            </span>
            <br />
            <span className="text-4xl md:text-5xl">360° Juice Experience</span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Drag to rotate our premium juice cans. Each flavor crafted for maximum refreshment.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 flex items-center gap-2">
              Order Now <FiShoppingCart />
            </button>
            <button className="px-8 py-3 bg-white text-gray-900 border-2 border-gray-900 rounded-full font-semibold text-lg hover:bg-gray-900 hover:text-white transition-all duration-300 flex items-center gap-2">
              View All <FiArrowRight />
            </button>
          </motion.div>
        </div>

        {/* Center - 360° Video Can */}
        <div className="lg:w-1/3 flex items-center justify-center">
          <motion.div
            ref={containerRef}
            className="relative w-64 h-96 cursor-grab active:cursor-grabbing"
            onMouseDown={startDrag}
            onMouseMove={handleMouseMove}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            animate={{
              rotateX: rotation.x,
              rotateY: rotation.y,
              transition: isDragging 
                ? { type: "linear" } 
                : { type: "spring", damping: 20, stiffness: 100 }
            }}
          >
            <video
              ref={videoRef}
              src={offers[currentOffer].video}
              className="w-full h-full object-contain drop-shadow-2xl"
              muted
              loop
              playsInline
              preload="auto"
            />
            <img src='./29364-removebg-preview.png ' />

            
            {/* Reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent rounded-lg pointer-events-none" />
            
            {!isDragging && (
              <motion.div 
                className="absolute -bottom-8 left-0 right-0 text-center text-gray-500 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                ← Drag to rotate →
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Right side - Offers */}
        <div className="lg:w-1/3 lg:pl-10 mt-12 lg:mt-0">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Summer Specials
          </motion.h2>

          <div className="space-y-6">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.id}
                className={`p-6 rounded-2xl bg-gradient-to-br ${offer.color} text-white relative overflow-hidden cursor-pointer`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: currentOffer === index ? 1 : 0.7,
                  y: 0,
                  scale: currentOffer === index ? 1.03 : 1
                }}
                transition={{ duration: 0.5 }}
                onClick={() => setCurrentOffer(index)}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                <p className="mb-4">{offer.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-extrabold">{offer.discount}</span>
                  <span className="text-xl font-medium">{offer.price}</span>
                </div>
                
                {currentOffer === index && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-1 bg-white"
                    layoutId="offerIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JuiceHero;