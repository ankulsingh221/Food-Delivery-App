"use client"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Search, ShoppingCart, User, Package, LogOut, Star, Clock, Truck, Plus, Minus, CreditCard, MapPin, ChevronLeft, ChevronRight } from "lucide-react"

const mockRestaurants = [
  { id: 1, name: "McDonald's", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop", rating: 4.3, deliveryTime: "20-35", deliveryFee: "Free", category: "Fast Food" },
  { id: 2, name: "Pizza Hut", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop", rating: 4.1, deliveryTime: "25-40", deliveryFee: "\$2.99", category: "Pizza" },
  { id: 3, name: "Burger King", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop", rating: 4.2, deliveryTime: "15-30", deliveryFee: "Free", category: "Fast Food" },
  { id: 4, name: "KFC", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop", rating: 4.4, deliveryTime: "20-35", deliveryFee: "\$1.99", category: "Chicken" },
  { id: 5, name: "Subway", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=400&h=300&fit=crop", rating: 4.0, deliveryTime: "15-25", deliveryFee: "Free", category: "Sandwiches" },
  { id: 6, name: "Domino's", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop", rating: 4.5, deliveryTime: "25-40", deliveryFee: "\$3.49", category: "Pizza" },
  { id: 7, name: "Starbucks", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop", rating: 4.6, deliveryTime: "10-20", deliveryFee: "Free", category: "Coffee" },
]

const mockMenuItems = [
  { id: 1, name: "Big Mac", price: 5.99, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=100&h=100&fit=crop", category: "Burgers", rating: 4.5 },
  { id: 2, name: "Chicken McNuggets", price: 4.99, image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=100&h=100&fit=crop", category: "Chicken", rating: 4.3 },
  { id: 3, name: "French Fries", price: 2.99, image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=100&h=100&fit=crop", category: "Sides", rating: 4.0 },
  { id: 4, name: "Cheeseburger", price: 3.49, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=100&h=100&fit=crop", category: "Burgers", rating: 4.2 },
  { id: 5, name: "Pepperoni Pizza", price: 12.99, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop", category: "Pizza", rating: 4.7 },
  { id: 6, name: "Cappuccino", price: 3.99, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", category: "Coffee", rating: 4.6 },
  { id: 7, name: "Chicken Sandwich", price: 6.49, image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=100&h=100&fit=crop", category: "Sandwiches", rating: 4.4 },
  { id: 8, name: "Apple Pie", price: 1.99, image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=100&h=100&fit=crop", category: "Desserts", rating: 4.1 },
]

const mockRecentOrders = [
  { id: 1, name: "Cheese Burger", price: 4.99, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=100&h=100&fit=crop", status: "Delivered" },
  { id: 2, name: "Pepperoni Pizza", price: 12.99, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop", status: "Delivered" },
  { id: 3, name: "Chicken Nuggets", price: 4.99, image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=100&h=100&fit=crop", status: "In Progress" },
  { id: 4, name: "Fries", price: 2.99, image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=100&h=100&fit=crop", status: "Delivered" },
  { id: 5, name: "Cappuccino", price: 3.99, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", status: "Cancelled" },
]

export default function CustomerDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("browse")
  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState([])
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [trackingOrderId, setTrackingOrderId] = useState(null)
  const [showTrackingModal, setShowTrackingModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [paymentErrors, setPaymentErrors] = useState({})
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
  })

  // Load orders from localStorage on mount
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("quickeats_orders")) || []
    setOrders(storedOrders)
  }, [])

  // Poll localStorage for order updates every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const storedOrders = JSON.parse(localStorage.getItem("quickeats_orders")) || []
      setOrders(storedOrders)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Simulate automatic status updates for tracking (customer-side)
  useEffect(() => {
    if (trackingOrderId) {
      const timer = setInterval(() => {
        setOrders(prevOrders => prevOrders.map(order => {
          if (order.id === trackingOrderId) {
            if (order.status === "pending") return { ...order, status: "preparing" }
            if (order.status === "preparing") return { ...order, status: "out for delivery" }
            if (order.status === "out for delivery") return { ...order, status: "delivered" }
          }
          return order
        }))
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [trackingOrderId])

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id)
    if (existingItem) {
      setCart(cart.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)))
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  const removeFromCart = (itemId) => {
    const existingItem = cart.find((cartItem) => cartItem.id === itemId)
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map((cartItem) => (cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)))
    } else {
      setCart(cart.filter((cartItem) => cartItem.id !== itemId))
    }
  }

  const getTotalPrice = () => cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0)

  const getItemQuantity = (itemId) => {
    const item = cart.find((cartItem) => cartItem.id === itemId)
    return item ? item.quantity : 0
  }

  const filteredRestaurants = mockRestaurants.filter(r => 
    (activeCategory === "All" || r.category === activeCategory) &&
    (r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.category.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const filteredMenuItems = mockMenuItems.filter(m => 
    (activeCategory === "All" || m.category === activeCategory) &&
    (m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.category.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleLogoClick = () => {
    setActiveTab("browse");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    setPaymentErrors({})

    if (!paymentMethod) {
      setPaymentErrors({ general: "Please select a payment method" })
      return
    }
    if (paymentMethod === "card") {
      if (!paymentDetails.cardNumber || !paymentDetails.expiry || !paymentDetails.cvv) {
        setPaymentErrors({ card: "All card fields are required" })
        return
      }
    }
    if (paymentMethod === "upi") {
      if (!paymentDetails.upiId) {
        setPaymentErrors({ upi: "UPI ID is required" })
        return
      }
    }

    const newOrder = {
      id: Date.now(),
      items: cart,
      total: getTotalPrice(),
      status: "pending",
      createdAt: new Date().toISOString(),
    }
    const updatedOrders = [...orders, newOrder]
    setOrders(updatedOrders)
    localStorage.setItem("quickeats_orders", JSON.stringify(updatedOrders))
    setCart([])
    setShowPaymentModal(false)
    setTrackingOrderId(newOrder.id)
    setShowTrackingModal(true)
  }

  const handlePaymentChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value })
  }

  const trackOrder = (orderId) => {
    setTrackingOrderId(orderId)
    setShowTrackingModal(true)
  }

  const getProgress = (status) => {
    switch (status) {
      case "pending": return 25
      case "preparing": return 50
      case "out for delivery": return 75
      case "delivered": return 100
      default: return 0
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={handleLogoClick} 
              className="text-2xl font-bold text-black hover:scale-105 transition-transform duration-300"
            >
              Quick<span className="text-primary-500">Eats</span>
            </button>
            <div className="flex items-center space-x-4">
              <button onClick={() => setActiveTab("cart")} className="relative p-2 text-gray-600 hover:text-black">
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{getTotalItems()}</span>}
              </button>
              <div className="flex items-center space-x-3">
                <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-8 w-8 rounded-full" />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">Customer</p>
                </div>
                <button onClick={logout} className="p-2 text-gray-600 hover:text-red-600">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="card">
              <ul className="space-y-2">
                {[
                  { id: "browse", name: "Browse Restaurants", icon: Search },
                  { id: "orders", name: "My Orders", icon: Package },
                  { id: "cart", name: "Cart", icon: ShoppingCart },
                  { id: "profile", name: "Profile", icon: User },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                          activeTab === item.id ? "bg-primary-50 text-primary-700" : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                        {item.id === "cart" && getTotalItems() > 0 && (
                          <span className="ml-auto bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {getTotalItems()}
                          </span>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "browse" && (
              <div className="space-y-6">
                {/* Greeting and Promo Banner */}
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold">Hello, {user.name}!</h1>
                  <div className="card bg-gradient-to-r from-primary-400 to-primary-600 text-white flex items-center justify-between p-4 rounded-xl">
                    <div>
                      <h3 className="font-bold">Get Discount Voucher</h3>
                      <p>Up to 20% off your next order!</p>
                    </div>
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="Promo" className="w-16 h-16 rounded-full" />
                  </div>
                </div>

                {/* Search Bar */}
                <div className="card">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search for restaurants or dishes..."
                      className="input-field pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
                  {["All", "Fast Food", "Pizza", "Burgers", "Chicken", "Sides"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-full ${activeCategory === cat ? "bg-primary-500 text-white" : "bg-gray-200 text-gray-800"}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Top Restaurants Section */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">Top Restaurants</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredRestaurants.map((restaurant) => (
                      <div key={restaurant.id} className="card hover:shadow-lg cursor-pointer" onClick={() => setSelectedRestaurant(restaurant)}>
                        <img src={restaurant.image} alt={restaurant.name} className="w-full h-40 object-cover rounded-t-xl" />
                        <div className="p-4">
                          <h3 className="font-bold">{restaurant.name}</h3>
                          <p className="text-sm text-gray-600">{restaurant.category}</p>
                          <div className="flex justify-between text-sm mt-2">
                            <span>{restaurant.deliveryTime} min</span>
                            <span className="flex items-center"><Star className="h-4 w-4 text-yellow-400" /> {restaurant.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popular Dishes Section */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">Popular Dishes</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredMenuItems.map((item) => (
                      <div key={item.id} className="card hover:shadow-lg">
                        <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-t-xl" />
                        <div className="p-3">
                          <h3 className="font-bold text-sm">{item.name}</h3>
                          <p className="text-sm text-gray-600">${item.price}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="flex items-center text-xs"><Star className="h-3 w-3 text-yellow-400" /> {item.rating}</span>
                            <button onClick={() => addToCart(item)} className="btn-primary text-xs px-2 py-1">Add</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Orders Section */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">Recent Orders</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {mockRecentOrders.map((order) => (
                      <div key={order.id} className="card">
                        <img src={order.image} alt={order.name} className="w-full h-32 object-cover rounded-lg mb-2" />
                        <h3 className="font-bold">{order.name}</h3>
                        <p className="text-sm text-gray-600">${order.price}</p>
                        <p className={`text-xs ${order.status === 'Delivered' ? 'text-green-600' : order.status === 'Cancelled' ? 'text-red-600' : 'text-yellow-600'}`}>{order.status}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Restaurant Menu Modal */}
                {selectedRestaurant && (
                  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col">
                      <div className="flex items-center justify-between p-6 border-b">
                        <div>
                          <h2 className="text-2xl font-bold">{selectedRestaurant.name}</h2>
                          <p className="text-gray-600">{selectedRestaurant.category}</p>
                        </div>
                        <button
                          onClick={() => setSelectedRestaurant(null)}
                          className="p-2 hover:bg-gray-100 rounded-full"
                        >
                          <Plus className="h-6 w-6 rotate-45" />
                        </button>
                      </div>
                      <div className="flex-1 overflow-y-auto p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {mockMenuItems.map((item) => (
                            <div key={item.id} className="bg-gray-50 rounded-xl p-4 flex items-center space-x-4">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-primary-600 font-bold">${item.price}</p>
                              </div>
                              <button 
                                onClick={() => addToCart(item)} 
                                className="btn-primary flex items-center justify-center p-2 relative"
                              >
                                <Plus className="h-4 w-4" />
                                {getItemQuantity(item.id) > 0 && (
                                  <span className="absolute -top-2 -right-2 bg-white text-primary-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border border-primary-500">
                                    {getItemQuantity(item.id)}
                                  </span>
                                )}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "cart" && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                    <p className="text-gray-600 mb-4">Add some delicious items to get started!</p>
                    <button onClick={() => setActiveTab("browse")} className="btn-primary">
                      Browse Restaurants
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-primary-600 font-bold">${item.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-gray-600 hover:text-red-600"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="font-semibold w-8 text-center">{item.quantity}</span>
                          <button onClick={() => addToCart(item)} className="p-1 text-gray-600 hover:text-primary-600">
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-bold">Total: ${getTotalPrice()}</span>
                      </div>
                      <button 
                        onClick={() => setShowPaymentModal(true)} 
                        className="w-full btn-primary py-3"
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "orders" && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">My Orders</h2>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-600 mb-4">Your order history will appear here</p>
                    <button onClick={() => setActiveTab("browse")} className="btn-primary">
                      Start Ordering
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold">Order #{order.id}</h3>
                            <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">${order.total}</p>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === "delivered" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="mb-3">
                          <p className="text-sm text-gray-600">Items: {order.items.map(i => i.name).join(", ")}</p>
                        </div>
                        <button 
                          onClick={() => trackOrder(order.id)} 
                          className="btn-primary text-sm px-3 py-1"
                        >
                          Track Order
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "profile" && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Profile</h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-20 w-20 rounded-full" />
                    <div>
                      <h3 className="text-xl font-semibold">{user.name}</h3>
                      <p className="text-gray-600">{user.email}</p>
                      <p className="text-sm text-gray-500">
                        Customer since {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input type="text" value={user.name} className="input-field" readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input type="email" value={user.email} className="input-field" readOnly />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Payment</h2>
              <button onClick={() => setShowPaymentModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <Plus className="h-6 w-6 rotate-45 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              {paymentErrors.general && <p className="text-red-500 text-sm">{paymentErrors.general}</p>}
              {paymentErrors.card && <p className="text-red-500 text-sm">{paymentErrors.card}</p>}
              {paymentErrors.upi && <p className="text-red-500 text-sm">{paymentErrors.upi}</p>}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      value="card" 
                      checked={paymentMethod === "card"} 
                      onChange={() => setPaymentMethod("card")} 
                      className="mr-2" 
                    />
                    Card
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      value="upi" 
                      checked={paymentMethod === "upi"} 
                      onChange={() => setPaymentMethod("upi")} 
                      className="mr-2" 
                    />
                    UPI
                  </label>
                </div>
              </div>

              {paymentMethod === "card" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input 
                        type="text" 
                        name="cardNumber" 
                        value={paymentDetails.cardNumber} 
                        onChange={handlePaymentChange} 
                        placeholder="1234 5678 9012 3456" 
                        className="input-field pl-10" 
                        required 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <input 
                        type="text" 
                        name="expiry" 
                        value={paymentDetails.expiry} 
                        onChange={handlePaymentChange} 
                        placeholder="MM/YY" 
                        className="input-field" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input 
                        type="text" 
                        name="cvv" 
                        value={paymentDetails.cvv} 
                        onChange={handlePaymentChange} 
                        placeholder="123" 
                        className="input-field" 
                        required 
                      />
                    </div>
                  </div>
                </>
              )}

              {paymentMethod === "upi" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input 
                      type="text" 
                      name="upiId" 
                      value={paymentDetails.upiId} 
                      onChange={handlePaymentChange} 
                      placeholder="yourname@upi" 
                      className="input-field pl-10" 
                      required 
                    />
                  </div>
                </div>
              )}

              <div className="text-center text-sm text-gray-600 mb-4">
                Total Amount: ${getTotalPrice()}
              </div>
              <button type="submit" className="w-full btn-primary py-3">
                Pay Now
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tracking Modal */}
      {showTrackingModal && trackingOrderId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 overflow-y-auto max-h-[80vh]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Track Order #{trackingOrderId}</h2>
              <button onClick={() => setShowTrackingModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <Plus className="h-6 w-6 rotate-45 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <p><strong>Order Date:</strong> {new Date(orders.find(o => o.id === trackingOrderId)?.createdAt).toLocaleString()}</p>
                <p><strong>Total:</strong> ${orders.find(o => o.id === trackingOrderId)?.total}</p>
                <p><strong>Items:</strong></p>
                <ul className="list-disc pl-5">
                  {orders.find(o => o.id === trackingOrderId)?.items.map((item, index) => (
                    <li key={index}>{item.name} (x{item.quantity}) - ${item.price}</li>
                  ))}
                </ul>
              </div>

              <div className="relative pt-1">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div 
                    style={{ width: `${getProgress(orders.find(o => o.id === trackingOrderId)?.status)}%` }} 
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
                  ></div>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> {orders.find(o => o.id === trackingOrderId)?.status || "pending"}</span>
                <span>Estimated Delivery: 30 min</span>
              </div>
              <p className="text-gray-600">Your order is being processed. Updates will appear here automatically.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}