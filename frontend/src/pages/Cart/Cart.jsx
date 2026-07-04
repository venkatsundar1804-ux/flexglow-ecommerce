import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const Cart = () => {
  const { cartItems, removeFromCart, updateQty } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 999 ? 0 : 100;
  const total = subtotal + tax + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center bg-[var(--color-background)]">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-6">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md text-center">Looks like you haven't added any products to your cart yet. Discover our premium collections and find your new favorites.</p>
        <Link 
          to="/shop" 
          className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-[var(--color-primary)] transition-colors shadow-lg flex items-center gap-2"
        >
          Start Shopping <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[var(--color-background)]">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-10">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-100 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    key={item._id} 
                    className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                  >
                    <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                      <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-50">
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <Link to={`/product/${item._id}`} className="font-heading font-semibold text-gray-900 hover:text-[var(--color-primary)] transition-colors text-lg line-clamp-1">
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                        <button 
                          onClick={() => removeFromCart(item._id)}
                          className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-span-1 md:col-span-2 md:text-center hidden md:block">
                      <span className="font-semibold text-gray-900">₹{item.price.toFixed(2)}</span>
                    </div>
                    
                    <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center">
                      <div className="flex items-center border border-gray-200 rounded-full h-10 px-3 bg-gray-50 w-28">
                        <button onClick={() => updateQty(item._id, Math.max(1, item.qty - 1))} className="text-gray-500 hover:text-gray-900"><Minus size={14} /></button>
                        <input type="number" value={item.qty} readOnly className="w-full text-center bg-transparent font-semibold text-gray-900 text-sm outline-none" />
                        <button onClick={() => updateQty(item._id, item.qty + 1)} className="text-gray-500 hover:text-gray-900"><Plus size={14} /></button>
                      </div>
                    </div>
                    
                    <div className="col-span-1 md:col-span-2 flex justify-between md:block md:text-right">
                      <span className="md:hidden font-semibold text-gray-900">Total:</span>
                      <span className="font-bold text-gray-900 text-lg">₹{(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-gray-900 rounded-3xl p-8 text-white sticky top-28 shadow-xl shadow-gray-900/20">
              <h3 className="font-heading font-bold text-2xl mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax (8%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                </div>
                
                <div className="pt-4 border-t border-gray-700 flex justify-between items-center">
                  <span className="font-heading font-semibold text-xl">Total</span>
                  <span className="font-bold text-2xl text-[var(--color-primary)]">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-[var(--color-primary)] text-white rounded-full font-bold text-lg hover:bg-pink-600 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight size={20} />
              </button>
              
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
                  <Shield size={14} /> Secure Checkout Guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
