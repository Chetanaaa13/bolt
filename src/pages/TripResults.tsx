import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Users, DollarSign, Star, Car, Utensils, Camera, Heart, Share, Download } from 'lucide-react';
import { useTrip } from '../context/TripContext';

const TripResults: React.FC = () => {
  const navigate = useNavigate();
  const { tripData, tripResults } = useTrip();
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState({ rating: 0, comment: '' });

  if (!tripData || !tripResults.length) {
    navigate('/plan-trip');
    return null;
  }

  const handleFeedbackSubmit = () => {
    // Handle feedback submission
    alert('Thank you for your feedback!');
    setShowFeedback(false);
  };

  const selectedTrip = tripResults[selectedPlan];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => navigate('/plan-trip')}
              className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition-colors"
              whileHover={{ x: -5 }}
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
              <span>Back to Planner</span>
            </motion.button>
            
            <div className="flex items-center space-x-3">
              <MapPin className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                ROAMR
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <motion.button
                onClick={() => setShowFeedback(true)}
                className="p-2 text-gray-600 hover:text-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Heart className="w-5 h-5" />
              </motion.button>
              <motion.button
                className="p-2 text-gray-600 hover:text-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Share className="w-5 h-5" />
              </motion.button>
              <motion.button
                className="p-2 text-gray-600 hover:text-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Download className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Trip Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 mb-8"
        >
          <div className="flex flex-wrap items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {tripData.from} → {tripData.to}
              </h1>
              <p className="text-gray-600 text-lg">
                Your perfect {tripData.days}-day journey for {tripData.people} {tripData.people === 1 ? 'person' : 'people'}
              </p>
            </div>
            <div className="flex items-center space-x-6 text-center">
              <div>
                <Calendar className="w-8 h-8 text-orange-500 mx-auto mb-1" />
                <div className="font-bold text-lg">{tripData.days} Days</div>
              </div>
              <div>
                <Users className="w-8 h-8 text-pink-500 mx-auto mb-1" />
                <div className="font-bold text-lg">{tripData.people} {tripData.people === 1 ? 'Person' : 'People'}</div>
              </div>
              <div>
                <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-1" />
                <div className="font-bold text-lg capitalize">{tripData.budget}</div>
              </div>
            </div>
          </div>

          {tripData.preferences.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-gray-600 font-medium">Preferences:</span>
              {tripData.preferences.map((pref, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-orange-100 to-pink-100 text-orange-600 rounded-full text-sm font-medium"
                >
                  {pref}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Trip Plan Options */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {tripResults.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedPlan(index)}
              className={`cursor-pointer p-6 rounded-3xl transition-all ${
                selectedPlan === index
                  ? 'bg-gradient-to-br from-orange-500 to-pink-500 text-white shadow-2xl scale-105'
                  : 'bg-white shadow-lg hover:shadow-xl hover:scale-105'
              }`}
              whileHover={{ y: -5 }}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">{trip.title}</h3>
                <div className="text-3xl font-bold mb-4">
                  ₹{trip.totalCost.toLocaleString()}
                </div>
                <div className="space-y-2">
                  {trip.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center justify-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        selectedPlan === index ? 'bg-white' : 'bg-orange-500'
                      }`} />
                      <span className="text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Trip Information */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Itinerary */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Calendar className="w-8 h-8 text-orange-500 mr-3" />
              Daily Itinerary
            </h2>

            <div className="space-y-6">
              {selectedTrip.itinerary.map((day, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="border-l-4 border-orange-500 pl-6 pb-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Day {day.day}
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Activities</h4>
                      <ul className="space-y-1">
                        {day.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-center space-x-2 text-gray-600">
                            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Meals</h4>
                      <ul className="space-y-1">
                        {day.meals.map((meal, idx) => (
                          <li key={idx} className="flex items-center space-x-2 text-gray-600">
                            <Utensils className="w-4 h-4 text-green-500" />
                            <span>{meal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hotels & Transport */}
          <div className="space-y-8">
            {/* Hotels */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-2xl p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Camera className="w-8 h-8 text-pink-500 mr-3" />
                Accommodation
              </h2>

              {selectedTrip.hotels.map((hotel, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-20 h-20 object-cover rounded-2xl"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{hotel.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-semibold">{hotel.rating}</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600 mt-2">
                        ₹{hotel.price}/night
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Transport */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-2xl p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Car className="w-8 h-8 text-blue-500 mr-3" />
                Transportation
              </h2>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {selectedTrip.transport.type}
                </h3>
                <p className="text-gray-600 mb-4">{selectedTrip.transport.details}</p>
                <div className="text-2xl font-bold text-blue-600">
                  ₹{selectedTrip.transport.cost}
                </div>
              </div>
            </motion.div>

            {/* Restaurants */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl shadow-2xl p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Utensils className="w-8 h-8 text-green-500 mr-3" />
                Recommended Restaurants
              </h2>

              <div className="space-y-4">
                {selectedTrip.restaurants.map((restaurant, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 hover:shadow-lg transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{restaurant.name}</h3>
                        <p className="text-gray-600">{restaurant.cuisine}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-semibold">{restaurant.rating}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          <motion.button
            onClick={() => navigate('/plan-trip')}
            className="px-8 py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Plan Another Trip
          </motion.button>
          
          <motion.button
            onClick={() => navigate('/payment')}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book This Trip
          </motion.button>
          
          <motion.button
            onClick={() => setShowFeedback(true)}
            className="px-8 py-4 bg-blue-500 text-white font-bold rounded-2xl hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Give Feedback
          </motion.button>
        </motion.div>
      </div>

      {/* Feedback Modal */}
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowFeedback(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              How was your experience?
            </h2>

            <div className="text-center mb-6">
              <div className="flex justify-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    onClick={() => setFeedback({...feedback, rating: star})}
                    className="text-4xl"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {star <= feedback.rating ? '😍' : '😐'}
                  </motion.button>
                ))}
              </div>
              <p className="text-gray-600">Tap to rate your experience</p>
            </div>

            <textarea
              value={feedback.comment}
              onChange={(e) => setFeedback({...feedback, comment: e.target.value})}
              placeholder="Tell us what you think..."
              className="w-full p-4 border border-gray-200 rounded-2xl resize-none h-24 focus:ring-4 focus:ring-orange-200 focus:border-orange-400"
            />

            <div className="flex space-x-4 mt-6">
              <motion.button
                onClick={() => setShowFeedback(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleFeedbackSubmit}
                className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-2xl hover:shadow-lg transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default TripResults;