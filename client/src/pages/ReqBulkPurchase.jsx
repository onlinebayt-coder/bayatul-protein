import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import config from '../config/config';
import { User, Mail, Phone } from "lucide-react";

export default function ReqBulkPurchase() {
  const { user } = useAuth ? useAuth() : { user: null };
  const [showCallbackModal, setShowCallbackModal] = useState(false);
  const [callbackForm, setCallbackForm] = useState({ name: user?.name || '', email: user?.email || '', phone: '' });
  const [callbackLoading, setCallbackLoading] = useState(false);
  const [callbackSuccess, setCallbackSuccess] = useState(false);

  const handleCallbackChange = (e) => {
    const { name, value } = e.target;
    setCallbackForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCallbackSubmit = async (e) => {
    e.preventDefault();
    setCallbackLoading(true);
    try {
      await axios.post(`${config.API_URL}/api/request-callback`, callbackForm);
      setCallbackSuccess(true);
      setTimeout(() => {
        setShowCallbackModal(false);
        setCallbackSuccess(false);
        setCallbackForm({ name: user?.name || '', email: user?.email || '', phone: '' });
      }, 2000);
    } catch (error) {
      alert('Failed to submit request. Please try again.');
    } finally {
      setCallbackLoading(false);
    }
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 text-center">
        <p className="text-sm text-blue-700 font-semibold">Your One-Stop Solution for B2B Business Needs in UAE</p>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-100 py-6 px-4 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-800">Baytal Protein - B2B Dedicated Wholesale Place</h1>
        <p className="mt-2 text-sm md:text-base max-w-3xl mx-auto text-gray-700">
          Our trusted B2B wholesale palace will cater to all your business needs
        </p>
      </section>

      {/* Intro Section */}
      <section className="py-8 px-4 md:px-16 text-center">
        <p className="max-w-3xl mx-auto text-gray-700">
          Welcome to Baytal Protein your one-stop sourcing platform for all your business needs.
          Baytal Protein, the omnichannel retailer that was established in Dubai, UAE. We are a business
          focused marketplace where small and medium businesses (SMBs) discover, interact, and buy
          products and services by engaging with brands and authorized sellers.
        </p>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-100 py-10 px-4 md:px-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
            alt="Business Meeting"
            className="w-full md:w-1/2 rounded-md"
          />
          <div className="md:w-1/2">
            <h2 className="text-xl font-bold mb-2">Benefits of being on Baytal Protein</h2>
            <p className="text-gray-700 mb-4">
              As a customer and as a business buyer, the platform offers great benefits and opportunities
              for small and medium businesses.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => setShowCallbackModal(true)}>
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Buying Journey */}
      <section className="py-10 px-4 md:px-16 text-center">
        <h2 className="text-xl font-bold mb-6">Online BUYING journey</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
            'Bulk Requirement',
            'Request For Quote',
            'Best Price Quoted',
            'Proposals Evaluated',
            'Invoice',
            'Delivery & Payment',
          ].map((step, i) => (
            <div key={i} className="bg-white border-blue-600 border-2 shadow-md p-4 rounded-md text-sm font-medium">
              <p className="mb-2 font-bold">Step {i + 1}</p>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Bulk Purchase */}
      <section className="bg-gray-50 py-12 px-4 md:px-16">
        <h2 className="text-xl font-bold text-center mb-10">
          Why Bulk Purchase from Baytal Protein?
        </h2>
        <div className="grid gap-6  md:grid-cols-3">
          {[
            {
              title: 'Trusted Platform',
              desc: 'Dedicated to serving SMBs in the UAE. Trust and reliability are our priority.',
            },
            {
              title: 'Authorized Sellers',
              desc: 'Over 100 authorized sellers ready to serve with better prices and availability.',
            },
            {
              title: 'Learn About Trends',
              desc: 'Join webinars by global brands to stay ahead and grow your business.',
            },
            {
              title: 'Better Range and Information',
              desc: 'Access a wide range of products with accurate info from over 200 global brands.',
            },
            {
              title: 'Quantity Discounts & RFQ',
              desc: 'Get better prices for larger quantities or request quotes from multiple sellers.',
            },
            {
              title: 'Create Users & Manage Purchases',
              desc: 'Add team members and set buyer/approver roles for a seamless experience.',
            },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 border-blue-600 border-2 shadow-md rounded-md">
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-700 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700" onClick={() => setShowCallbackModal(true)}>
            Contact Sales
          </button>
        </div>
      </section>

      {showCallbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <div className="rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden" style={{backgroundColor: '#e2edf4'}}>
            {/* Header Bar */}
            <div className="px-6 py-5 border-b-2" style={{borderColor: '#2377c1'}}>
              <h2 className="text-2xl font-bold text-gray-800">Request a Callback</h2>
              <p className="text-sm text-gray-600 mt-1">We'll get back to you shortly</p>
              <button 
                className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 transition-colors" 
                onClick={() => setShowCallbackModal(false)}
              >
                <X size={26} strokeWidth={2.5} />
              </button>
            </div>

            {/* Form Content */}
            <div className="px-6 py-6">
              {callbackSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#d9a82e'}}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{color: '#2377c1'}}>Success!</h3>
                  <p className="text-gray-700">Request submitted successfully!</p>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="space-y-5">

                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{color: '#2377c1'}}>
                        <User size={20} strokeWidth={2.5} />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={callbackForm.name}
                        onChange={handleCallbackChange}
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all"
                        style={{
                          backgroundColor: 'white',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#2377c1';
                          e.target.style.boxShadow = '0 0 0 3px rgba(35, 119, 193, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.boxShadow = 'none';
                        }}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{color: '#2377c1'}}>
                        <Mail size={20} strokeWidth={2.5} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={callbackForm.email}
                        onChange={handleCallbackChange}
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all"
                        style={{
                          backgroundColor: 'white',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#2377c1';
                          e.target.style.boxShadow = '0 0 0 3px rgba(35, 119, 193, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.boxShadow = 'none';
                        }}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{color: '#2377c1'}}>
                        <Phone size={20} strokeWidth={2.5} />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={callbackForm.phone}
                        onChange={handleCallbackChange}
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all"
                        style={{
                          backgroundColor: 'white',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#2377c1';
                          e.target.style.boxShadow = '0 0 0 3px rgba(35, 119, 193, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.boxShadow = 'none';
                        }}
                        placeholder="+971 XX XXX XXXX"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white py-3.5 rounded-lg font-semibold text-base transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
                    style={{backgroundColor: callbackLoading ? '#2377c1' : '#d9a82e'}}
                    onMouseEnter={(e) => !callbackLoading && (e.target.style.backgroundColor = '#2377c1')}
                    onMouseLeave={(e) => !callbackLoading && (e.target.style.backgroundColor = '#d9a82e')}
                    disabled={callbackLoading}
                  >
                    {callbackLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : 'Submit Request'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
