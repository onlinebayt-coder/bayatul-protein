import React from 'react';
import {
  Star, Lightbulb, UsersThree, ListDashes, Medal, UserFocus,
  MapPin, EnvelopeSimple, Phone
} from 'phosphor-react';
import { Users, Phone as LucidePhone, Mail, Clock, MapPin as LucideMapPin } from 'lucide-react';

function AboutUs() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full p-4" style={{ backgroundColor: '#d9a82e' }}>
              <Users className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover Baytal Protien - Your trusted nutrition partner
          </p>
        </div>
      </div>

      <div className="bg-white text-black">
      {/* About Section */}
      <div className="bg-white px-4 py-10 md:px-20 grid md:grid-cols-2 items-center gap-10">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">ABOUT US</h2>
          <p className="text-[17px] leading-[23px] font-[400] text-gray-700">
            <strong className="text-gray-900">Baytal Protien</strong> is a premier name in the world of health and nutrition solutions, dedicated to providing high-quality protein supplements and nutritional products. Since our inception, we have been driven by a commitment to quality, innovation, and customer satisfaction, establishing ourselves as a trusted nutrition partner for fitness enthusiasts and health-conscious individuals alike.
            <br /><br />
            With a focus on integrity and excellence, Baitul Protein offers a wide range of protein powders, supplements, and nutritional products, meeting the evolving needs of today's health-conscious lifestyle. Our dedication to quality products, reliable service, and long-term relationships has made us a recognized and respected brand in the nutrition industry.
          </p>
        </div>
        <div>
          <img src="/pro-dna.webp" alt="Baitul Protein Products" className="rounded-xl w-full shadow-lg" />
        </div>
      </div>

      {/* Vision Section */}
      <div className="text-center px-4 py-10 md:px-32">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Our Vision</h2>
        <p className="text-[17px] leading-[23px] font-[400] text-gray-700 mb-6">
          To be recognized as a leader in nutritional supplements and health solutions, consistently setting new standards of quality and innovation. We strive to remain ahead of market trends, ensuring that our customers always have access to premium, effective, and safe nutritional products.
        </p>
        {/* <img src="/baitulProtein/our-vision.webp" alt="Our Vision" className="rounded-xl mx-auto w-full max-w-3xl shadow-lg" /> */}
      </div>

      {/* Mission Section */}
      <div className="text-center px-4 py-10 md:px-32">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h2>
        <p className="text-[17px] leading-[23px] font-[400] text-gray-700">
          <strong className="text-gray-900">Baitul Protein's</strong> mission is to deliver exceptional nutritional products that empower individuals to achieve their fitness and health goals. We aim to enhance wellness, performance, and overall quality of life through premium supplements, professional guidance, and continuous innovation in nutrition science.
        </p>
      </div>

      {/* Core Values Section */}
      <div className="bg-white px-4 py-10 md:px-32 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Core Values</h2>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <div style={{ color: '#d9a82e' }}>
                  <Star size={40} />
                </div>
              </div>
              <h4 className="text-lg font-bold text-black mb-2">Integrity</h4>
              <p className="text-[16px] leading-[22px] text-gray-700">Conducting business with honesty and transparency</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <div style={{ color: '#d9a82e' }}>
                  <Lightbulb size={40} />
                </div>
              </div>
              <h4 className="text-lg font-bold text-black mb-2">Innovation</h4>
              <p className="text-[16px] leading-[22px] text-gray-700">Embracing advances in nutrition science and supplement technology</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <div style={{ color: '#d9a82e' }}>
                  <UserFocus size={40} />
                </div>
              </div>
              <h4 className="text-lg font-bold text-black mb-2">Customer Focus</h4>
              <p className="text-[16px] leading-[22px] text-gray-700">Placing customer satisfaction at the heart of our operations</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <div style={{ color: '#d9a82e' }}>
                  <Medal size={40} />
                </div>
              </div>
              <h4 className="text-lg font-bold text-black mb-2">Excellence</h4>
              <p className="text-[16px] leading-[22px] text-gray-700">Striving for superior quality in nutritional products and customer service</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center md:col-span-2 md:max-w-lg md:mx-auto">
              <div className="flex justify-center mb-4">
                <div style={{ color: '#d9a82e' }}>
                  <UsersThree size={40} />
                </div>
              </div>
              <h4 className="text-lg font-bold text-black mb-2">Teamwork</h4>
              <p className="text-[16px] leading-[22px] text-gray-700">Fostering collaboration to achieve shared goals</p>
            </div>
          </div>
        </div>

        {/* Product Range Section */}
        <div className="max-w-5xl mx-auto mt-12">
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Our Product Range</h3>
          <div className="rounded-lg p-8 border-2 text-center" style={{ backgroundColor: '#d9a82e', borderColor: '#c99720' }}>
            <div className="flex justify-center mb-6">
              <div style={{ color: 'white' }}>
                <ListDashes size={40} />
              </div>
            </div>
            <h4 className="text-lg font-bold text-white mb-4">Comprehensive Nutrition Portfolio</h4>
            <p className="text-[16px] leading-[22px] text-white mb-6 max-w-2xl mx-auto">
              Baitul Protein offers a comprehensive range of nutritional products including:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-4 shadow-lg border border-gray-200">
                <div className="font-bold text-lg mb-2" style={{ color: '#d9a82e' }}>💪</div>
                <p className="text-[16px] leading-[22px] text-gray-700 font-medium">
                  Premium protein powders for muscle building and recovery
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-lg border border-gray-200">
                <div className="font-bold text-lg mb-2" style={{ color: '#d9a82e' }}>🥤</div>
                <p className="text-[16px] leading-[22px] text-gray-700 font-medium">
                  Sports nutrition supplements and pre-workout formulas
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-lg border border-gray-200">
                <div className="font-bold text-lg mb-2" style={{ color: '#d9a82e' }}>🌿</div>
                <p className="text-[16px] leading-[22px] text-gray-700 font-medium">
                  Natural health supplements and wellness products
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Contact Information */}
      {/* <section className="bg-gray-50 text-black p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Contact Information</h2>
            <p className="text-gray-700">Get in touch with our nutrition experts for any questions or concerns</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <LucidePhone className="w-5 h-5" style={{ color: '#d9a82e' }} />
              </div>
              <h3 className="font-medium mb-1 text-gray-900">Phone</h3>
              <a href="tel:+1234567890" className="hover:underline" style={{ color: '#d9a82e' }}>
                +1 (234) 567-8900
              </a>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Mail className="w-5 h-5" style={{ color: '#d9a82e' }} />
              </div>
              <h3 className="font-medium mb-1 text-gray-900">Email</h3>
              <a href="mailto:info@baitulprotein.com" className="hover:underline" style={{ color: '#d9a82e' }}>
                info@baitulprotein.com
              </a>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Clock className="w-5 h-5" style={{ color: '#d9a82e' }} />
              </div>
              <h3 className="font-medium mb-1 text-gray-900">Hours</h3>
              <p style={{ color: '#d9a82e' }}>Mon-Sat 8:00 AM - 8:00 PM</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <LucideMapPin className="w-5 h-5" style={{ color: '#d9a82e' }} />
              </div>
              <h3 className="font-medium mb-1 text-gray-900">Address</h3>
              <p style={{ color: '#d9a82e' }}>Available Online Nationwide</p>
            </div>
          </div>
          
          <div className="text-center pt-4 border-t border-gray-300">
            <p className="text-gray-900">
              <strong>Baitul Protein</strong><br />
              <span className="text-gray-700">Your Trusted Nutrition Partner</span>
            </p>
          </div>
        </div>
      </section> */}
      </div>
    </div>
  );
}

export default AboutUs;
