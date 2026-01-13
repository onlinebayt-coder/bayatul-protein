import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, RefreshCw, Cookie, Shield, FileCheck, Ticket, Truck, Package } from 'lucide-react'

function LegalSection() {
  const legalItems = [
    {
      title: 'Refund & Return',
      icon: RefreshCw,
      path: '/refund-return',
      description: 'Learn about our return and refund policies'
    },
    {
      title: 'Cookies Policy',
      icon: Cookie,
      path: '/cookies-policy',
      description: 'How we use cookies on our website'
    },
    {
      title: 'Terms & Conditions',
      icon: FileText,
      path: '/terms-conditions',
      description: 'Read our terms of service'
    },
    {
      title: 'Privacy Policy',
      icon: Shield,
      path: '/privacy-policy',
      description: 'How we protect your data'
    },
    {
      title: 'Disclaimer Policy',
      icon: FileCheck,
      path: '/disclaimer-policy',
      description: 'Important legal disclaimers'
    },
    {
      title: 'Voucher Terms',
      icon: Ticket,
      path: '/voucher-terms',
      description: 'Terms for using vouchers'
    },
    {
      title: 'Delivery Terms',
      icon: Truck,
      path: '/delivery-terms',
      description: 'Shipping and delivery information'
    },
    {
      title: 'Track Order',
      icon: Package,
      path: '/track-order',
      description: 'Track your order status'
    }
  ]

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900  mb-3">
            Legal & Policies
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Everything you need to know about our policies, terms, and legal information
          </p>
        </div>

        {/* Mobile Layout - 2 boxes with 4 items each */}
        <div className="block sm:hidden space-y-4">
          {/* Box 1 - First 4 items */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
            <div className="grid grid-cols-2 gap-4">
              {legalItems.slice(0, 4).map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={index}
                    to={item.path}
                    className="group flex flex-col items-center text-center p-3"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 border-2 border-[#d9a82e] rounded-full flex items-center justify-center mb-2 group-hover:bg-[#d9a82e] transition-all duration-300">
                      <Icon className="w-5 h-5 text-[#d9a82e] group-hover:text-white transition-colors duration-300" />
                    </div>
                    {/* Title only */}
                    <h3 className="text-xs font-bold text-[#3d87c8] group-hover:text-[#d9a82e] transition-colors duration-300">
                      {item.title}
                    </h3>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Box 2 - Last 4 items */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
            <div className="grid grid-cols-2 gap-4">
              {legalItems.slice(4, 8).map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={index}
                    to={item.path}
                    className="group flex flex-col items-center text-center p-3"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 border-2 border-[#d9a82e] rounded-full flex items-center justify-center mb-2 group-hover:bg-[#d9a82e] transition-all duration-300">
                      <Icon className="w-5 h-5 text-[#d9a82e] group-hover:text-white transition-colors duration-300" />
                    </div>
                    {/* Title only */}
                    <h3 className="text-xs font-bold text-[#3d87c8] group-hover:text-[#d9a82e] transition-colors duration-300">
                      {item.title}
                    </h3>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Desktop/Tablet Layout - Original grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {legalItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={index}
                to={item.path}
                className="group bg-white rounded-xl p-6 transition-all duration-300  text-center"
              >
                {/* Icon */}
                <div className="w-16 h-16 border-2 border-[#d9a82e] rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-[#d9a82e] transition-all duration-300">
                  <Icon className="w-7 h-7 text-[#d9a82e] group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#3d87c8] mb-2 group-hover:text-[#d9a82e] transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed ">
                  {item.description}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default LegalSection