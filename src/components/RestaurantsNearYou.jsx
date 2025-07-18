import React, { useState } from 'react';
import '../styles/RestaurantsNearYou.css';

const RestaurantsNearYou = () => {
  const [restaurants, setRestaurants] = useState([
    { id: 1, name: 'McDonald\'s', rating: 4.0, time: '20-30 min', tags: 'Fast food', isWishlisted: false },
    { id: 2, name: 'Pizza Hut', rating: 4.2, time: '30-40 min', tags: 'Pizza', isWishlisted: false },
    { id: 3, name: 'Subway', rating: 4.1, time: '15-25 min', tags: 'Sandwiches', isWishlisted: false },
    { id: 4, name: 'KFC', rating: 4.0, time: '25-35 min', tags: 'Fried Chicken', isWishlisted: false },
    { id: 5, name: 'Starbucks', rating: 4.3, time: '10-20 min', tags: 'Coffee', isWishlisted: false },
    { id: 6, name: 'Chipotle', rating: 4.4, time: '20-30 min', tags: 'Mexican', isWishlisted: false },
  ]);

  const [selectedFilter, setSelectedFilter] = useState('All');

  const toggleWishlist = (id) => {
    setRestaurants((prevRestaurants) =>
      prevRestaurants.map((restaurant) =>
        restaurant.id === id
          ? { ...restaurant, isWishlisted: !restaurant.isWishlisted }
          : restaurant
      )
    );
  };

  const filteredRestaurants = selectedFilter === 'All'
    ? restaurants
    : restaurants.filter((restaurant) => restaurant.tags === selectedFilter);

  const filters = ['All', ...new Set(restaurants.map((r) => r.tags))];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    return (
      <>
        {[...Array(fullStars)].map((_, i) => <span key={i}>★</span>)}
        {halfStar ? <span>½</span> : null}
        {[...Array(5 - fullStars - halfStar)].map((_, i) => <span key={i + fullStars + halfStar}>☆</span>)}
      </>
    );
  };

  return (
    <div className="restaurants-container">
      <div className="header">
        <h2>Restaurants near you</h2>
        <div className="subheader">
          <span className="icon">●</span>
          <button className="new-button">New</button>
          <span className="discover">Discover new flavors and cuisine</span>
        </div>
      </div>
      <div className="filters">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter-button ${selectedFilter === filter ? 'active' : ''}`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="grid">
        {filteredRestaurants.map((restaurant) => (
          <a
            key={restaurant.id}
            href={`/restaurant/${restaurant.id}`}
            className="card-link"
          >
            <div className="card">
              <div className="image-placeholder"></div>
              <div className="info">
                <h3>{restaurant.name}</h3>
                <div className="details">
                  <span className="rating">
                    {restaurant.rating} {renderStars(restaurant.rating)}
                  </span>
                  <span className="time">• {restaurant.time}</span>
                  {restaurant.tags && <span className="tags">• {restaurant.tags}</span>}
                </div>
              </div>
              <span
                className={`wishlist-icon ${restaurant.isWishlisted ? 'wishlisted' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // Prevent bubbling to parent link
                  toggleWishlist(restaurant.id);
                }}
              >
                ♥
              </span>
            </div>
          </a>
        ))}
      </div>
      <button className="view-all">View all restaurants</button>
    </div>
  );
};

export default RestaurantsNearYou;