import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Truck, RefreshCcw } from 'lucide-react';
import { ProductContext } from '../../context/ProductContext';
import { CartContext } from '../../context/CartContext';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const Home = () => {
  const { products, loading } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const bestSellers = products.slice(0, 4);
  const [addedId, setAddedId] = useState(null);

  const handleAddToCart = (item) => {
    addToCart(item, 1);
    setAddedId(item._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1615397323161-5509c25bbaf6?q=80&w=2070&auto=format&fit=crop" 
            alt="Premium Skincare" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-xl"
          >
            <motion.span variants={fadeIn} className="inline-block py-1 px-3 rounded-full bg-[var(--color-secondary)]/30 text-[var(--color-primary)] font-semibold text-sm mb-6 uppercase tracking-wider">
              New Collection
            </motion.span>
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-heading font-bold text-gray-900 leading-tight mb-6">
              Discover Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">Natural Glow</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Experience the pinnacle of clean beauty. Scientifically formulated skincare that reveals your most radiant self.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
              <Link to="/shop" className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-[var(--color-primary)] transition-all duration-300 flex items-center gap-2 group shadow-lg shadow-gray-900/20">
                Shop Collection 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-semibold hover:border-gray-900 transition-all duration-300">
                Our Story
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders over ₹999" },
              { icon: Shield, title: "Secure Payment", desc: "100% secure checkout" },
              { icon: RefreshCcw, title: "Easy Returns", desc: "30-day return policy" },
              { icon: Star, title: "Premium Quality", desc: "Dermatologist tested" },
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-secondary)]/20 flex items-center justify-center text-[var(--color-primary)] mb-4">
                  <feature.icon size={24} />
                </div>
                <h3 className="font-heading font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-[var(--color-background)]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600">Curated collections for your specific skin needs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Skincare', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1974&auto=format&fit=crop', link: '/categories/skincare' },
              { name: 'Body Care', img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1953&auto=format&fit=crop', link: '/categories/bodycare' },
              { name: 'Serums', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1974&auto=format&fit=crop', link: '/categories/serums' },
            ].map((cat, idx) => (
              <Link key={idx} to={cat.link} className="group relative h-96 rounded-2xl overflow-hidden shadow-lg shadow-gray-200/50">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                  <h3 className="text-2xl font-heading font-semibold text-white">{cat.name}</h3>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white group-hover:text-gray-900 transition-colors duration-300">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers (Placeholder for now) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">Trending Now</h2>
              <p className="text-gray-600">Our most loved products by the FlexGlow community.</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-gray-900 font-semibold hover:text-[var(--color-primary)] transition-colors">
              View All <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              <div className="col-span-full text-center py-10">Loading products...</div>
            ) : (
              bestSellers.map((item) => (
                <div key={item._id} className="group">
                  <div className="relative aspect-[4/5] rounded-2xl bg-gray-100 mb-4 overflow-hidden">
                    <img 
                      src={item.images[0]} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold rounded-full text-gray-900 uppercase tracking-wider">Bestseller</span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        animate={addedId === item._id ? { scale: [1, 1.05, 1], transition: { duration: 0.3 } } : {}}
                        onClick={() => handleAddToCart(item)}
                        className={`w-full py-3 text-white rounded-xl font-semibold transition-colors shadow-lg flex items-center justify-center gap-2 ${
                          addedId === item._id ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-900 hover:bg-[var(--color-primary)]'
                        }`}
                      >
                        {addedId === item._id ? 'Added! ✓' : 'Add to Cart'}
                      </motion.button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Link to={`/product/${item._id}`} className="flex justify-between items-start hover:text-[var(--color-primary)] transition-colors">
                      <h3 className="font-heading font-semibold text-gray-900">{item.name}</h3>
                      <div className="flex items-center gap-1 text-[var(--color-accent)] shrink-0">
                        <Star size={14} fill="currentColor" />
                        <span className="text-xs text-gray-600 font-medium">{item.rating}</span>
                      </div>
                    </Link>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <p className="font-semibold text-gray-900">₹{item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/shop" className="inline-flex items-center gap-2 text-gray-900 font-semibold hover:text-[var(--color-primary)] transition-colors border-b border-gray-900 pb-1">
              View All Bestsellers <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
