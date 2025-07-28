import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const backgroundImages = [
    'https://static.vecteezy.com/system/resources/previews/011/848/284/non_2x/world-map-background-with-color-gradient-vector.jpg',
    
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (
        storedUser &&
        formData.name === storedUser.username &&
        formData.password === storedUser.password
      ) {
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/home');
      } else {
        alert('⚠️ Invalid username or password.');
      }
    } else {
      localStorage.setItem(
        'user',
        JSON.stringify({ username: formData.name, email: formData.email, password: formData.password })
      );
      alert('🏖️ Registered successfully!');
      setIsLogin(true);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >
        <div 
          className="w-full h-full bg-cover bg-center filter blur-sm"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${backgroundImages[0]})` 
          }}
        />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <motion.div 
            className="text-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mb-4 shadow-2xl">
              <MapPin className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">ROAMR</h1>
            <p className="text-white/80 text-lg">Discover India's Hidden Gems</p>
          </motion.div>

          {/* Auth Form */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Toggle */}
            <div className="flex bg-white/10 rounded-2xl p-1 mb-6">
              <motion.button
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                  isLogin 
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg' 
                    : 'text-white/70 hover:text-white'
                }`}
                onClick={() => setIsLogin(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Login
              </motion.button>
              <motion.button
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                  !isLogin 
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg' 
                    : 'text-white/70 hover:text-white'
                }`}
                onClick={() => setIsLogin(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign Up
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 focus:bg-white/20 transition-all"
                    required
                  />
                </div>
              )}

              {isLogin && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Username"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 focus:bg-white/20 transition-all"
                    required
                  />
                </div>
              )}

              {!isLogin && (
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 focus:bg-white/20 transition-all"
                    required
                  />
                </div>
              )}

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-orange-400 focus:bg-white/20 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? 'Processing...' : isLogin ? 'Login to ROAMR' : 'Create Account'}
              </motion.button>
            </form>

            <p className="text-center text-white/60 text-sm mt-6">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
