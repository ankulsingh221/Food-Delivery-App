"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Truck, MapPin, DollarSign, Package, LogOut, ToggleLeft, ToggleRight, Star, User } from "lucide-react"

const mockDeliveries = [
  {
    id: "DEL001",
    orderId: "ORD001",
    restaurant: "McDonald's",
    customer: "John Doe",
    pickupAddress: "123 Restaurant St",
    deliveryAddress: "456 Customer Ave",
    amount: 12.97,
    status: "assigned",
    estimatedTime: "15 min",
    distance: "2.3 mi",
  },
]

export default function DeliveryDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("available")
  const [deliveries, setDeliveries] = useState(mockDeliveries)
  const [isAvailable, setIsAvailable] = useState(user.isAvailable || false)

  const acceptDelivery = (deliveryId) => {
    setDeliveries(
      deliveries.map((delivery) => (delivery.id === deliveryId ? { ...delivery, status: "accepted" } : delivery)),
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "assigned":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-blue-100 text-blue-800"
      case "picked_up":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Truck className="h-8 w-8 text-orange-500" />
              <div>
                <h1 className="text-xl font-bold">Delivery Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Availability Toggle */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Available</span>
                <button
                  onClick={() => setIsAvailable(!isAvailable)}
                  className={`p-1 rounded-full transition-colors duration-200 ${
                    isAvailable ? "text-green-500" : "text-gray-400"
                  }`}
                >
                  {isAvailable ? <ToggleRight className="h-6 w-6" /> : <ToggleLeft className="h-6 w-6" />}
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-8 w-8 rounded-full" />
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">Delivery Partner</p>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Deliveries</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Earnings</p>
                <p className="text-2xl font-bold">$64.50</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary-500" />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rating</p>
                <p className="text-2xl font-bold">4.9</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Distance</p>
                <p className="text-2xl font-bold">23.4 mi</p>
              </div>
              <MapPin className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="card">
              <ul className="space-y-2">
                {[
                  { id: "available", name: "Available Orders", icon: Package },
                  { id: "active", name: "Active Deliveries", icon: Truck },
                  { id: "earnings", name: "Earnings", icon: DollarSign },
                  { id: "profile", name: "Profile", icon: User },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                          activeTab === item.id ? "bg-orange-50 text-orange-700" : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "available" && (
              <div className="card">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Available Orders</h2>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {isAvailable ? "Online" : "Offline"}
                  </div>
                </div>

                {!isAvailable ? (
                  <div className="text-center py-12">
                    <Truck className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">You're currently offline</h3>
                    <p className="text-gray-600 mb-4">Turn on availability to see delivery requests</p>
                    <button
                      onClick={() => setIsAvailable(true)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
                    >
                      Go Online
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {deliveries
                      .filter((d) => d.status === "assigned")
                      .map((delivery) => (
                        <div key={delivery.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-semibold">Order #{delivery.orderId}</h3>
                              <p className="text-gray-600">{delivery.restaurant}</p>
                              <p className="text-sm text-gray-500">
                                {delivery.estimatedTime} • {delivery.distance}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">${delivery.amount}</p>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}
                              >
                                {delivery.status}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-1">Pickup</p>
                              <p className="text-sm text-gray-600 flex items-center">
                                <MapPin className="h-4 w-4 mr-1 text-red-500" />
                                {delivery.pickupAddress}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-1">Delivery</p>
                              <p className="text-sm text-gray-600 flex items-center">
                                <MapPin className="h-4 w-4 mr-1 text-green-500" />
                                {delivery.deliveryAddress}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => acceptDelivery(delivery.id)}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg"
                          >
                            Accept Delivery
                          </button>
                        </div>
                      ))}

                    {deliveries.filter((d) => d.status === "assigned").length === 0 && (
                      <div className="text-center py-12">
                        <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders available</h3>
                        <p className="text-gray-600">New delivery requests will appear here</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {(activeTab === "active" || activeTab === "earnings") && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">{activeTab === "active" ? "Active Deliveries" : "Earnings"}</h2>
                <div className="text-center py-12">
                  <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {activeTab === "active" ? (
                      <Truck className="h-8 w-8 text-gray-400" />
                    ) : (
                      <DollarSign className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
                  <p className="text-gray-600">This feature is under development</p>
                </div>
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
                        Delivery Partner since {new Date(user.createdAt).toLocaleDateString()}
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                      <input type="text" value={user.vehicleType || "bike"} className="input-field" readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <input
                        type="text"
                        value={isAvailable ? "Available" : "Offline"}
                        className="input-field"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
