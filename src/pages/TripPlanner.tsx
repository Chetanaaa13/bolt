import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, DollarSign, ArrowRight, Mountain, Camera, Utensils, Car } from 'lucide-react';
import { useTrip } from '../context/TripContext';

const TripPlanner: React.FC = () => {
  const navigate = useNavigate();
  const { setTripData, setTripResults } = useTrip();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    days: 3,
    budget: '',
    customBudget: '',
    people: 1,
    preferences: [] as string[]
  });

  const budgetOptions = [
    { value: 'budget', label: 'Budget (₹2,000-5,000/day)', icon: '💰' },
    { value: 'mid-range', label: 'Mid-range (₹5,000-10,000/day)', icon: '💎' },
    { value: 'luxury', label: 'Luxury (₹10,000+/day)', icon: '👑' },
    { value: 'custom', label: 'Custom Budget', icon: '✏️' }
  ];

  const preferenceOptions = [
    { value: 'adventure', label: 'Adventure', icon: <Mountain className="w-5 h-5" /> },
    { value: 'heritage', label: 'Heritage', icon: <Camera className="w-5 h-5" /> },
    { value: 'nature', label: 'Nature', icon: '🌿' },
    { value: 'food', label: 'Food & Culture', icon: <Utensils className="w-5 h-5" /> },
    { value: 'relaxation', label: 'Relaxation', icon: '🧘' },
    { value: 'nightlife', label: 'Nightlife', icon: '🌃' }
  ];

  const popularDestinations = [
    // Karnataka
    'Mysore', 'Hampi', 'Coorg', 'Bangalore', 'Mangalore', 'Udupi', 
    'Chikmagalur', 'Hassan', 'Belur', 'Halebidu', 'Badami', 'Bijapur',
    'Shravanabelagola', 'Bandipur', 'Nagarhole', 'Jog Falls', 'Gokarna',
    
    // Popular Indian Destinations
    'Goa', 'Mumbai', 'Delhi', 'Agra', 'Jaipur', 'Udaipur', 'Jodhpur',
    'Kerala (Kochi)', 'Munnar', 'Alleppey', 'Thekkady', 'Wayanad',
    'Chennai', 'Pondicherry', 'Mahabalipuram', 'Kodaikanal', 'Ooty',
    'Hyderabad', 'Visakhapatnam', 'Tirupati', 'Araku Valley',
    'Kolkata', 'Darjeeling', 'Gangtok', 'Kalimpong', 'Sundarbans',
    'Bhubaneswar', 'Puri', 'Konark', 'Chilika Lake',
    'Amritsar', 'Shimla', 'Manali', 'Dharamshala', 'Rishikesh', 'Haridwar',
    'Varanasi', 'Lucknow', 'Nainital', 'Mussoorie', 'Jim Corbett',
    'Ahmedabad', 'Rajkot', 'Dwarka', 'Somnath', 'Rann of Kutch',
    'Pune', 'Aurangabad', 'Nashik', 'Lonavala', 'Mahabaleshwar',
    'Srinagar', 'Leh-Ladakh', 'Jammu', 'Pahalgam', 'Gulmarg',
    'Bhopal', 'Indore', 'Khajuraho', 'Gwalior', 'Ujjain',
    'Raipur', 'Jagdalpur', 'Kanker', 'Dantewada',
    'Ranchi', 'Jamshedpur', 'Deoghar', 'Hazaribagh'
  ];

  const generateTripResults = () => {
    // Mock AI-generated trip results
    const results = [
      {
        id: 1,
        title: "Heritage Explorer",
        duration: formData.days,
        totalCost: formData.budget === 'budget' ? 8000 : formData.budget === 'mid-range' ? 15000 : 25000,
        highlights: ["Palace visits", "Historical tours", "Local cuisine"],
        hotels: [
          {
            name: "Heritage Grand Hotel",
            rating: 4.5,
            price: 3500,
            image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
          }
        ],
        transport: {
          type: "AC Bus + Local transport",
          cost: 2000,
          details: "Comfortable travel with sightseeing"
        },
        itinerary: [
          {
            day: 1,
            activities: ["Arrival and check-in", "Mysore Palace visit", "Local market exploration"],
            meals: ["Welcome lunch", "Traditional dinner"]
          },
          {
            day: 2,
            activities: ["Chamundi Hills", "St. Philomena's Church", "Brindavan Gardens"],
            meals: ["Hotel breakfast", "Local cuisine lunch", "Garden view dinner"]
          }
        ],
        restaurants: [
          { name: "Royal Orchid Restaurant", cuisine: "South Indian", rating: 4.2 },
          { name: "Heritage Cafe", cuisine: "Continental", rating: 4.0 }
        ]
      },
      {
        id: 2,
        title: "Nature & Adventure",
        duration: formData.days,
        totalCost: formData.budget === 'budget' ? 9500 : formData.budget === 'mid-range' ? 18000 : 30000,
        highlights: ["Trekking", "Wildlife safari", "Waterfall visits"],
        hotels: [
          {
            name: "Forest View Resort",
            rating: 4.3,
            price: 4200,
            image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg"
          }
        ],
        transport: {
          type: "SUV + Trekking guide",
          cost: 2500,
          details: "Off-road adventures included"
        },
        itinerary: [
          {
            day: 1,
            activities: ["Arrival", "Nature walk", "Campfire evening"],
            meals: ["Arrival snacks", "BBQ dinner"]
          },
          {
            day: 2,
            activities: ["Early morning trek", "Waterfall visit", "Wildlife spotting"],
            meals: ["Packed breakfast", "Picnic lunch", "Resort dinner"]
          }
        ],
        restaurants: [
          { name: "Mountain View Dhaba", cuisine: "North Indian", rating: 4.1 },
          { name: "Organic Farm Restaurant", cuisine: "Farm-to-table", rating: 4.4 }
        ]
      },
      {
        id: 3,
        title: "Cultural Immersion",
        duration: formData.days,
        totalCost: formData.budget === 'budget' ? 7500 : formData.budget === 'mid-range' ? 14000 : 22000,
        highlights: ["Temple visits", "Cultural shows", "Art workshops"],
        hotels: [
          {
            name: "Cultural Heritage Stay",
            rating: 4.1,
            price: 3000,
            image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg"
          }
        ],
        transport: {
          type: "Local transport + Walking tours",
          cost: 1500,
          details: "Authentic local experience"
        },
        itinerary: [
          {
            day: 1,
            activities: ["Temple hopping", "Traditional craft workshop", "Cultural performance"],
            meals: ["Traditional breakfast", "Temple prasadam", "Cultural dinner"]
          },
          {
            day: 2,
            activities: ["Art gallery visits", "Local artisan meetings", "Shopping for handicrafts"],
            meals: ["Artisan breakfast", "Local street food", "Farewell dinner"]
          }
        ],
        restaurants: [
          { name: "Traditional Thali House", cuisine: "Regional", rating: 4.3 },
          { name: "Cultural Cafe", cuisine: "Fusion", rating: 4.0 }
        ]
      }
    ];

    return results;
  };

  const handleSubmit = () => {
    const tripResults = generateTripResults();
    setTripData(formData);
    setTripResults(tripResults);
    navigate('/trip-results');
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50"
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => navigate('/home')}
              className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition-colors"
              whileHover={{ x: -5 }}
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
              <span>Back to Home</span>
            </motion.button>
            
            <div className="flex items-center space-x-3">
              <MapPin className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                ROAMR
              </span>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step <= currentStep
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                  animate={{ scale: step === currentStep ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {step}
                </motion.div>
                {step < 4 && (
                  <div className={`w-16 sm:w-24 h-1 mx-2 ${
                    step < currentStep ? 'bg-gradient-to-r from-orange-500 to-pink-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-gray-600">
            Step {currentStep} of 4
          </div>
        </div>

        {/* Form Steps */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl p-8 mb-8"
        >
          {/* Step 1: Destinations */}
          {currentStep === 1 && (
            <div>
              <div className="text-center mb-8">
                <MapPin className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Where do you want to go?</h2>
                <p className="text-gray-600">Choose your departure and destination cities</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">From</label>
                  <input
                    type="text"
                    list="from-cities"
                    value={formData.from}
                    onChange={(e) => setFormData({...formData, from: e.target.value})}
                    placeholder="Enter departure city"
                    className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 text-lg"
                  />
                  <datalist id="from-cities">
                    {popularDestinations.map(city => (
                      <option key={city} value={city} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">To</label>
                  <input
                    type="text"
                    list="to-cities"
                    value={formData.to}
                    onChange={(e) => setFormData({...formData, to: e.target.value})}
                    placeholder="Enter destination city"
                    className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 text-lg"
                  />
                  <datalist id="to-cities">
                    {popularDestinations.map(city => (
                      <option key={city} value={city} />
                    ))}
                  </datalist>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                  {popularDestinations.slice(0, 12).map(city => (
                    <motion.button
                      key={city}
                      onClick={() => setFormData({...formData, to: city})}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        formData.to === city
                          ? 'border-orange-400 bg-orange-50 text-orange-600'
                          : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-xs font-medium">{city}</div>
                    </motion.button>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-gray-500 text-sm">
                    Can't find your destination? Type it in the search box above!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Duration & People */}
          {currentStep === 2 && (
            <div>
              <div className="text-center mb-8">
                <div className="flex justify-center space-x-4 mb-4">
                  <Calendar className="w-16 h-16 text-orange-500" />
                  <Users className="w-16 h-16 text-pink-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Trip Details</h2>
                <p className="text-gray-600">How long will you be traveling and with how many people?</p>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">Number of Days</label>
                  <div className="flex items-center justify-center space-x-6">
                    <motion.button
                      onClick={() => setFormData({...formData, days: Math.max(1, formData.days - 1)})}
                      className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      -
                    </motion.button>
                    <div className="text-4xl font-bold text-orange-500 min-w-[80px] text-center">
                      {formData.days}
                    </div>
                    <motion.button
                      onClick={() => setFormData({...formData, days: Math.min(30, formData.days + 1)})}
                      className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      +
                    </motion.button>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">Number of People</label>
                  <div className="flex items-center justify-center space-x-6">
                    <motion.button
                      onClick={() => setFormData({...formData, people: Math.max(1, formData.people - 1)})}
                      className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      -
                    </motion.button>
                    <div className="text-4xl font-bold text-pink-500 min-w-[80px] text-center">
                      {formData.people}
                    </div>
                    <motion.button
                      onClick={() => setFormData({...formData, people: Math.min(20, formData.people + 1)})}
                      className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      +
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Budget */}
          {currentStep === 3 && (
            <div>
              <div className="text-center mb-8">
                <DollarSign className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">What's your budget?</h2>
                <p className="text-gray-600">Choose a budget range that works for you</p>
              </div>

              <div className="space-y-4">
                {budgetOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => setFormData({...formData, budget: option.value})}
                    className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
                      formData.budget === option.value
                        ? 'border-orange-400 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">{option.icon}</span>
                      <div>
                        <div className="font-bold text-lg">{option.label}</div>
                        <div className="text-gray-600 text-sm">
                          {option.value === 'budget' && 'Perfect for backpackers and budget travelers'}
                          {option.value === 'mid-range' && 'Comfortable stays with good amenities'}
                          {option.value === 'luxury' && 'Premium experiences and luxury accommodations'}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
                
                {formData.budget === 'custom' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6"
                  >
                    <label className="block text-lg font-semibold text-gray-700 mb-3">
                      Enter your budget per day (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.customBudget}
                      onChange={(e) => setFormData({...formData, customBudget: e.target.value})}
                      placeholder="e.g., 7500"
                      className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 text-lg"
                      min="500"
                      max="50000"
                    />
                    <p className="text-gray-500 text-sm mt-2">
                      Minimum ₹500/day, Maximum ₹50,000/day
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Preferences */}
          {currentStep === 4 && (
            <div>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✨</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">What interests you?</h2>
                <p className="text-gray-600">Select your travel preferences (optional)</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {preferenceOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => {
                      const newPreferences = formData.preferences.includes(option.value)
                        ? formData.preferences.filter(p => p !== option.value)
                        : [...formData.preferences, option.value];
                      setFormData({...formData, preferences: newPreferences});
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      formData.preferences.includes(option.value)
                        ? 'border-orange-400 bg-orange-50 text-orange-600'
                        : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="text-2xl">
                        {typeof option.icon === 'string' ? option.icon : option.icon}
                      </div>
                      <span className="font-medium text-sm">{option.label}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <motion.button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-8 py-4 rounded-2xl font-bold transition-all ${
              currentStep === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            whileHover={currentStep !== 1 ? { scale: 1.05 } : {}}
            whileTap={currentStep !== 1 ? { scale: 0.95 } : {}}
          >
            Previous
          </motion.button>

          <motion.button
            onClick={nextStep}
            disabled={
              (currentStep === 1 && (!formData.from || !formData.to)) ||
              (currentStep === 3 && (!formData.budget || (formData.budget === 'custom' && !formData.customBudget)))
            }
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentStep === 4 ? 'Generate Trip Plan' : 'Next'}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;