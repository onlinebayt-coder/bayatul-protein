"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import AdminSidebar from "../../components/admin/AdminSidebar"
import { ShoppingBag, Users, DollarSign, TrendingUp } from "lucide-react"
import { adminAPI } from "../../services/api"

const AdminDashboard = () => {
  const { admin } = useAuth()
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    totalRevenue: 0,
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const formatPrice = (price) => {
    return `AED ${price.toLocaleString()}`
  }

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsData = await adminAPI.getDashboardStats()
        setStats(statsData)
        const ordersData = await adminAPI.getRecentOrders()
        setRecentOrders(ordersData)
        setLoading(false)
      } catch (error) {
        setError("Failed to load dashboard data. Please try again later.")
        setLoading(false)
      }
    }
    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <AdminSidebar />
      
        <div className="ml-64 flex justify-center items-center h-screen">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-[#2377c1]/30 border-t-[#2377c1]"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="h-10 w-10 bg-gradient-to-br from-[#2377c1] to-blue-600 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="text-gray-700 font-semibold text-lg">Loading Dashboard...</p>
            <p className="text-gray-500 text-sm">Please wait while we fetch your data</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <AdminSidebar />
        
        <div className="ml-64 p-8 flex items-center justify-center h-screen">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md border-l-4 border-red-500">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-4 rounded-xl mr-4">
                <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Error</h3>
                <p className="text-sm text-gray-500">Failed to load dashboard</p>
              </div>
            </div>
            <p className="text-red-600 bg-red-50 p-4 rounded-lg">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white from-slate-50 via-blue-50 to-slate-100">
      <AdminSidebar />
    
      <div className="ml-64 p-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#2377c1] to-blue-600 bg-clip-text text-transparent mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your store today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Total Orders Card */}
          <div className="group bg-white hover:shadow-2xl transition-all duration-300 rounded-2xl shadow-lg p-6 border-l-4 border-[#2377c1] transform hover:-translate-y-1">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Total Orders</h3>
                <p className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1 truncate">{stats.totalOrders}</p>
                <div className="flex items-center text-xs text-green-600 font-medium">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>All time</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#2377c1] to-blue-600 p-4 rounded-xl shadow-md">
                <ShoppingBag className="h-7 w-7 text-white" />
              </div>
            </div>
          </div>

          {/* Total Revenue Card */}
          <div className="group bg-white hover:shadow-2xl transition-all duration-300 rounded-2xl shadow-lg p-6 border-l-4 border-emerald-500 transform hover:-translate-y-1">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Total Revenue</h3>
                <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1 break-words">{formatPrice(stats.totalRevenue)}</p>
                <div className="flex items-center text-xs text-green-600 font-medium">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>Lifetime earnings</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-4 rounded-xl shadow-md">
                <DollarSign className="h-7 w-7 text-white" />
              </div>
            </div>
          </div>

          {/* Total Products Card */}
          <div className="group bg-white hover:shadow-2xl transition-all duration-300 rounded-2xl shadow-lg p-6 border-l-4 border-[#d9a82e] transform hover:-translate-y-1">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Total Products</h3>
                <p className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1 truncate">{stats.totalProducts}</p>
                <div className="flex items-center text-xs text-gray-500 font-medium">
                  <span>In inventory</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#d9a82e] to-amber-600 p-4 rounded-xl shadow-md">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
            </div>
          </div>

          {/* Total Users Card */}
          <div className="group bg-white hover:shadow-2xl transition-all duration-300 rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 transform hover:-translate-y-1">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Total Users</h3>
                <p className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1 truncate">{stats.totalUsers}</p>
                <div className="flex items-center text-xs text-green-600 font-medium">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>Registered</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-4 rounded-xl shadow-md">
                <Users className="h-7 w-7 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-[#2377c1] to-blue-600 px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Recent Orders</h2>
                <p className="text-blue-100 text-sm">Latest customer transactions</p>
              </div>
              <Link 
                to="/admin/orders" 
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border border-white/30"
              >
                View All Orders →
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-slate-50 to-blue-50 border-b-2 border-blue-100">
                <tr>
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order, index) => (
                  <tr 
                    key={order._id} 
                    className="hover:bg-blue-50/50 transition-colors duration-150 group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-8 py-5 whitespace-nowrap">
                      <Link 
                        to={`/admin/orders/${order._id}`} 
                        className="inline-flex items-center space-x-3 group-hover:translate-x-1 transition-transform"
                      >
                        <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gradient-to-br from-[#2377c1] to-blue-600 flex items-center justify-center shadow-md">
                          <ShoppingBag className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-sm font-bold text-[#2377c1] hover:text-blue-700">
                          #{order._id.slice(-6)}
                        </span>
                      </Link>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          {order.shippingAddress?.name || order.pickupDetails?.name || order.user?.name || "N/A"}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {order.shippingAddress?.email || order.pickupDetails?.email || order.user?.email || "N/A"}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span
                        className={`px-4 py-2 inline-flex text-xs font-bold rounded-xl border-2 ${
                          order.status === "Processing"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : order.status === "Shipped"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : order.status === "Delivered"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-gray-50 text-gray-700 border-gray-200"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="text-lg font-bold text-gray-900">
                        {formatPrice(order.totalPrice)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
