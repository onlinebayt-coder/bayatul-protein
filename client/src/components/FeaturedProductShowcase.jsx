import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { getFullImageUrl } from '../utils/imageUtils'
import { generateShopURL } from '../utils/urlUtils'

const FeaturedProductShowcase = ({ products = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isZooming, setIsZooming] = useState(false)
  const [zoomBgPos, setZoomBgPos] = useState("50% 50%")
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 })
  const mainImgRef = useRef(null)
  const { addToCart } = useCart()

  // Auto-rotate products every 5 seconds (pause while zooming)
  useEffect(() => {
    if (products.length === 0) return
    
    const interval = setInterval(() => {
      if (!isZooming) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
        setQuantity(1)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [products.length, isZooming])

  // Reset when products change
  useEffect(() => {
    setCurrentIndex(0)
    setQuantity(1)
  }, [products])

  if (!products || products.length === 0) {
    return null
  }

  const currentProduct = products[currentIndex]
  const { hasOffer, priceToShow, basePrice, discountPct } = priceInfo(currentProduct)
  const categoryNames = getCategoryNames(currentProduct)
  const stock = getStockInfo(currentProduct)
  const productUrl = currentProduct ? `/product/${currentProduct.slug || currentProduct._id}` : "#"

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index)
    setQuantity(1)
  }

  const handleAddToCart = () => {
    if (currentProduct) {
      addToCart(currentProduct, quantity)
    }
  }

  const handleMouseMove = (e) => {
    if (!mainImgRef.current) return
    const rect = mainImgRef.current.getBoundingClientRect()
    const x = Math.min(Math.max(0, e.clientX - rect.left), rect.width)
    const y = Math.min(Math.max(0, e.clientY - rect.top), rect.height)

    const percentX = (x / rect.width) * 100
    const percentY = (y / rect.height) * 100
    setZoomBgPos(`${percentX}% ${percentY}%`)

    const LENS_SIZE = 140
    const lensX = Math.min(Math.max(0, x - LENS_SIZE / 2), rect.width - LENS_SIZE)
    const lensY = Math.min(Math.max(0, y - LENS_SIZE / 2), rect.height - LENS_SIZE)
    setLensPos({ x: lensX, y: lensY })
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Image gallery */}
          <div className="lg:col-span-7">
            <div className="flex gap-4">
              {/* Thumbnails */}
              <div className="hidden sm:flex sm:flex-col gap-3 w-16">
                {/* Current product (highlighted, non-clickable) */}
                {currentProduct && (
                  <button
                    key={`current-${currentIndex}`}
                    className="border rounded-md overflow-hidden aspect-square bg-white ring-2 ring-[#d9a82e] cursor-default"
                    aria-current="true"
                    title="Currently viewing"
                    disabled
                  >
                    <img
                      src={getFullImageUrl(currentProduct.image) || '/placeholder.svg'}
                      alt={currentProduct?.name || `Current product`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                )}
                {getUpcomingThumbs(products, currentIndex, 5).map((item, idx) => (
                  <button
                    key={`${item.index}-${idx}`}
                    onClick={() => handleThumbnailClick(item.index)}
                    className="border rounded-md overflow-hidden aspect-square bg-white hover:opacity-90 transition"
                    aria-label={`Next: ${item.product?.name || `Product ${item.index + 1}`}`}
                    title={`Next: ${item.product?.name || `Product ${item.index + 1}`}`}
                  >
                    <img 
                      src={getFullImageUrl(item.product.image) || '/placeholder.svg'} 
                      alt={item.product?.name || `Product ${item.index + 1}`} 
                      className="w-full h-full object-contain" 
                    />
                  </button>
                ))}
              </div>

              {/* Main image */}
              <div
                ref={mainImgRef}
                className="flex-1 border rounded-lg p-4 bg-white h-[220px] md:h-[420px] lg:h-[400px] flex items-center justify-center relative"
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={getFullImageUrl(currentProduct.image) || '/placeholder.svg'}
                  alt={currentProduct.name}
                  className="max-h-full max-w-full object-contain"
                />
                {isZooming && (
                  <div
                    className="pointer-events-none absolute rounded-md border"
                    style={{
                      left: lensPos.x,
                      top: lensPos.y,
                      width: 140,
                      height: 140,
                      borderColor: "#d9a82e",
                      background: "rgba(192,175,155,0.25)",
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right: Product info */}
          <div className="lg:col-span-5">
            {isZooming ? (
              <div className="relative h-[220px] md:h-[420px] lg:h-[400px] border rounded-lg bg-white overflow-hidden">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url(${getFullImageUrl(currentProduct.image) || '/placeholder.svg'})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "200% 200%",
                    backgroundPosition: zoomBgPos,
                  }}
                />
              </div>
            ) : (
              <>
                <div className="flex items-start gap-3 mb-2">
                  {!!discountPct && (
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-md bg-[#d9a82e] text-white">
                      -{discountPct}%
                    </span>
                  )}
                  {stock?.label && (
                    <span className={stock.badgeClass}>{stock.label}</span>
                  )}
                </div>
                <h1
                  className="text-xl md:text-2xl font-bold text-gray-900 leading-snug overflow-hidden break-words"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    lineHeight: 1.375,
                    minHeight: "calc(3 * 1em * 1.375)",
                  }}
                  title={currentProduct.name}
                >
                  {currentProduct.name}
                </h1>
                
                {/* Category chips */}
                <div className="mt-2 mb-3">
                  <span className="text-sm font-medium text-gray-700">Category:</span>
                  {categoryNames && categoryNames.length > 0 ? (
                    <span className="ml-2 inline-flex flex-wrap gap-2 align-middle">
                      {categoryNames.map((name) => (
                        <Link
                          key={name}
                          to={generateShopURL({ parentCategory: name })}
                          className="inline-block text-xs md:text-sm rounded-full px-2 py-0.5 border border-[#d9a82e]/30 bg-[#d9a82e]/10 text-gray-900 hover:text-[#d9a82e] transition-colors"
                          title={`View ${name}`}
                        >
                          {name}
                        </Link>
                      ))}
                    </span>
                  ) : (
                    <span className="ml-2 text-sm text-gray-500">N/A</span>
                  )}
                </div>
                
                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  {hasOffer && (
                    <div className="text-red-600 text-xl font-semibold">{formatCurrency(priceToShow)} AED</div>
                  )}
                  <div className="text-gray-400 line-through font-medium">{formatCurrency(basePrice)} AED</div>
                </div>

                {/* Quantity + Add to Cart */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center border rounded-full px-2 h-10">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2 disabled:opacity-50"
                      aria-label="Decrease quantity"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 min-w-[2ch] text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity((q) => q + 1)} 
                      className="p-2" 
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 h-10 rounded-full bg-[#e2edf4]  text-gray-900 font-semibold tracking-wide transition"
                  >
                    Choose Options
                  </button>

                  <button
                    className="h-10 w-10 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50"
                    aria-label="Secondary action"
                  >
                    ×
                  </button>
                </div>

                {/* Payment quick action */}
                <div className="mb-2">
                  <Link
                    to={productUrl}
                    className="w-full h-10 rounded-md border border-gray-300 bg-white text-gray-800 font-medium flex items-center justify-center hover:bg-gray-50 transition"
                    aria-label={`View details for ${currentProduct?.name || "product"}`}
                  >
                    View Product Details
                  </Link>
                  <div className="mt-1">
                    <button className="text-xs text-gray-600 underline">More payment options</button>
                  </div>
                </div>

                {/* Safe checkout strip */}
                <div className="mt-4">
                  <div className="text-sm text-gray-700 font-medium mb-2">Guaranteed Safe Checkout</div>
                  <div className="flex flex-wrap gap-2 items-center">
                    {["VISA", "Mastercard", "tabby", "AMEX", "Apple Pay", "Google Pay"].map((name) => (
                      <span
                        key={name}
                        className="text-[11px] px-2 py-1 rounded border border-gray-300 bg-white text-gray-700"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper functions
function getUpcomingThumbs(list, currentIndex, count = 5) {
  if (!Array.isArray(list) || list.length === 0) return []
  const items = []
  const len = list.length
  for (let i = 1; i <= Math.min(count, len - 1); i++) {
    const idx = (currentIndex + i) % len
    const prod = list[idx]
    if (prod) items.push({ index: idx, product: prod })
  }
  return items
}

function getCategoryNames(p) {
  if (!p) return []
  const names = []
  const c = p.category ?? p.parentCategory
  if (c) {
    if (typeof c === "string") names.push(c)
    else if (typeof c === "object") names.push(c.name || c.title || c.slug || "")
  }
  if (Array.isArray(p.categories)) {
    for (const it of p.categories) {
      if (!it) continue
      if (typeof it === "string") names.push(it)
      else if (typeof it === "object") names.push(it.name || it.title || it.slug || "")
    }
  }
  return Array.from(new Set(names.filter(Boolean)))
}

function priceInfo(p) {
  if (!p) return { hasOffer: false, priceToShow: 0, basePrice: 0, discountPct: 0 }
  const basePrice = Number(p.price) || 0
  const offerPrice = Number(p.offerPrice) || 0
  const hasOffer = offerPrice > 0 && basePrice > 0 && offerPrice < basePrice
  const priceToShow = hasOffer ? offerPrice : basePrice || offerPrice || 0
  let discountPct = 0
  if (hasOffer && basePrice > 0) {
    discountPct = Math.round(((basePrice - offerPrice) / basePrice) * 100)
  } else if (p.discount) {
    discountPct = Math.round(Number(p.discount))
  }
  return { hasOffer, priceToShow, basePrice, discountPct }
}

function formatCurrency(n) {
  const value = Number(n) || 0
  return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function getStockInfo(p) {
  if (!p) return { label: "", badgeClass: "" }
  const rawStatus = typeof p.stockStatus === "string" ? p.stockStatus.trim().toLowerCase() : ""
  if (rawStatus) {
    if (rawStatus === "out of stock") {
      return {
        label: "Out of Stock",
        badgeClass: "inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-md bg-red-600 text-white",
      }
    }
    if (rawStatus === "preorder" || rawStatus === "pre-order" || rawStatus === "pre order") {
      return {
        label: "Pre-order",
        badgeClass: "inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-md bg-blue-600 text-white",
      }
    }
    return {
      label: "In Stock",
      badgeClass: "inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-md bg-green-600 text-white",
    }
  }

  const count =
    typeof p.countInStock === "number"
      ? p.countInStock
      : typeof p.stock === "number"
      ? p.stock
      : typeof p.quantity === "number"
      ? p.quantity
      : undefined

  const boolInStock =
    typeof p.isInStock === "boolean"
      ? p.isInStock
      : typeof p.inStock === "boolean"
      ? p.inStock
      : count !== undefined
      ? count > 0
      : true

  let label = boolInStock ? "In Stock" : "Out of Stock"
  if (boolInStock && typeof count === "number") {
    if (count === 0) label = "Out of Stock"
    else if (count <= 3) label = `Only ${count} left`
  }

  const badgeClass = boolInStock
    ? "inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-md bg-green-600 text-white"
    : "inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-md bg-red-600 text-white"

  return { label, badgeClass }
}

export default FeaturedProductShowcase
