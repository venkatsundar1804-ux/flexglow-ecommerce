import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="space-y-6">
            <Link to="/" className="inline-block font-heading font-bold text-3xl tracking-tighter text-gray-900">
              Flex<span className="text-[var(--color-primary)]">Glow</span>
            </Link>
            <p className="text-gray-600 leading-relaxed">
              Glow Naturally. Shine Confidently. Experience the pinnacle of clean beauty and modern elegance with our premium skincare collections.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300">
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 text-gray-900">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-gray-600 hover:text-[var(--color-primary)] transition-colors">About Us</Link></li>
              <li><Link to="/shop" className="text-gray-600 hover:text-[var(--color-primary)] transition-colors">Shop All</Link></li>
              <li><Link to="/categories" className="text-gray-600 hover:text-[var(--color-primary)] transition-colors">Categories</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-[var(--color-primary)] transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 text-gray-900">Customer Service</h4>
            <ul className="space-y-4">
              <li><Link to="/dashboard" className="text-gray-600 hover:text-[var(--color-primary)] transition-colors">My Account</Link></li>
              <li><Link to="/track-order" className="text-gray-600 hover:text-[var(--color-primary)] transition-colors">Track Order</Link></li>
              <li><Link to="/returns" className="text-gray-600 hover:text-[var(--color-primary)] transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/shipping" className="text-gray-600 hover:text-[var(--color-primary)] transition-colors">Shipping Policy</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-[var(--color-primary)] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 text-gray-900">Join the Glow Club</h4>
            <p className="text-gray-600 mb-4">Subscribe to receive 10% off your first order and exclusive beauty tips.</p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                required
              />
              <button 
                type="submit"
                className="px-4 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-[var(--color-primary)] transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} FlexGlow. All rights reserved. Designed for MBA Project.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xl">💳</span>
            <span className="text-xl">💰</span>
            <span className="text-xl">🏦</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
