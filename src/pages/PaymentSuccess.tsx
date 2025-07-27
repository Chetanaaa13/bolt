import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  MapPin, 
  Calendar, 
  Users, 
  Mail, 
  Download, 
  Share,
  Home,
  Plane,
  Star
} from 'lucide-react';
import { useTrip } from '../context/TripContext';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const { tripData, tripResults } = useTrip();

  useEffect(() => {
    // Auto redirect to home after 30 seconds if user doesn't interact
    const timer = setTimeout(() => {
      navigate('/home');
    }, 30000);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (!tripData || !tripResults.length) {
    navigate('/home');
    return null;
  }

  const selectedTrip = tripResults[0];
  const bookingId = `ROAMR${Date.now().toString().slice(-6)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 backdrop-blur-md border-b border-white/20"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
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
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
            className="w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <CheckCircle className="w-16 h-16 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-5xl font-bold text-gray-900 mb-4"
          >
            Booking Confirmed! 🎉
          </motion.h1>
          
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-xl text-gray-600 mb-2"
          >
            Your amazing journey to {tripData.to} is all set!
          </motion.p>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"
          />
        </motion.div>

        {/* Booking Details */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="bg-white rounded-3xl shadow-2xl p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Booking Details</h2>
            <div className="bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 rounded-full">
              <span className="font-bold text-green-700">ID: {bookingId}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{tripData.from} → {tripData.to}</h3>
                  <p className="text-gray-600">{selectedTrip.title}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{tripData.days} Days Trip</h3>
                  <p className="text-gray-600">Starting from your selected date</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{tripData.people} {tripData.people === 1 ? 'Traveler' : 'Travelers'}</h3>
                  <p className="text-gray-600">All arrangements confirmed</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                What's Included
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Accommodation for {tripData.days} nights</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>All transportation & transfers</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Guided tours & activities</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>24/7 customer support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Travel insurance included</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="bg-white rounded-3xl shadow-2xl p-8 mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What Happens Next?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Confirmation Email</h3>
              <p className="text-gray-600 text-sm">
                You'll receive detailed itinerary and vouchers within 24 hours
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Pre-Trip Support</h3>
              <p className="text-gray-600 text-sm">
                Our team will contact you 48 hours before departure
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Enjoy Your Trip</h3>
              <p className="text-gray-600 text-sm">
                24/7 support available throughout your journey
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <motion.button
            onClick={() => navigate('/home')}
            className="flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </motion.button>

          <motion.button
            className="flex items-center px-8 py-4 bg-blue-500 text-white font-bold rounded-2xl hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5 mr-2" />
            Download Voucher
          </motion.button>

          <motion.button
            className="flex items-center px-8 py-4 bg-green-500 text-white font-bold rounded-2xl hover:bg-green-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share className="w-5 h-5 mr-2" />
            Share Trip
          </motion.button>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center mt-12 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl"
        >
          <h3 className="font-bold text-lg mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            Our travel experts are here to assist you 24/7
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>📞 +91-8000-123-456</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>✉️ support@roamr.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>💬 Live Chat Available</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentSuccess;