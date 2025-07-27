import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, DollarSign, Compass, Mountain, Camera, Plane, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const features = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Smart Destinations",
      description: "AI-powered recommendations based on your preferences"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Perfect Timing",
      description: "Best travel dates considering weather and local events"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Budget Optimization",
      description: "Get the most value from your travel budget"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Group Planning",
      description: "Seamless planning for solo trips to large groups"
    }
  ];

  const destinations = [
    {
      name: "Mysore Palace",
      image: "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg",
      description: "Architectural marvel of Karnataka"
    },
    {
      name: "Hampi Ruins",
      image: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg",
      description: "UNESCO World Heritage Site"
    },
    {
      name: "Coorg Hills",
      image: "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg",
      description: "Coffee plantations and scenic beauty"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                ROAMR
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">Welcome, {user?.name}!</span>
              <motion.button
                onClick={logout}
                className="p-2 text-gray-600 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <LogOut className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-orange-500/20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
                Discover India
              </span>
              <br />
              <span className="text-gray-800">Like Never Before</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              From the majestic palaces of Karnataka to the serene backwaters of Kerala, 
              let ROAMR craft your perfect Indian adventure with AI-powered planning.
            </p>

            <motion.button
              onClick={() => navigate('/plan-trip')}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                y: [0, -10, 0],
                boxShadow: [
                  "0 10px 30px rgba(0,0,0,0.1)",
                  "0 20px 40px rgba(0,0,0,0.15)",
                  "0 10px 30px rgba(0,0,0,0.1)"
                ]
              }}
              transition={{ 
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Plane className="w-6 h-6 mr-2" />
              Plan Your Trip
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ROAMR?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience intelligent travel planning that understands your needs and creates unforgettable journeys
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600">
              Explore the most loved destinations in India
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-3xl shadow-xl">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                    <p className="text-white/90">{destination.description}</p>
                  </div>
                  <div className="absolute top-6 right-6">
                    <Camera className="w-6 h-6 text-white/80" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-pink-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let ROAMR create a personalized itinerary that matches your dreams and budget
            </p>
            <motion.button
              onClick={() => navigate('/plan-trip')}
              className="inline-flex items-center px-8 py-4 bg-white text-orange-500 font-bold text-lg rounded-full shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Compass className="w-6 h-6 mr-2" />
              Start Planning Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;