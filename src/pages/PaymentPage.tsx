import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  MapPin, 
  CreditCard, 
  Shield, 
  CheckCircle, 
  Calendar,
  Users,
  DollarSign,
  Lock,
  Smartphone,
  Wallet,
  Building,
  Star,
  Clock
} from 'lucide-react';
import { useTrip } from '../context/TripContext';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { tripData, tripResults } = useTrip();
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    upiId: '',
    bankAccount: '',
    ifscCode: ''
  });
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!tripData || !tripResults.length) {
    navigate('/plan-trip');
    return null;
  }

  const selectedTrip = tripResults[selectedPlan];
  const totalAmount = selectedTrip.totalCost * tripData.people;
  const taxes = Math.round(totalAmount * 0.18); // 18% GST
  const finalAmount = totalAmount + taxes;

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard className="w-6 h-6" />, popular: true },
    { id: 'upi', name: 'UPI Payment', icon: <Smartphone className="w-6 h-6" />, popular: true },
    { id: 'netbanking', name: 'Net Banking', icon: <Building className="w-6 h-6" />, popular: false },
    { id: 'wallet', name: 'Digital Wallet', icon: <Wallet className="w-6 h-6" />, popular: false }
  ];

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setProcessing(false);
    setPaymentSuccess(true);
    
    // Redirect to success page after 2 seconds
    setTimeout(() => {
      navigate('/payment-success');
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-16 h-16 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-xl text-gray-600 mb-8">Your trip has been booked successfully</p>
          <motion.div
            className="w-16 h-1 bg-green-500 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </motion.div>
      </div>
    );
  }

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
              onClick={() => navigate('/trip-results')}
              className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition-colors"
              whileHover={{ x: -5 }}
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
              <span>Back to Trip Details</span>
            </motion.button>
            
            <div className="flex items-center space-x-3">
              <MapPin className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                ROAMR
              </span>
            </div>

            <div className="flex items-center space-x-2 text-green-600">
              <Shield className="w-5 h-5" />
              <span className="font-medium">Secure Payment</span>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Trip Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-2xl p-6 sticky top-24"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Trip Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <div>
                    <div className="font-semibold">{tripData.from} → {tripData.to}</div>
                    <div className="text-sm text-gray-600">{selectedTrip.title}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-semibold">{tripData.days} Days</div>
                    <div className="text-sm text-gray-600">Duration</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="font-semibold">{tripData.people} {tripData.people === 1 ? 'Person' : 'People'}</div>
                    <div className="text-sm text-gray-600">Travelers</div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between">
                  <span>Trip Cost ({tripData.people} × ₹{selectedTrip.totalCost.toLocaleString()})</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & Fees</span>
                  <span>₹{taxes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-3">
                  <span>Total Amount</span>
                  <span className="text-green-600">₹{finalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-semibold text-sm">Includes:</span>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Accommodation for {tripData.days} nights</li>
                  <li>• Transportation & transfers</li>
                  <li>• Guided tours & activities</li>
                  <li>• 24/7 customer support</li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-2xl p-8"
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Secure Payment</h1>
                  <p className="text-gray-600">Your payment information is encrypted and secure</p>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Payment Method</h3>
                <div className="grid grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <motion.button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-2xl border-2 transition-all relative ${
                        paymentMethod === method.id
                          ? 'border-orange-400 bg-orange-50'
                          : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {method.popular && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full">
                          Popular
                        </div>
                      )}
                      <div className="flex items-center space-x-3">
                        <div className="text-orange-500">{method.icon}</div>
                        <span className="font-medium">{method.name}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Payment Forms */}
              <motion.div
                key={paymentMethod}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {paymentMethod === 'card' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={paymentData.cardNumber}
                        onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400"
                        maxLength={19}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={paymentData.expiryDate}
                          onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={paymentData.cvv}
                          onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400"
                          maxLength={4}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={paymentData.cardName}
                        onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        value={paymentData.upiId}
                        onChange={(e) => setPaymentData({...paymentData, upiId: e.target.value})}
                        placeholder="yourname@paytm"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400"
                      />
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <div className="flex items-center space-x-2 mb-2">
                        <Smartphone className="w-5 h-5 text-blue-500" />
                        <span className="font-semibold text-blue-700">Quick UPI Payment</span>
                      </div>
                      <p className="text-sm text-blue-600">
                        You'll be redirected to your UPI app to complete the payment securely.
                      </p>
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Select Your Bank
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400">
                        <option>State Bank of India</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                        <option>Punjab National Bank</option>
                        <option>Bank of Baroda</option>
                        <option>Canara Bank</option>
                        <option>Other Banks</option>
                      </select>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-xl">
                      <div className="flex items-center space-x-2 mb-2">
                        <Building className="w-5 h-5 text-green-500" />
                        <span className="font-semibold text-green-700">Secure Banking</span>
                      </div>
                      <p className="text-sm text-green-600">
                        You'll be redirected to your bank's secure login page.
                      </p>
                    </div>
                  </div>
                )}

                {paymentMethod === 'wallet' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      {['Paytm', 'PhonePe', 'Google Pay', 'Amazon Pay'].map((wallet) => (
                        <motion.button
                          key={wallet}
                          className="p-4 border-2 border-gray-200 rounded-xl hover:border-orange-200 hover:bg-orange-50 transition-all"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="text-center">
                            <Wallet className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                            <span className="font-medium">{wallet}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Security Features */}
              <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  Your payment is protected by:
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>PCI DSS compliance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Fraud protection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>24/7 monitoring</span>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <motion.button
                onClick={handlePayment}
                disabled={processing}
                className="w-full mt-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: processing ? 1 : 1.02 }}
                whileTap={{ scale: processing ? 1 : 0.98 }}
              >
                {processing ? (
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                    Processing Payment...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Lock className="w-6 h-6 mr-2" />
                    Pay ₹{finalAmount.toLocaleString()} Securely
                  </div>
                )}
              </motion.button>

              <p className="text-center text-gray-500 text-sm mt-4">
                By proceeding, you agree to our Terms of Service and Privacy Policy
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;