import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
  const { cartItems } = useContext(CartContext);
  
  // In a real app, we would clear the cart after successful checkout,
  // but we can't easily clear it here without a proper checkout flow 
  // that transitions to success page. I'll omit clearing it here for simplicity
  // or it could clear on mount if a flag is passed.
  
  return (
    <div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center bg-[var(--color-background)] px-4">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="bg-white p-10 md:p-16 rounded-3xl shadow-xl text-center max-w-lg w-full border border-gray-100"
      >
        <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={48} />
        </div>
        
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-8 text-lg">Your order has been placed successfully. We'll send you a confirmation email with your tracking details shortly.</p>
        
        <div className="bg-gray-50 p-6 rounded-2xl mb-8">
          <p className="text-sm text-gray-500 mb-1">Order Number</p>
          <p className="font-mono font-bold text-gray-900">#FG-{Math.floor(Math.random() * 1000000)}</p>
        </div>
        
        <Link 
          to="/shop" 
          className="w-full py-4 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-[var(--color-primary)] transition-colors shadow-lg flex items-center justify-center gap-2"
        >
          <ShoppingBag size={20} /> Continue Shopping
        </Link>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
