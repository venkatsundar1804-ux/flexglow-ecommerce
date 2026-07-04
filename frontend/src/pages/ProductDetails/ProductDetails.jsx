import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import { CartContext } from '../../context/CartContext';
import { Star, Truck, Shield, RefreshCcw, Minus, Plus, Heart, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (!loading) {
      const foundProduct = products.find(p => p._id === id);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        navigate('/not-found');
      }
    }
  }, [id, products, loading, navigate]);

  if (loading || !product) {
    return <div className="min-h-screen pt-32 pb-16 flex items-center justify-center">Loading...</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, qty);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[var(--color-background)]">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-8">
          <span>Home</span> &gt; <span>Shop</span> &gt; <span>{product.category}</span> &gt; <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          {/* Product Image */}
          <div className="lg:w-1/2">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              {product.discount > 0 && (
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-[var(--color-primary)] text-white text-sm font-bold rounded-full uppercase tracking-wider">
                    -{product.discount}% OFF
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <p className="text-[var(--color-primary)] font-semibold tracking-wider uppercase text-sm mb-2">{product.brand}</p>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-[var(--color-accent)]">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={18} fill={i <= Math.round(product.rating) ? "currentColor" : "none"} className={i <= Math.round(product.rating) ? "" : "text-gray-300"} />
                ))}
              </div>
              <span className="text-sm text-gray-500 underline cursor-pointer">{product.numReviews} Reviews</span>
            </div>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-3xl font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
              {product.discount > 0 && (
                <span className="text-xl text-gray-400 line-through">₹{product.mrp.toFixed(2)}</span>
              )}
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded-full h-14 px-4 w-32 shrink-0">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-gray-500 hover:text-gray-900"><Minus size={18} /></button>
                <input type="number" value={qty} readOnly className="w-full text-center bg-transparent font-semibold text-gray-900 outline-none" />
                <button onClick={() => setQty(qty + 1)} className="text-gray-500 hover:text-gray-900"><Plus size={18} /></button>
              </div>
              
              <motion.button 
                whileTap={{ scale: 0.95 }}
                animate={isAdded ? { scale: [1, 1.05, 1], transition: { duration: 0.3 } } : {}}
                onClick={handleAddToCart}
                className={`flex-1 h-14 text-white rounded-full font-semibold text-lg transition-all duration-300 shadow-lg ${
                  isAdded ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-900 hover:bg-[var(--color-primary)]'
                }`}
              >
                {isAdded ? 'Added to Cart ✓' : `Add to Cart - ₹${(product.price * qty).toFixed(2)}`}
              </motion.button>

              <button className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all shrink-0">
                <Heart size={22} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-200">
              <div className="flex items-center gap-3 text-gray-600">
                <Truck size={20} className="text-[var(--color-primary)]" />
                <span className="text-sm font-medium">Free Shipping</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <RefreshCcw size={20} className="text-[var(--color-primary)]" />
                <span className="text-sm font-medium">30-Day Returns</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Shield size={20} className="text-[var(--color-primary)]" />
                <span className="text-sm font-medium">2 Year Warranty</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-900">Share:</span>
              <button className="text-gray-500 hover:text-[var(--color-primary)] transition-colors"><Share2 size={18} /></button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="flex flex-wrap gap-8 border-b border-gray-200 mb-8">
            {['description', 'ingredients', 'how to use'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-lg font-heading font-semibold capitalize relative transition-colors ${
                  activeTab === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-primary)] rounded-t-full"></span>
                )}
              </button>
            ))}
          </div>

          <div className="prose max-w-none text-gray-600">
            {activeTab === 'description' && (
              <div>
                <p className="mb-4">{product.description}</p>
                <h4 className="font-heading font-semibold text-gray-900 mt-6 mb-2">Key Benefits:</h4>
                <p>{product.benefits}</p>
                <ul className="mt-4 space-y-2">
                  <li><strong>Skin Type:</strong> {product.skinType}</li>
                  <li><strong>Weight:</strong> {product.weight}</li>
                  <li><strong>SKU:</strong> {product.sku}</li>
                </ul>
              </div>
            )}
            {activeTab === 'ingredients' && (
              <div>
                <p>{product.ingredients}</p>
                <p className="mt-4 text-sm text-gray-500 italic">Please note that ingredient lists may change or vary from time to time. Please refer to the ingredient list on the product package you receive for the most up to date list of ingredients.</p>
              </div>
            )}
            {activeTab === 'how to use' && (
              <div>
                <p>{product.directions}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
