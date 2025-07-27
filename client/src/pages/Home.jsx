import React from "react";
import { Link } from "react-router-dom";

const popularItems = [
  {
    name: "Onions",
    price: "₹25/kg",
    oldPrice: "₹35/kg",
    savings: "29% savings",
    emoji: "🧅",
  },
  {
    name: "Tomatoes",
    price: "₹30/kg",
    oldPrice: "₹45/kg",
    savings: "33% savings",
    emoji: "🍅",
  },
  {
    name: "Potatoes",
    price: "₹20/kg",
    oldPrice: "₹28/kg",
    savings: "29% savings",
    emoji: "🥔",
  },
  {
    name: "Green Chili",
    price: "₹40/kg",
    oldPrice: "₹60/kg",
    savings: "33% savings",
    emoji: "🌶️",
  },
  {
    name: "Coriander",
    price: "₹15/bunch",
    oldPrice: "₹25/bunch",
    savings: "40% savings",
    emoji: "🌿",
  },
  {
    name: "Garam Masala",
    price: "₹180/kg",
    oldPrice: "₹250/kg",
    savings: "28% savings",
    emoji: "🌶️",
  },
  {
    name: "Oil (15L)",
    price: "₹1800",
    oldPrice: "₹2200",
    savings: "18% savings",
    emoji: "🛢️",
  },
  {
    name: "Pav (100pcs)",
    price: "₹120",
    oldPrice: "₹150",
    savings: "20% savings",
    emoji: "🍞",
  },
];

const testimonials = [
  {
    quote:
      "Earlier I bought onions at ₹40, now I get them at ₹25. Saving ₹5000 per month.",
    name: "Raju Bhai",
    role: "Pav Bhaji Stall",
    city: "Mumbai",
  },
  {
    quote:
      "Daily fresh vegetables delivered. Customers are happy because taste improved.",
    name: "Sunita Devi",
    role: "Chaat Counter",
    city: "Delhi",
  },
  {
    quote:
      "Group orders give huge discounts on oil and spices. Business profit increased.",
    name: "Amit Sharma",
    role: "Dosa Stall",
    city: "Bangalore",
  },
];

const Home = () => (
  <div className="bg-orange-50 min-h-screen w-full">
    {/* Hero Section */}
    <section className="flex flex-col justify-center items-center min-h-[80vh] bg-gradient-to-br from-orange-50 to-yellow-100 text-center px-4">
      <span className="inline-block bg-orange-100 text-orange-700 px-4 py-1 rounded-full mb-6 font-semibold text-lg shadow">
        🛒 Made for Street Vendors
      </span>
      <h1 className="text-5xl md:text-6xl font-extrabold text-orange-600 mb-4 leading-tight drop-shadow">
        Get Raw Materials at Wholesale Prices
      </h1>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Through Group Buying
      </h2>
      <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
        Join other street food vendors to pool orders and unlock wholesale
        pricing. Get fresh vegetables, spices, and ingredients delivered daily
        to your stall.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 w-full max-w-md mx-auto">
        <Link
          to="/auth?role=vendor"
          className="bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-orange-700 transition text-lg w-full sm:w-auto"
        >
          Vendor Registration
        </Link>
        <Link
          to="/auth?role=supplier"
          className="bg-white border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-orange-50 transition text-lg w-full sm:w-auto"
        >
          Become Supplier
        </Link>
      </div>
    </section>

    {/* Why Choose Section */}
    <section className="max-w-7xl mx-auto py-16 px-4">
      <h2 className="text-4xl font-bold text-center mb-14">
        Why Choose VendorMitra?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition-transform">
          <span className="text-5xl mb-4 text-orange-600">👥</span>
          <h3 className="text-2xl font-bold mb-3">Group Buy System</h3>
          <p className="text-gray-700 mb-4 text-center text-lg">
            Pool orders with other vendors to get wholesale rates
          </p>
          <ul className="text-gray-600 text-base list-disc pl-6 text-left space-y-1">
            <li>Save 30% on onions, tomatoes, potatoes</li>
            <li>Bulk discounts on spices</li>
            <li>Group discounts on oil, gas</li>
            <li>Share transport costs</li>
          </ul>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition-transform">
          <span className="text-5xl mb-4 text-green-600">🚚</span>
          <h3 className="text-2xl font-bold mb-3">Daily Delivery</h3>
          <p className="text-gray-700 mb-4 text-center text-lg">
            Fresh vegetables and essentials delivered to your stall daily
          </p>
          <ul className="text-gray-600 text-base list-disc pl-6 text-left space-y-1">
            <li>Delivery by 6 AM</li>
            <li>Fresh vegetable guarantee</li>
            <li>Quality check</li>
            <li>Return policy</li>
          </ul>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition-transform">
          <span className="text-5xl mb-4 text-purple-600">💬</span>
          <h3 className="text-2xl font-bold mb-3">Hindi AI Assistant</h3>
          <p className="text-gray-700 mb-4 text-center text-lg">
            24/7 support and rate information in Hindi
          </p>
          <ul className="text-gray-600 text-base list-disc pl-6 text-left space-y-1">
            <li>Hindi chat support</li>
            <li>Ask today's rates</li>
            <li>Recipe tips</li>
            <li>Business advice</li>
          </ul>
        </div>
      </div>
    </section>

    {/* How It Works Section */}
    <section className="max-w-5xl mx-auto py-16 px-4">
      <h2 className="text-4xl font-bold text-center mb-14">How It Works?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {[
          "Tell Your Needs",
          "Join Group",
          "Get Wholesale Rates",
          "Get Delivery",
        ].map((step, i) => (
          <div key={step} className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center text-3xl font-bold text-orange-600 mb-4 shadow-lg">
              {i + 1}
            </div>
            <h3 className="font-bold mb-2 text-lg md:text-xl">{step}</h3>
            <p className="text-gray-600 text-base md:text-lg">
              {i === 0 &&
                "What you need for pav bhaji, chaat - onions, tomatoes, spices"}
              {i === 1 && "Join group orders with nearby vendors"}
              {i === 2 &&
                "Bulk orders get you 30-40% cheaper rates than market"}
              {i === 3 && "Fresh supplies delivered to your stall by 6 AM"}
            </p>
          </div>
        ))}
      </div>
    </section>

    {/* Popular Items Section */}
    <section className="max-w-7xl mx-auto py-16 px-4">
      <h2 className="text-4xl font-bold text-center mb-14">Popular Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {popularItems.map((item) => (
          <div
            key={item.name}
            className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition-transform"
          >
            <h3 className="text-xl font-bold mb-2">{item.name}</h3>
            <div className="text-green-600 text-3xl font-bold mb-2">
              {item.price}
            </div>
            <div className="text-gray-400 line-through mb-2 text-lg">
              {item.oldPrice}
            </div>
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-base font-semibold mt-2">
              {item.savings}
            </span>
          </div>
        ))}
      </div>
    </section>

    {/* Stats Section */}
    <section className="bg-orange-600 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center text-white px-4">
        <div>
          <div className="text-5xl font-extrabold mb-2">2000+</div>
          <div className="text-2xl">Happy Vendors</div>
        </div>
        <div>
          <div className="text-5xl font-extrabold mb-2">₹50L+</div>
          <div className="text-2xl">Monthly Orders</div>
        </div>
        <div>
          <div className="text-5xl font-extrabold mb-2">35%</div>
          <div className="text-2xl">Average Savings</div>
        </div>
        <div>
          <div className="text-5xl font-extrabold mb-2">15+</div>
          <div className="text-2xl">Cities</div>
        </div>
      </div>
    </section>

    {/* Testimonials Section */}
    <section className="max-w-7xl mx-auto py-16 px-4">
      <h2 className="text-4xl font-bold text-center mb-14">What Vendors Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-white rounded-2xl shadow-xl p-8 hover:scale-105 transition-transform"
          >
            <p className="italic text-gray-700 mb-6 text-lg">"{t.quote}"</p>
            <div className="font-bold text-xl text-gray-900 mb-2">{t.name}</div>
            <div className="text-base text-gray-600 mb-1">{t.role}</div>
            <div className="text-orange-600 text-base font-semibold">
              {t.city}
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-16 text-center px-4">
      <h2 className="text-4xl font-bold mb-6">Start Today and Save Money</h2>
      <p className="text-xl text-gray-700 mb-10">
        Thousands of vendors are already benefiting from VendorMitra
      </p>
      <Link
        to="/auth"
        className="bg-orange-600 text-white px-10 py-5 rounded-2xl font-semibold shadow-xl hover:bg-orange-700 transition text-xl"
      >
        Register Now - Completely Free
      </Link>
    </section>

    {/* Footer */}
    <footer className="bg-gray-900 text-white py-12 mt-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-4">
        <div>
          <div className="font-bold text-2xl mb-4 flex items-center gap-2">
            <span className="text-orange-400 text-3xl">🛒</span>VendorMitra
          </div>
          <p className="text-gray-400 text-lg">
            Supply chain platform built for street food vendors
          </p>
        </div>
        <div>
          <div className="font-bold mb-4 text-lg">For Vendors</div>
          <ul className="text-gray-300 text-base space-y-2">
            <li>Group Orders</li>
            <li>Daily Delivery</li>
            <li>Rate Calculator</li>
            <li>Order Tracking</li>
          </ul>
        </div>
        <div>
          <div className="font-bold mb-4 text-lg">For Suppliers</div>
          <ul className="text-gray-300 text-base space-y-2">
            <li>List Products</li>
            <li>Manage Orders</li>
            <li>Payment Tracking</li>
            <li>Business Analytics</li>
          </ul>
        </div>
        <div>
          <div className="font-bold mb-4 text-lg">Support</div>
          <ul className="text-gray-300 text-base space-y-2">
            <li>Help Center</li>
            <li>WhatsApp Support</li>
            <li>Contact Us</li>
            <li>Training Videos</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-400 text-base mt-12">
        © {new Date().getFullYear()} VendorSaathi
      </div>
    </footer>
  </div>
);

export default Home;
