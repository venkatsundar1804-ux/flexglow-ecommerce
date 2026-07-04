import { useContext, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import { CartContext } from '../../context/CartContext';
import { Star, Filter, ChevronDown, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const Shop = () => {
  const { products, loading } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('newest');
  const [addedId, setAddedId] = useState(null);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const handleAddToCart = (item) => {
    addToCart(item, 1);
    setAddedId(item._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const filteredProducts = products
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[var(--color-background)]">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100 py-12 mb-8">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">Shop All Products</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover our full collection of premium beauty and skincare products designed to enhance your natural glow.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar / Filters */}
          <aside className="w-full md:w-64 shrink-0 space-y-8">
            <div>
              <h3 className="font-heading font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Filter size={18} /> Categories
              </h3>
              <ul className="space-y-3">
                {categories.map((cat, idx) => (
                  <li key={idx}>
                    <button 
                      onClick={() => handleCategoryChange(cat)}
                      className={`text-left w-full text-sm transition-colors ${
                        activeCategory === cat 
                          ? 'text-[var(--color-primary)] font-semibold' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-500">Showing {filteredProducts.length} results</p>
              <div className="relative">
                <select 
                  className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg text-sm focus:outline-none focus:border-[var(--color-primary)]"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 aspect-[4/5] rounded-2xl mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    key={product._id} 
                    className="group"
                  >
                    <div className="relative aspect-[4/5] rounded-2xl bg-white mb-4 overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                      <Link to={`/product/${product._id}`}>
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </Link>
                      {product.discount > 0 && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-[var(--color-primary)] text-white text-xs font-bold rounded-full uppercase tracking-wider">
                            -{product.discount}%
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <motion.button 
                          whileTap={{ scale: 0.95 }}
                          animate={addedId === product._id ? { scale: [1, 1.05, 1], transition: { duration: 0.3 } } : {}}
                          onClick={() => handleAddToCart(product)}
                          className={`w-full py-3 text-white rounded-xl font-semibold transition-colors shadow-lg flex items-center justify-center gap-2 ${
                            addedId === product._id ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-900 hover:bg-[var(--color-primary)]'
                          }`}
                        >
                          {addedId === product._id ? (
                            'Added! ✓'
                          ) : (
                            <>
                              <ShoppingBag size={18} /> Add to Cart
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                    <div className="space-y-1 px-1">
                      <Link to={`/product/${product._id}`} className="flex justify-between items-start hover:text-[var(--color-primary)] transition-colors">
                        <h3 className="font-heading font-semibold text-gray-900 leading-tight pr-4">{product.name}</h3>
                        <div className="flex items-center gap-1 text-[var(--color-accent)] shrink-0">
                          <Star size={14} fill="currentColor" />
                          <span className="text-xs text-gray-600 font-medium">{product.rating}</span>
                        </div>
                      </Link>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</p>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">₹{product.price.toFixed(2)}</span>
                        {product.discount > 0 && (
                          <span className="text-sm text-gray-400 line-through">₹{product.mrp.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {filteredProducts.length === 0 && !loading && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
