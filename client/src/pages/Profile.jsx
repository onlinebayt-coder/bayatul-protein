import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { User, Mail, Phone, LogOut, Trash2, Shield, Settings, Package, Heart, AlertTriangle, ChevronRight } from "lucide-react"
import { useToast } from "../context/ToastContext"
import axios from "axios"
import config from "../config/config"

const API_BASE_URL = `${config.API_URL}/api`

const Profile = () => {
  const { user, logout, token } = useAuth()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showVerifyModal, setShowVerifyModal] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [isRequestingDelete, setIsRequestingDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const handleRequestDeletion = async () => {
    setIsRequestingDelete(true)
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/request-account-deletion`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      showToast(response.data.message + " (Email may take 5-6 minutes to arrive. Check spam folder if not received.)", "success")
      setShowDeleteModal(false)
      setShowVerifyModal(true)
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to send verification code. Please try again.",
        "error"
      )
    } finally {
      setIsRequestingDelete(false)
    }
  }

  const handleVerifyDeletion = async (e) => {
    e.preventDefault()
    
    if (verificationCode.length !== 6) {
      showToast("Please enter a valid 6-digit code", "error")
      return
    }

    setIsDeleting(true)
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/verify-account-deletion`,
        { code: verificationCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      showToast(response.data.message, "success")
      // Log out the user after successful deletion
      setTimeout(() => {
        logout()
        navigate("/")
      }, 2000)
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to verify code. Please try again.",
        "error"
      )
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCancelDeletion = () => {
    setShowDeleteModal(false)
    setShowVerifyModal(false)
    setVerificationCode("")
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 mb-6 md:mb-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        <div className="relative flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="bg-white/20 backdrop-blur-sm p-4 md:p-5 rounded-full border-4 border-white/30 shadow-xl">
            <User size={48} className="text-white md:w-12 md:h-12" />
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 tracking-tight">{user?.name}</h1>
            <p className="text-blue-100 flex items-center justify-center sm:justify-start gap-2 text-sm md:text-base mb-2 md:mb-3">
              <Mail size={16} />
              <span className="break-all">{user?.email}</span>
            </p>
            {user?.isEmailVerified && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#d9a82e] rounded-full text-xs md:text-sm font-bold shadow-lg">
                <Shield size={14} />
                Verified Account
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Account Information */}
        <div className="lg:col-span-2 bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-xl font-bold text-gray-900">Account Information</h2>
            <div className="bg-gray-100 p-2 rounded-full">
              <Settings size={20} className="text-gray-600" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3 md:space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg md:rounded-xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md">
              <div className="bg-[#2377c1] p-2.5 md:p-3 rounded-lg md:rounded-xl shadow-md flex-shrink-0">
                <User size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Full Name</p>
                <p className="font-bold text-gray-900 text-base break-words">{user?.name}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 md:space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg md:rounded-xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md">
              <div className="bg-[#2377c1] p-2.5 md:p-3 rounded-lg md:rounded-xl shadow-md flex-shrink-0">
                <Mail size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email Address</p>
                <p className="font-bold text-gray-900 text-base break-all">{user?.email}</p>
              </div>
            </div>

            {user?.phone && (
              <div className="flex items-start space-x-3 md:space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg md:rounded-xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md">
                <div className="bg-[#2377c1] p-2.5 md:p-3 rounded-lg md:rounded-xl shadow-md flex-shrink-0">
                  <Phone size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone Number</p>
                  <p className="font-bold text-gray-900 text-base">{user.phone}</p>
                </div>
              </div>
            )}

            <div className="flex items-start space-x-3 md:space-x-4 p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg md:rounded-xl border-2 border-amber-300 hover:border-amber-400 transition-all duration-200 shadow-sm hover:shadow-md">
              <div className="bg-[#d9a82e] p-2.5 md:p-3 rounded-lg md:rounded-xl shadow-md flex-shrink-0">
                <Settings size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Account Type</p>
                <p className="font-bold text-gray-900 text-base">{user?.isAdmin ? "Administrator" : "Customer"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate("/orders")}
                className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-2 border-blue-300 hover:border-blue-400 rounded-lg md:rounded-xl transition-all duration-200 shadow-sm hover:shadow-md group"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-[#2377c1] p-2 rounded-lg group-hover:scale-110 transition-transform duration-200">
                    <Package size={18} className="text-white" />
                  </div>
                  <span className="text-gray-900 font-bold text-sm md:text-base">My Orders</span>
                </div>
                <ChevronRight size={18} className="text-[#2377c1] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              
              <button
                onClick={() => navigate("/wishlist")}
                className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 border-2 border-amber-300 hover:border-amber-400 rounded-lg md:rounded-xl transition-all duration-200 shadow-sm hover:shadow-md group"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-[#d9a82e] p-2 rounded-lg group-hover:scale-110 transition-transform duration-200">
                    <Heart size={18} className="text-white" />
                  </div>
                  <span className="text-gray-900 font-bold text-sm md:text-base">Wishlist</span>
                </div>
                <ChevronRight size={18} className="text-[#d9a82e] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 border-2 border-slate-300 hover:border-slate-400 rounded-lg md:rounded-xl transition-all duration-200 shadow-sm hover:shadow-md group"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-700 p-2 rounded-lg group-hover:scale-110 transition-transform duration-200">
                    <Settings size={18} className="text-white" />
                  </div>
                  <span className="text-gray-900 font-bold text-sm md:text-base">Shopping Cart</span>
                </div>
                <ChevronRight size={18} className="text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

          {/* Logout Button */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg md:rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              <LogOut size={20} />
              <span className="font-bold text-base">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6 border-2 border-red-200">
        <div className="flex items-center space-x-3 mb-4">
          <AlertTriangle size={24} className="text-red-600" />
          <h2 className="text-xl font-bold text-gray-800">Danger Zone</h2>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-gray-700 mb-4">
            Once you delete your account, there is no going back. Please be certain. All your data, orders, and preferences will be permanently deleted.
          </p>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            <Trash2 size={20} />
            <span>Delete My Account</span>
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle size={24} className="text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Delete Account</h3>
            </div>
            
            <p className="text-gray-700 mb-6">
              Are you absolutely sure you want to delete your account? This action cannot be undone and will:
            </p>
            
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Permanently delete all your personal data</li>
              <li>Remove your order history</li>
              <li>Delete your wishlist and preferences</li>
              <li>Close your account permanently</li>
            </ul>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>⚠️ Warning:</strong> You will receive a 6-digit verification code via email. You must enter this code to complete the deletion.
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleCancelDeletion}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestDeletion}
                disabled={isRequestingDelete}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRequestingDelete ? "Sending..." : "Send Verification Code"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verification Code Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <Mail size={24} className="text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Enter Verification Code</h3>
            </div>
            
            <p className="text-gray-700 mb-4">
              We've sent a 6-digit verification code to <strong>{user?.email}</strong>. Please enter it below to confirm account deletion.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-800">
                <strong>📧 Note:</strong> The email may take 5-6 minutes to arrive. Please check your spam/junk folder if you don't see it in your inbox.
              </p>
            </div>

            <form onSubmit={handleVerifyDeletion}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-center text-2xl tracking-widest font-bold"
                  placeholder="000000"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  The code will expire in 10 minutes.
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleCancelDeletion}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isDeleting || verificationCode.length !== 6}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? "Deleting..." : "Delete Account"}
                </button>
              </div>
            </form>

            <button
              onClick={handleRequestDeletion}
              disabled={isRequestingDelete}
              className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
            >
              {isRequestingDelete ? "Sending..." : "Resend Code"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
