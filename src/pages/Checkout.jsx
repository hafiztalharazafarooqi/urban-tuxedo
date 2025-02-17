import { useState } from 'react';

function Checkout() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'credit',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-serif mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div>
              <h2 className="font-serif text-xl mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="font-serif text-xl mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Street Address"
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                  <input
                    type="text"
                    placeholder="State"
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="font-serif text-xl mb-4">Payment Method</h2>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="credit"
                    checked={formData.paymentMethod === 'credit'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="mr-2"
                  />
                  Credit Card
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="mr-2"
                  />
                  PayPal
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-gold w-full py-3">
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="font-serif text-xl mb-6">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$689.98</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$15.00</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>$704.98</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;