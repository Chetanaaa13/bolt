import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import TripPlanner from './pages/TripPlanner';
import TripResults from './pages/TripResults';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccess from './pages/PaymentSuccess';
import { AuthProvider } from './context/AuthContext';
import { TripProvider } from './context/TripContext';

function App() {
  return (
    <AuthProvider>
      <TripProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-green-50">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/plan-trip" element={<TripPlanner />} />
                <Route path="/trip-results" element={<TripResults />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
              </Routes>
            </AnimatePresence>
          </div>
        </Router>
      </TripProvider>
    </AuthProvider>
  );
}

export default App;