import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'Face Serums',
    image: '/images/serum_yellow_bottle_1782982637214.png',
    description: 'Potent formulas for targeted results.',
    size: 'large'
  },
  {
    id: 2,
    name: 'Moisturizers',
    image: '/images/night_cream_jar.png',
    description: 'Deep hydration for lasting glow.',
    size: 'small'
  },
  {
    id: 3,
    name: 'Skincare',
    image: '/images/rose_quartz_roller.png',
    description: 'Your complete daily regimen.',
    size: 'small'
  },
  {
    id: 4,
    name: 'Makeup',
    image: '/images/foundation_premium.png',
    description: 'Flawless finish and radiant color.',
    size: 'medium'
  },
  {
    id: 5,
    name: 'Body Care',
    image: '/images/body_lotion_pump.png',
    description: 'Nourishing care from head to toe.',
    size: 'large'
  },
  {
    id: 6,
    name: 'Hair Care',
    image: '/images/defense_shampoo.png',
    description: 'Restore shine and strength.',
    size: 'medium'
  },
  {
    id: 7,
    name: 'Gift Sets',
    image: '/images/gift_set_premium.png',
    description: 'Perfect bundles for every occasion.',
    size: 'small'
  },
  {
    id: 8,
    name: 'Sunscreens',
    image: '/images/sunscreen_bottle.png',
    description: 'Essential daily UV protection.',
    size: 'small'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const Categories = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[var(--color-background)]">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6"
          >
            Shop by Category
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-lg"
          >
            Explore our curated collections of premium beauty and skincare products tailored to your unique needs.
          </motion.p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[300px]"
        >
          {categories.map((category) => {
            let colSpan = 'col-span-1';
            let rowSpan = 'row-span-1';

            if (category.size === 'large') {
              colSpan = 'md:col-span-2 lg:col-span-2';
              rowSpan = 'row-span-2';
            } else if (category.size === 'medium') {
              colSpan = 'md:col-span-2 lg:col-span-2';
              rowSpan = 'row-span-1';
            }

            return (
              <motion.div
                variants={item}
                key={category.id}
                className={`${colSpan} ${rowSpan} group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500`}
              >
                <Link to={`/shop?category=${encodeURIComponent(category.name)}`} className="absolute inset-0 z-10" />
                
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-0"></div>
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-0">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-heading font-bold text-white mb-2">{category.name}</h3>
                    <p className="text-white/90 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {category.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-white font-semibold">
                      Shop Now <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </div>
  );
};

export default Categories;
