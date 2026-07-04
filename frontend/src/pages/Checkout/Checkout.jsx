import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '',
    address: '', city: '', state: '', zip: '',
    cardName: '', cardNumber: '', expDate: '', cvv: ''
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const total = subtotal + (subtotal * 0.08) + (subtotal > 999 ? 0 : 100);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Simulate order processing
      setTimeout(() => {
        // Here you would clear cart and save order
        navigate('/success');
      }, 1500);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[var(--color-background)]">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8 text-center">Secure Checkout</h1>
        
        {/* Progress Tracker */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4 w-full max-w-lg">
            {[
              { num: 1, label: 'Shipping' },
              { num: 2, label: 'Payment' },
              { num: 3, label: 'Review' }
            ].map((s, idx) => (
              <div key={s.num} className="flex flex-1 items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= s.num ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {step > s.num ? <CheckCircle size={16} /> : s.num}
                </div>
                <span className={`text-sm font-semibold hidden md:block ${step >= s.num ? 'text-gray-900' : 'text-gray-400'}`}>{s.label}</span>
                {idx < 2 && <div className={`h-1 flex-1 rounded-full ${step > s.num ? 'bg-[var(--color-primary)]' : 'bg-gray-200'}`}></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit}>
            
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h2 className="text-2xl font-heading font-semibold mb-6 text-gray-900">Shipping Details</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <input required name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <input required name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-700">Street Address</label>
                    <input required name="address" value={formData.address} onChange={handleInputChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none" />
                  </div>
                  <div className="col-span-2 md:col-span-1 space-y-2">
                    <label className="text-sm font-medium text-gray-700">City</label>
                    <input required name="city" value={formData.city} onChange={handleInputChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none" />
                  </div>
                  <div className="col-span-2 md:col-span-1 grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">State</label>
                      <input required name="state" value={formData.state} onChange={handleInputChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">ZIP</label>
                      <input required name="zip" value={formData.zip} onChange={handleInputChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h2 className="text-2xl font-heading font-semibold mb-6 text-gray-900">Payment Information</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Name on Card</label>
                    <input required name="cardName" value={formData.cardName} onChange={handleInputChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Card Number</label>
                    <input required name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Expiry Date</label>
                      <input required name="expDate" value={formData.expDate} onChange={handleInputChange} type="text" placeholder="MM/YY" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">CVV</label>
                      <input required name="cvv" value={formData.cvv} onChange={handleInputChange} type="text" placeholder="123" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] outline-none" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                <h2 className="text-2xl font-heading font-semibold mb-6 text-gray-900">Review Order</h2>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h3 className="font-semibold text-lg mb-4 text-gray-900">Order Summary</h3>
                  <div className="space-y-4 mb-4">
                    {cartItems.map(item => (
                      <div key={item._id} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.qty}x {item.name}</span>
                        <span className="font-medium text-gray-900">₹{(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total to Pay</span>
                    <span className="font-bold text-xl text-[var(--color-primary)]">₹{total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-2">Shipping To:</h3>
                    <p className="text-sm text-gray-600">
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.state} {formData.zip}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-2">Payment Method:</h3>
                    <p className="text-sm text-gray-600">
                      Credit Card ending in {formData.cardNumber.slice(-4) || '****'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-10 flex justify-between items-center border-t border-gray-100 pt-6">
              {step > 1 ? (
                <button 
                  type="button" 
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}
              
              <button 
                type="submit"
                className="px-8 py-4 bg-[var(--color-primary)] text-white rounded-full font-bold hover:bg-pink-600 transition-colors shadow-lg"
              >
                {step === 3 ? 'Place Order' : 'Continue'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
