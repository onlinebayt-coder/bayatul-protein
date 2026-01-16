"use client"

import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { Trash2, Minus, Plus, ShoppingBag, Package, X, Percent, Gift, Shield, ChevronRight, Truck, CheckCircle, Award } from "lucide-react"
import { useEffect, useState, useMemo } from "react"
import axios from "axios"
import { getFullImageUrl } from "../utils/imageUtils"

import config from "../config/config"

const Cart = () => {
  const {
    cartItems,
    cartTotal,
    removeFromCart,
    removeBundleFromCart,
    updateQuantity,
    getGroupedCartItems,
    deliveryOptions,
    setDeliveryOptions,
    selectedDelivery,
    setSelectedDelivery,
    tax,
    setTax,
    coupon,
    setCoupon,
    couponDiscount,
    setCouponDiscount,
  } = useCart()

  const [couponInput, setCouponInput] = useState("")
  const [couponLoading, setCouponLoading] = useState(false)
  const [couponError, setCouponError] = useState("")
  
  // Coupon modal states
  const [showCouponsModal, setShowCouponsModal] = useState(false)
  const [publicCoupons, setPublicCoupons] = useState([])
  const [loadingCoupons, setLoadingCoupons] = useState(false)
  const [couponModalError, setCouponModalError] = useState(null)
  const [couponCopied, setCouponCopied] = useState(null)

  // Add debugging
  useEffect(() => {
    console.log('Cart component - cartItems updated:', cartItems)
    console.log('Cart component - cartTotal:', cartTotal)
  }, [cartItems, cartTotal])

  const { grouped, standaloneItems } = getGroupedCartItems()

  // Filter out protection items from cart display
  const protectionItems = cartItems.filter(item => item.isProtection)
  const regularCartItems = cartItems.filter(item => !item.isProtection)
  
  // Filter protection items from standalone items
  const filteredStandaloneItems = standaloneItems.filter(item => !item.isProtection)

  // Add debugging for grouped items
  useEffect(() => {
    console.log('Cart component - grouped items:', grouped)
    console.log('Cart component - standalone items:', standaloneItems)
    console.log('Cart component - bundle groups keys:', Object.keys(grouped))
    console.log('Cart component - protection items:', protectionItems)
  }, [grouped, standaloneItems, protectionItems])

  useEffect(() => {
    // Fetch delivery options
    const fetchDeliveryOptions = async () => {
      try {
        const { data } = await axios.get(`${config.API_URL}/api/delivery-charges`)
        setDeliveryOptions(data)
        if (!selectedDelivery && data.length > 0) {
          setSelectedDelivery(data[0])
        }
      } catch (err) {
        console.error('Error fetching delivery options:', err)
      }
    }
    // Fetch tax
    const fetchTax = async () => {
      try {
        const { data } = await axios.get(`${config.API_URL}/api/tax`)
        // Use first active tax
        if (data && data.length > 0) setTax(data[0])
      } catch (err) {
        console.error('Error fetching tax:', err)
      }
    }
    fetchDeliveryOptions()
    fetchTax()
  }, [])

  useEffect(() => {
    if (cartItems.length > 0) {
      // Push view cart event to data layer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'view_cart',
        'ecommerce': {
          'currency': 'AED',
          'value': cartTotal,
          'items': cartItems.map(item => ({
            'item_id': item._id,
            'item_name': item.name,
            'item_category': item.parentCategory?.name || item.category?.name || 'Uncategorized',
            'item_brand': item.brand?.name || 'Unknown',
            'price': item.price,
            'quantity': item.quantity
          }))
        }
      });
      
      console.log('View cart tracked, items:', cartItems.length);
    }
  }, [cartItems, cartTotal]);

  const handleQuantityChange = (productId, newQuantity, bundleId = null) => {
    updateQuantity(productId, newQuantity, bundleId)
  }

  // UPDATED: Function to remove single item from bundle - Now removes entire bundle
  const removeItemFromBundle = (itemId, bundleId) => {
    // Remove the entire bundle when any item is removed
    removeBundleFromCart(bundleId)
  }

  // Delivery charge (free if cartTotal > 500)
  const deliveryCharge = selectedDelivery ? (cartTotal > 500 ? 0 : selectedDelivery.charge) : 0

  // Tax is included in prices, no separate calculation needed
  const taxAmount = 0

  // Coupon logic
  const handleApplyCoupon = async () => {
    setCouponLoading(true)
    setCouponError("")
    try {
      // Filter out protection items for coupon validation (only validate actual products)
      const cartApiItems = cartItems
        .filter(item => !item.isProtection)
        .map(item => ({ product: item._id, qty: item.quantity }))
      const { data } = await axios.post(`${config.API_URL}/api/coupons/validate`, {
        code: couponInput,
        cartItems: cartApiItems,
      })
      setCoupon(data.coupon)
      setCouponDiscount(data.discountAmount)
      setCouponError("")
    } catch (err) {
      setCoupon(null)
      setCouponDiscount(0)
      setCouponError(err.response?.data?.message || "Invalid coupon")
    } finally {
      setCouponLoading(false)
    }
  }

  // Coupon modal functions
  const COUPON_COLORS = [
    {
      main: "bg-gradient-to-r from-yellow-100 to-yellow-200",
      stub: "bg-yellow-300",
      border: "border-yellow-400",
      text: "text-yellow-800",
      barcode: "bg-yellow-50",
    },
    {
      main: "bg-gradient-to-r from-blue-100 to-blue-200",
      stub: "bg-blue-300",
      border: "border-blue-400",
      text: "text-blue-800",
      barcode: "bg-blue-50",
    },
    {
      main: "bg-gradient-to-r from-green-100 to-green-200",
      stub: "bg-green-300",
      border: "border-green-400",
      text: "text-green-800",
      barcode: "bg-green-50",
    },
    {
      main: "bg-gradient-to-r from-purple-100 to-purple-200",
      stub: "bg-purple-300",
      border: "border-purple-400",
      text: "text-purple-800",
      barcode: "bg-purple-50",
    },
  ]

  const handleOpenCouponsModal = async () => {
    console.log('Opening coupons modal...')
    setShowCouponsModal(true)
    setLoadingCoupons(true)
    setCouponModalError(null)

    try {
      console.log('Fetching coupons from:', `${config.API_URL}/api/coupons`)
      const response = await axios.get(`${config.API_URL}/api/coupons`)
      console.log('Coupons response:', response.data)
      setPublicCoupons(response.data)
    } catch (error) {
      console.error("Error fetching coupons:", error)
      setCouponModalError("Failed to load coupons")
    } finally {
      setLoadingCoupons(false)
    }
  }

  const handleCloseCouponsModal = () => {
    setShowCouponsModal(false)
    setCouponCopied(null)
  }

  const handleCopyCoupon = (couponCode, couponId) => {
    navigator.clipboard.writeText(couponCode)
    setCouponCopied(couponId)
    setTimeout(() => setCouponCopied(null), 2000)
  }

  const formatPrice = (price) => {
    return `AED ${Number(price).toLocaleString(undefined, { minimumFractionDigits: 2 })}`
  }

  // FIXED: Proper pricing calculation for bundle items
  const getItemPrice = (item) => {
    // If it's a bundle item with bundle price, use that
    if (item.isBundleItem && item.bundlePrice) {
      return item.bundlePrice
    }
    // If it has bundle discount, apply 25% discount
    if (item.bundleDiscount && item.originalPrice) {
      return item.originalPrice * 0.75 // 25% discount
    }
    // Otherwise use offer price or regular price
    return item.offerPrice && item.offerPrice > 0 ? item.offerPrice : item.price
  }

  // FIXED: Calculate actual item total with proper pricing
  const getItemTotal = (item) => {
    const itemPrice = getItemPrice(item)
    return itemPrice * item.quantity
  }

  // FIXED: Helper function to get pricing details for an item
  const getItemPricingDetails = (item) => {
    const originalPrice = Number(item.originalPrice || item.basePrice || item.price) || 0
    const currentPrice = getItemPrice(item)
    
    const savings = originalPrice > currentPrice ? originalPrice - currentPrice : 0
    const discountPercentage = savings > 0 ? Math.round((savings / originalPrice) * 100) : 0
    
    return {
      basePrice: originalPrice,
      currentPrice: currentPrice,
      savings,
      discountPercentage,
      hasDiscount: savings > 0,
      isBundleDiscount: item.bundleDiscount || false
    }
  }

  // FIXED: Calculate cart totals properly (excluding protection items)
  const calculateCartTotals = useMemo(() => {
    let totalBasePrice = 0
    let totalCurrentPrice = 0
    let totalSavings = 0
    
    regularCartItems.forEach(item => {
      const pricingDetails = getItemPricingDetails(item)
      totalBasePrice += pricingDetails.basePrice * item.quantity
      totalCurrentPrice += pricingDetails.currentPrice * item.quantity
      totalSavings += pricingDetails.savings * item.quantity
    })
    
    return {
      totalBasePrice,
      totalCurrentPrice,
      totalSavings
    }
  }, [regularCartItems])

  // FIXED: Calculate bundle totals properly
  const calculateBundleTotals = (bundleItems) => {
    let bundleBaseTotal = 0
    let bundleCurrentTotal = 0
    let bundleSavings = 0
    
    bundleItems.forEach(item => {
      const pricingDetails = getItemPricingDetails(item)
      bundleBaseTotal += pricingDetails.basePrice * item.quantity
      bundleCurrentTotal += pricingDetails.currentPrice * item.quantity
      bundleSavings += pricingDetails.savings * item.quantity
    })
    
    return {
      total: bundleCurrentTotal,
      savings: bundleSavings,
      baseTotal: bundleBaseTotal
    }
  }

  const cartTotals = calculateCartTotals
  
  // Calculate protection items total
  const protectionTotal = protectionItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  
  const totalWithDeliveryTaxCoupon = cartTotals.totalCurrentPrice + protectionTotal + deliveryCharge + taxAmount - couponDiscount

  // Render individual item component
  const renderItem = (item, isInBundle = false, bundleId = null) => {
    const pricingDetails = getItemPricingDetails(item)
    const itemTotal = getItemTotal(item)
    
    return (
      <li key={`${item._id}-${bundleId || 'standalone'}`} className="p-3">
        {/* Mobile Card */}
        <div className="block sm:hidden">
          <div className="flex flex-row items-center mb-3">
            <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md bg-white">
              <img src={getFullImageUrl(item.image) || "/placeholder.svg"} alt={item.name} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1 ml-4">
              <h3 className="text-base font-medium text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
                {item.name.length > 30 ? item.name.slice(0, 25) + "..." : item.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{item.brand?.name || 'N/A'}</p>
              {item.selectedColorData && (
                <p className="mt-1 text-xs text-purple-600 font-medium flex items-center">
                  <span className="inline-block w-3 h-3 rounded-full mr-1" style={{backgroundColor: item.selectedColorData.color?.toLowerCase() || '#9333ea'}}></span>
                  Color: {item.selectedColorData.color}
                </p>
              )}
              {item.selectedDosData && (
                <p className="mt-1 text-xs text-blue-600 font-medium flex items-center">
                  💻 OS: {item.selectedDosData.dosType}
                </p>
              )}
              {isInBundle && (
                <p className="mt-1 text-xs text-lime-600 font-medium">
                  {item.bundleDiscount ? "Bundle Item (25% OFF)" : "Bundle Item"}
                </p>
              )}
            </div>
          </div>
          
          {/* Pricing Details */}
          <div className="mb-3 p-2 bg-gray-50 rounded">
            {pricingDetails.hasDiscount ? (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Original Price:</span>
                  <span className="line-through text-gray-500">{formatPrice(pricingDetails.basePrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Our Price:</span>
                  <span className="text-red-600 font-medium">{formatPrice(pricingDetails.currentPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">You Save:</span>
                  <span className="text-green-600 font-medium">
                    {formatPrice(pricingDetails.savings)} ({pricingDetails.discountPercentage}%)
                    {pricingDetails.isBundleDiscount && " (Bundle Discount)"}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Price:</span>
                <span className="text-red-600 font-medium">{formatPrice(pricingDetails.currentPrice)}</span>
              </div>
            )}
          </div>

          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center border rounded-md w-max">
              <button
                onClick={() => handleQuantityChange(item._id, item.quantity - 1, bundleId)}
                className="px-3 py-1 text-gray-600 hover:text-blue-600"
                disabled={item.quantity === 1}
              >
                <Minus size={16} />
              </button>
              <span className="px-4 py-1 border-l border-r">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item._id, item.quantity + 1, bundleId)}
                className="px-3 py-1 text-gray-600 hover:text-blue-600"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">
                {formatPrice(itemTotal)}
              </p>
              {pricingDetails.hasDiscount && (
                <p className="text-xs text-green-600">
                  Save {formatPrice(pricingDetails.savings * item.quantity)}
                </p>
              )}
            </div>
            <button
              onClick={() => isInBundle ? removeItemFromBundle(item._id, bundleId) : removeFromCart(item._id)}
              className="text-red-500 hover:text-red-700 flex items-center justify-center"
              title={isInBundle ? "Remove entire bundle" : "Remove from cart"}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Desktop Card */}
        <div className="hidden sm:flex flex-col sm:flex-row">
          <div className="sm:w-40 sm:h-26 flex-shrink-0 overflow-hidden rounded-md mb-4 sm:mb-0">
            <img
              src={getFullImageUrl(item.image) || "/placeholder.svg"}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="sm:ml-8 flex-1">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {item.name.length > 60 ? item.name.slice(0, 60) + "..." : item.name}
                </h3>
                <p className="text-sm text-gray-500 mb-1">{item.brand?.name || 'N/A'}</p>
                {item.selectedColorData && (
                  <p className="text-sm text-purple-600 font-medium mb-1 flex items-center">
                    <span className="inline-block w-4 h-4 rounded-full mr-2 border border-gray-300" style={{backgroundColor: item.selectedColorData.color?.toLowerCase() || '#9333ea'}}></span>
                    Color: {item.selectedColorData.color}
                    {item.selectedColorData.sku && <span className="ml-2 text-xs text-gray-500">({item.selectedColorData.sku})</span>}
                  </p>
                )}
                {item.selectedDosData && (
                  <p className="text-sm text-blue-600 font-medium mb-1 flex items-center">
                    💻 OS: {item.selectedDosData.dosType}
                    {item.selectedDosData.sku && <span className="ml-2 text-xs text-gray-500">({item.selectedDosData.sku})</span>}
                  </p>
                )}
                {isInBundle && (
                  <p className="text-xs text-lime-600 font-medium mb-2">
                    {item.bundleDiscount ? "Bundle Item (25% OFF)" : "Bundle Item"}
                  </p>
                )}
                
                {/* Pricing Details */}
                <div className="bg-gray-50 p-3 rounded mb-3 max-w-xl">
                  {pricingDetails.hasDiscount ? (
                    <>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Original Price:</span>
                        <span className="line-through text-gray-500">{formatPrice(pricingDetails.basePrice)}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Our Price:</span>
                        <span className="text-red-600 font-medium">{formatPrice(pricingDetails.currentPrice)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600">You Save:</span>
                        <span className="text-green-600 font-medium">
                          {formatPrice(pricingDetails.savings)} ({pricingDetails.discountPercentage}%)
                          {pricingDetails.isBundleDiscount && " (Bundle Discount)"}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Price:</span>
                      <span className="text-red-600 font-medium">{formatPrice(pricingDetails.currentPrice)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => handleQuantityChange(item._id, item.quantity - 1, bundleId)}
                  className="px-3 py-1 text-gray-600 hover:text-blue-600"
                  disabled={item.quantity === 1}
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-1 border-l border-r">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item._id, item.quantity + 1, bundleId)}
                  className="px-3 py-1 text-gray-600 hover:text-blue-600"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="text-right ml-4">
                <p className="text-xl font-bold text-gray-900">
                  {formatPrice(itemTotal)}
                </p>
                {pricingDetails.hasDiscount && (
                  <p className="text-sm text-green-600 font-medium">
                    Total Save: {formatPrice(pricingDetails.savings * item.quantity)}
                  </p>
                )}
              </div>
              <button
                onClick={() => isInBundle ? removeItemFromBundle(item._id, bundleId) : removeFromCart(item._id)}
                className="text-red-500 hover:text-red-700 flex items-center"
                title={isInBundle ? "Remove entire bundle" : "Remove from cart"}
              >
                <Trash2 size={18} className="mr-2" />
              </button>
            </div>
          </div>
        </div>
      </li>
    )
  }

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(to bottom right, #f8f9fa, #ffffff, #e2edf4)'}}>
      {/* Header Section with Gradient */}
      <div className="text-white py-6 sm:py-8 shadow-lg" style={{background: 'linear-gradient(to right, #2377c1, #1a5a8f)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1 flex items-center">
                <ShoppingBag className="mr-2 sm:mr-3" size={28} />
                Shopping Cart
              </h1>
              <p className="text-xs sm:text-sm" style={{color: '#e2edf4'}}>
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <div className="flex space-x-2 sm:space-x-3">
              <button
                onClick={handleOpenCouponsModal}
                className="px-3 py-2 lg:px-5 lg:py-2.5 text-xs sm:text-sm font-semibold bg-white rounded-lg transition-all shadow-md hover:shadow-lg flex items-center"
                style={{color: '#d9a82e', '--hover-bg': '#fef8e7'}}
                onMouseEnter={(e) => e.currentTarget.style.background = '#fef8e7'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
              >
                <Gift size={16} className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Available</span> Coupons
              </button>
              <Link to="/" className="bg-white  px-3 py-2 lg:px-5 lg:py-2.5 text-xs sm:text-sm font-semibold text-gray-900 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center">
                <ChevronRight size={16} className="mr-1" />
                <span className="hidden sm:inline">Continue</span> Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
          <div className="rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6" style={{background: 'linear-gradient(to bottom right, #e2edf4, #d0e3f0)'}}>
            <ShoppingBag size={64} style={{color: '#2377c1'}} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">Looks like you haven't added any items to your cart yet. Start shopping now!</p>
          <Link to="/" className="inline-flex items-center px-8 py-3 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all" style={{background: 'linear-gradient(to right, #2377c1, #1a5a8f)'}}>
            <ShoppingBag size={18} className="mr-2" />
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {/* Render Bundles First */}
            {Object.values(grouped).map((bundle) => {
              const bundleTotals = calculateBundleTotals(bundle.items)
              
              return (
                <div key={bundle.bundleId} className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden hover:shadow-xl transition-shadow" style={{borderWidth: '2px', borderColor: '#2377c1'}}>
                  {/* Bundle Header */}
                  <div className="px-6 py-4" style={{background: 'linear-gradient(to right, #2377c1, #1a5a8f)'}}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-white/20 p-2 rounded-lg mr-3">
                          <Package className="text-white" size={22} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">Frequently Bought Together</h3>
                          <p className="text-lime-100 text-xs mt-0.5">Special bundle discount applied</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeBundleFromCart(bundle.bundleId)}
                        className="text-white hover:text-red-200 text-sm flex items-center bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-all"
                        title="Remove entire bundle"
                      >
                        <Trash2 size={16} className="mr-1" />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-3 pt-3" style={{borderTop: '1px solid rgba(255,255,255,0.3)'}}>
                      <div className="bg-white/20 px-3 py-1.5 rounded-lg text-white font-semibold text-sm">
                        Bundle Total: {formatPrice(bundleTotals.total)}
                      </div>
                      <div className="px-3 py-1.5 rounded-lg text-white font-semibold text-sm" style={{background: '#28a745'}}>
                        💰 You Save: {formatPrice(bundleTotals.savings)}
                      </div>
                    </div>
                  </div>

                  {/* Bundle Items */}
                  <ul className="divide-y divide-gray-200">
                    {bundle.items.map((item) => renderItem(item, true, bundle.bundleId))}
                  </ul>
                </div>
              )
            })}

            {/* Render Standalone Items (excluding protections) */}
            {filteredStandaloneItems.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {Object.keys(grouped).length > 0 && (
                  <div className="px-6 py-4 border-b border-gray-200" style={{background: 'linear-gradient(to right, #e2edf4, #f5f5f5)'}}>
                    <h3 className="text-lg font-bold text-gray-800 flex items-center">
                      <div className="w-1 h-6 rounded-full mr-3" style={{background: '#2377c1'}}></div>
                      Individual Items
                    </h3>
                  </div>
                )}
                <ul className="divide-y divide-gray-200">
                  {filteredStandaloneItems.map((item) => renderItem(item, false, null))}
                </ul>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden sticky top-4" style={{borderWidth: '1px', borderColor: '#2377c1'}}>
              <div className="px-6 py-4" style={{background: 'linear-gradient(to right, #2377c1, #1a5a8f)'}}>
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Package className="mr-2" size={22} />
                  Order Summary
                </h2>
              </div>
              <div className="p-6">

              <div className="space-y-3">
                {/* Detailed Price Breakdown */}
                {cartTotals.totalSavings > 0 && (
                  <>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600 text-sm">Original Price</span>
                        <span className="text-gray-500 line-through text-sm">{formatPrice(cartTotals.totalBasePrice)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700 font-medium">Discounted Price</span>
                        <span className="text-red-600 font-bold">{formatPrice(cartTotals.totalCurrentPrice)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-200">
                        <span className="font-semibold text-green-600 flex items-center">
                          <Award size={16} className="mr-1" />
                          Total Savings
                        </span>
                        <span className="font-bold text-green-600">- {formatPrice(cartTotals.totalSavings)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-gray-700 font-medium">Subtotal</span>
                      <span className="text-gray-900 font-bold text-lg">{formatPrice(cartTotals.totalCurrentPrice)}</span>
                    </div>
                  </>
                )}
                
                {/* Simple subtotal when no discounts */}
                {cartTotals.totalSavings <= 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-black">{formatPrice(cartTotals.totalCurrentPrice)}</span>
                  </div>
                )}

                {/* Delivery Options */}
                {cartTotals.totalCurrentPrice <= 500 && (
                  <div className="rounded-lg p-3" style={{background: '#e2edf4', borderWidth: '1px', borderColor: '#2377c1'}}>
                    <span className="text-gray-700 font-medium block mb-2 flex items-center">
                      <Truck size={16} className="mr-2" style={{color: '#2377c1'}} />
                      Delivery Options
                    </span>
                    {deliveryOptions.length > 0 ? (
                      <select
                        className="w-full rounded-lg px-3 py-2 transition-all"
                        style={{borderWidth: '2px', borderColor: '#2377c1'}}
                        value={selectedDelivery?._id || ""}
                        onChange={e => {
                          const found = deliveryOptions.find(opt => opt._id === e.target.value)
                          setSelectedDelivery(found)
                        }}
                      >
                        {deliveryOptions.map(opt => (
                          <option key={opt._id} value={opt._id}>
                            {opt.name} ({formatPrice(opt.charge)}) - {opt.deliveryTime}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-gray-500">No delivery options</span>
                    )}
                  </div>
                )}
                <div className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2">
                  <span className="text-gray-700 font-medium flex items-center">
                    <Truck size={16} className="mr-2" style={{color: '#2377c1'}} />
                    Shipping
                  </span>
                  <span className="font-semibold text-gray-900">{deliveryCharge === 0 ? <span className="text-green-600">Free</span> : formatPrice(deliveryCharge)}</span>
                </div>

                {/* Protection Plans Section */}
                {protectionItems.length > 0 && (
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Protection Plans</h3>
                    <div className="space-y-2">
                      {protectionItems.map((item) => (
                        <div key={item._id} className="flex items-start justify-between bg-blue-50 p-3 rounded-lg border border-blue-200">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Shield size={16} className="text-blue-600" />
                              <p className="text-sm font-medium text-gray-900">{item.protectionData?.name || item.name}</p>
                            </div>
                            <p className="text-xs text-gray-600 ml-6">
                              {item.protectionData?.duration} - For: {item.name.split(' for ')[1] || 'Product'}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-red-600">{formatPrice(item.price)}</span>
                            <button
                              onClick={() => removeFromCart(item._id)}
                              className="text-red-500 hover:text-red-700 p-1"
                              title="Remove protection"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* VAT included note */}
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">VAT Included</span>
                  <span className="text-gray-600 text-sm">✓</span>
                </div>

                {/* Coupon */}
                <div className="rounded-lg p-4" style={{background: 'linear-gradient(to bottom right, #fef9e7, #fef3d9)', borderWidth: '2px', borderStyle: 'dashed', borderColor: '#d9a82e'}}>
                  <div className="flex items-center mb-2">
                    <Percent size={18} className="mr-2" style={{color: '#d9a82e'}} />
                    <span className="text-gray-700 font-semibold text-sm">Have a coupon code?</span>
                  </div>
                  <div className="flex items-stretch gap-2">
                    <input
                      type="text"
                      className="rounded-lg px-3 py-2 transition-all"
                      style={{borderWidth: '2px', borderColor: '#d9a82e', flex: '1 1 auto', minWidth: '0'}}
                      placeholder="Enter code"
                      value={coupon ? coupon.code : couponInput}
                      onChange={e => setCouponInput(e.target.value)}
                      disabled={!!coupon}
                    />
                    {!coupon ? (
                      <button
                        className="text-white px-3 sm:px-4 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg whitespace-nowrap"
                        style={{background: 'linear-gradient(to right, #2377c1, #1a5a8f)', flexShrink: 0}}
                        onClick={handleApplyCoupon}
                        disabled={couponLoading || !couponInput}
                      >
                        {couponLoading ? "Applying..." : "Apply"}
                      </button>
                    ) : (
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all shadow-md whitespace-nowrap"
                        style={{flexShrink: 0}}
                        onClick={() => {
                          setCoupon(null);
                          setCouponDiscount(0);
                          setCouponInput("");
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {couponError && <div className="text-red-600 text-xs mt-2 font-medium">{couponError}</div>}
                  {coupon && (
                    <div className="flex justify-between bg-green-100 rounded-lg px-3 py-2 mt-2 border border-green-300">
                      <span className="text-green-700 font-semibold text-sm flex items-center">
                        <CheckCircle size={16} className="mr-1" />
                        {coupon.code}
                      </span>
                      <span className="text-green-700 font-bold">-{formatPrice(couponDiscount)}</span>
                    </div>
                  )}
                </div>

                <div className="rounded-lg p-4 mt-4" style={{background: 'linear-gradient(to right, #2377c1, #1a5a8f)'}}>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold text-lg">Total Amount</span>
                    <span className="text-white font-bold text-2xl">{formatPrice(totalWithDeliveryTaxCoupon)}</span>
                  </div>
                </div>
              </div>
              </div>

              {/* Free shipping message */}
              {cartTotals.totalCurrentPrice < 500 && cartTotals.totalCurrentPrice > 0 && (
                <div className="mx-6 mb-4 p-4 rounded-xl" style={{background: 'linear-gradient(to right, #e2edf4, #d0e3f0)', borderWidth: '2px', borderColor: '#2377c1'}}>
                  <div className="flex items-start">
                    <Truck className="mr-3 mt-0.5" size={20} style={{color: '#2377c1'}} />
                    <div>
                      <p className="text-sm font-semibold mb-1" style={{color: '#1a5a8f'}}>
                        Almost there! Free shipping at AED 500
                      </p>
                      <p className="text-xs" style={{color: '#2377c1'}}>
                        Add {formatPrice(500 - cartTotals.totalCurrentPrice)} more to unlock free delivery!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {cartTotals.totalCurrentPrice >= 500 && (
                <div className="mx-6 mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl">
                  <div className="flex items-center">
                    <CheckCircle className="text-green-600 mr-3" size={24} />
                    <p className="text-sm font-bold text-green-800">
                      🎉 Congratulations! You qualify for FREE shipping!
                    </p>
                  </div>
                </div>
              )}

              <div className="px-6 pb-6">
                {/* Terms and Privacy Policy */}
                <div className="mb-4 bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <label className="flex items-start space-x-2 text-xs text-gray-600 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="mt-0.5 rounded border-gray-300"
                      style={{accentColor: '#2377c1'}}
                      defaultChecked 
                    />
                    <span>
                      I agree to the{' '}
                      <Link to="/terms" className="underline font-medium" style={{color: '#2377c1'}}>
                        Terms of use
                      </Link>
                      {' '}and{' '}
                      <Link to="/privacy" className="underline font-medium" style={{color: '#2377c1'}}>
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                </div>

                <Link
                  to="/checkout"
                  className="w-full text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  style={{background: 'linear-gradient(to right, #2377c1, #1a5a8f)'}}
                >
                  <ShoppingBag size={20} className="mr-2" />
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Coupons Modal */}
      {showCouponsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl relative animate-fadeIn">
            {/* Modal Header */}
            <div className="px-6 py-5 flex items-center justify-between" style={{background: 'linear-gradient(to right, #d9a82e, #c99625)'}}>
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-lg mr-3">
                  <Gift className="text-white" size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Available Coupons</h2>
                  <p className="text-sm" style={{color: 'rgba(255,255,255,0.9)'}}>Save more on your purchase</p>
                </div>
              </div>
              <button
                className="text-white hover:text-yellow-200 bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all"
                onClick={handleCloseCouponsModal}
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto" style={{maxHeight: 'calc(85vh - 100px)'}}>
            {loadingCoupons ? (
              <div className="flex flex-col justify-center items-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-4 mb-4" style={{borderColor: '#e2edf4', borderTopColor: '#2377c1'}}></div>
                <p className="text-gray-600 font-medium">Loading amazing deals...</p>
              </div>
            ) : couponModalError ? (
              <div className="text-center py-12">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <X className="text-red-500" size={32} />
                </div>
                <p className="text-red-600 font-medium">{couponModalError}</p>
              </div>
            ) : publicCoupons.length === 0 ? (
              <div className="text-center py-12">
                <Gift className="mx-auto text-gray-300 mb-4" size={64} />
                <p className="text-gray-500 font-medium">No coupons available at the moment.</p>
                <p className="text-gray-400 text-sm mt-2">Check back soon for great deals!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {publicCoupons.map((coupon, idx) => {
                  console.log('Rendering coupon:', coupon); // Debug log
                  const color = COUPON_COLORS[idx % COUPON_COLORS.length]
                  const categories =
                    coupon.categories && coupon.categories.length > 0
                      ? coupon.categories.map((cat) => cat.name || cat).join(", ")
                      : "All Categories"
                  return (
                    <div key={coupon._id || idx} className="relative flex items-center w-full">
                      {/* Ticket Style - Horizontal Layout */}
                      <div
                        className={`w-full flex shadow-md relative overflow-visible transition-all duration-500 ease-out opacity-100 translate-y-0 ${color.border}`}
                        style={{ minHeight: 100 }}
                      >
                        {/* Left stub - Compact */}
                        <div
                          className={`flex flex-col items-center justify-center py-2 px-2 ${color.stub} border-l-2 border-t-2 border-b-2 ${color.border} rounded-l-lg relative`}
                          style={{ minWidth: 60 }}
                        >
                          <span
                            className="text-[8px] font-bold tracking-widest text-gray-700 rotate-180"
                            style={{ writingMode: "vertical-rl" }}
                          >
                            DISCOUNT
                          </span>
                          {/* Barcode effect - Smaller */}
                          <div
                            className={`w-4 h-6 mt-1 flex flex-col justify-between ${color.barcode}`}
                            style={{ borderRadius: 2 }}
                          >
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`h-0.5 ${i % 2 === 0 ? "bg-gray-700" : "bg-gray-400"} w-full rounded`}
                              ></div>
                            ))}
                          </div>
                        </div>
                        {/* Main ticket - Responsive Layout */}
                        <div
                          className={`flex-1 ${color.main} border-r-2 border-t-2 border-b-2 ${color.border} rounded-r-lg p-3 flex flex-col md:flex-row md:items-center relative overflow-hidden`}
                        >
                          {/* Cut edges */}
                          <div
                            className={`absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 ${color.border}`}
                          ></div>
                          <div
                            className={`absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 ${color.border}`}
                          ></div>

                          {/* Mobile: Vertical Layout, Desktop: Horizontal Layout */}
                          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4 flex-1">
                            {/* Discount Info */}
                            <div className="flex items-center justify-between md:flex-col md:items-center md:justify-center">
                              <span className="text-xs font-semibold text-gray-500 tracking-widest">GIFT COUPON</span>
                              <span className={`text-xl font-bold flex items-center ${color.text}`}>
                                {coupon.discountType === "percentage" && <Percent className="w-4 h-4 mr-1" />}
                                {coupon.discountType === "percentage"
                                  ? `${coupon.discountValue}%`
                                  : `AED ${coupon.discountValue}`}
                              </span>
                            </div>

                            {/* Promo Code */}
                            <div className="flex flex-col items-center flex-1">
                              <span className="block text-sm font-bold text-gray-900 mb-2">PROMO CODE</span>
                              <div className="flex items-center w-full justify-center">
                                <span
                                  className={`inline-block bg-white border ${color.border} rounded px-3 py-1 font-mono text-sm font-bold ${color.text} tracking-widest`}
                                >
                                  {coupon.code}
                                </span>
                                <button
                                  className={`ml-2 px-2 py-1 text-xs ${color.stub} hover:brightness-110 text-black rounded transition-colors font-semibold border ${color.border} focus:outline-none focus:ring-2 focus:ring-yellow-300`}
                                  onClick={() => handleCopyCoupon(coupon.code, coupon._id)}
                                >
                                  {couponCopied === coupon._id ? "Copied!" : "Copy"}
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Details - Mobile: Full width, Desktop: Right aligned */}
                          <div className="flex flex-col md:items-end text-left md:text-right space-y-1 mt-3 md:mt-0">
                            <div className="text-xs text-gray-600 md:max-w-xs">{coupon.description}</div>
                            <div className="flex flex-col md:items-end space-y-1">
                              <div className="text-xs text-gray-500">Min: AED {coupon.minOrderAmount || 0}</div>
                              <div className="text-xs text-gray-500">
                                Valid: {new Date(coupon.validFrom).toLocaleDateString()} -{" "}
                                {new Date(coupon.validUntil).toLocaleDateString()}
                              </div>
                              <div className="text-xs font-semibold text-gray-700">{categories}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart