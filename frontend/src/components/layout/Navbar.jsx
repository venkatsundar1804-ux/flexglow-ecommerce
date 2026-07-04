import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, User, Menu, X, Heart } from 'lucide-react';
import { CartContext } from '../../context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartItems } = useContext(CartContext);
  
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-800 hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-heading font-bold text-2xl tracking-tighter text-gray-900">
            Flex<span className="text-[var(--color-primary)]">Glow</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-[var(--color-primary)] relative group ${
                location.pathname === link.path ? 'text-[var(--color-primary)]' : 'text-gray-700'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`}></span>
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          <button className="text-gray-700 hover:text-[var(--color-primary)] transition-colors">
            <Search size={20} />
          </button>
          <Link to="/wishlist" className="hidden md:block text-gray-700 hover:text-[var(--color-primary)] transition-colors relative">
            <Heart size={20} />
            <span className="absolute -top-2 -right-2 bg-[var(--color-accent)] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
          </Link>
          <Link to="/login" className="hidden md:block text-gray-700 hover:text-[var(--color-primary)] transition-colors">
            <User size={20} />
          </Link>
          <Link to="/cart" className="text-gray-700 hover:text-[var(--color-primary)] transition-colors relative">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[var(--color-primary)] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white z-50 p-6 flex flex-col shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <Link to="/" className="font-heading font-bold text-2xl text-gray-900">
                  Flex<span className="text-[var(--color-primary)]">Glow</span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-900 bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-lg font-medium ${
                      location.pathname === link.path ? 'text-[var(--color-primary)]' : 'text-gray-800'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col gap-4">
                <Link to="/login" className="flex items-center gap-3 text-gray-800 font-medium">
                  <User size={20} />
                  Login / Register
                </Link>
                <Link to="/wishlist" className="flex items-center gap-3 text-gray-800 font-medium">
                  <Heart size={20} />
                  Wishlist (0)
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
