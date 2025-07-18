import React, { useState, useEffect } from 'react';
import '../styles/RestaurantsNearYou.css';

const RestaurantsNearYou = () => {
  const [restaurants, setRestaurants] = useState([
    { id: 1, name: 'McDonald\'s', rating: 4.0, time: '20-30 min', tags: 'Fast food', isWishlisted: false, image: 'https://www.shutterstock.com/image-photo/ayutthayathailand-mar-232022-mcdonalds-restaurant-260nw-2142997911.jpg' },
    { id: 2, name: 'Pizza Hut', rating: 4.2, time: '30-40 min', tags: 'Pizza', isWishlisted: false, image: 'https://b.zmtcdn.com/data/pictures/chains/6/18051786/fdf5e5079a0352d872204dad39bc0f08.jpg?fit=around|750:500&crop=750:500;*,*' },
    { id: 3, name: 'Subway', rating: 4.1, time: '15-25 min', tags: 'Sandwiches', isWishlisted: false, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUqmr3EQX-gS0WGuiqnO8iNMfe3P7HmX4nJg&s' },
    { id: 4, name: 'KFC', rating: 4.0, time: '25-35 min', tags: 'Fried Chicken', isWishlisted: false, image: 'https://orderserv-kfc-assets.yum.com/15895bb59f7b4bb588ee933f8cd5344a/images/categories/CAT86.jpg?ver=16.55' },
    { id: 5, name: 'Starbucks', rating: 4.3, time: '10-20 min', tags: 'Coffee', isWishlisted: false, image: 'https://b.zmtcdn.com/data/pictures/chains/7/96507/e69b993a5c7d6215135d65abe32aef55.png?fit=around|750:500&crop=750:500;*,*' },
    { id: 6, name: 'Chipotle', rating: 4.4, time: '20-30 min', tags: 'Mexican', isWishlisted: false, image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/0a/64/3d/your-basic-burrito-bowltasty.jpg?w=900&h=500&s=1' },
    { id: 7, name: 'Burger King', rating: 3.9, time: '15-25 min', tags: 'Fast food', isWishlisted: false, image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/18/92/bc/photo1jpg.jpg?w=900&h=500&s=1' },
    { id: 8, name: 'Domino\'s Pizza', rating: 4.1, time: '25-35 min', tags: 'Pizza', isWishlisted: false, image: 'https://www.dominos.jp/media/ulynkgbl/800_550_pz_morequattro.jpg' },
    { id: 9, name: 'Taco Bell', rating: 4.0, time: '10-20 min', tags: 'Mexican', isWishlisted: false, image: 'https://www.thecountrycook.net/wp-content/uploads/2024/11/thumbnail-Taco-Bell-Chili-Cheese-Burrito.jpg' },
    { id: 10, name: 'Dunkin\' Donuts', rating: 4.2, time: '15-25 min', tags: 'Coffee', isWishlisted: false, image: 'https://tedigitalmarketing.com/wp-content/uploads/2019/04/Dunkin2720Donuts20rebrand20-20Big20hit20or20big20mistake.jpg' },
    { id: 11, name: 'Wendy\'s', rating: 3.8, time: '20-30 min', tags: 'Fast food', isWishlisted: false, image: 'https://product-assets.faasos.io/eatsure_cms/production/787976b3-f7be-4acf-86aa-6a5c51bded72.jpg' },
    { id: 12, name: 'Papa John\'s', rating: 4.3, time: '30-40 min', tags: 'Pizza', isWishlisted: false, image: 'https://i.ytimg.com/vi/YBTjHMv1Azs/sddefault.jpg' },
    { id: 13, name: 'Panera Bread', rating: 4.5, time: '20-30 min', tags: 'Sandwiches', isWishlisted: false, image: 'https://source.unsplash.com/featured/?panera,sandwich' },
    { id: 14, name: 'Chick-fil-A', rating: 4.6, time: '15-25 min', tags: 'Fried Chicken', isWishlisted: false, image: 'https://source.unsplash.com/featured/?chickfila,chicken' },
    { id: 15, name: 'Tim Hortons', rating: 4.1, time: '10-20 min', tags: 'Coffee', isWishlisted: false, image: 'https://source.unsplash.com/featured/?timhortons,coffee' },
    { id: 16, name: 'Qdoba', rating: 4.2, time: '20-30 min', tags: 'Mexican', isWishlisted: false, image: 'https://source.unsplash.com/featured/?qdoba,burrito' },
    { id: 17, name: 'In-N-Out Burger', rating: 4.7, time: '15-25 min', tags: 'Fast food', isWishlisted: false, image: 'https://source.unsplash.com/featured/?innout,burger' },
    { id: 18, name: 'Little Caesars', rating: 3.9, time: '25-35 min', tags: 'Pizza', isWishlisted: false, image: 'https://source.unsplash.com/featured/?littlecaesars,pizza' },
    { id: 19, name: 'Jersey Mike\'s', rating: 4.4, time: '20-30 min', tags: 'Sandwiches', isWishlisted: false, image: 'https://source.unsplash.com/featured/?jerseymikes,sandwich' },
    { id: 20, name: 'Popeyes', rating: 4.0, time: '25-35 min', tags: 'Fried Chicken', isWishlisted: false, image: 'https://source.unsplash.com/featured/?popeyes,chicken' },
    { id: 21, name: 'Costa Coffee', rating: 4.3, time: '10-20 min', tags: 'Coffee', isWishlisted: false, image: 'https://source.unsplash.com/featured/?costa,coffee' },
    { id: 22, name: 'Moe\'s Southwest Grill', rating: 4.1, time: '20-30 min', tags: 'Mexican', isWishlisted: false, image: 'https://source.unsplash.com/featured/?moes,burrito' },
    { id: 23, name: 'Shake Shack', rating: 4.5, time: '20-30 min', tags: 'Fast food', isWishlisted: false, image: 'https://source.unsplash.com/featured/?shakeshack,burger' },
    { id: 24, name: 'Sbarro', rating: 3.8, time: '30-40 min', tags: 'Pizza', isWishlisted: false, image: 'https://source.unsplash.com/featured/?sbarro,pizza' },
    { id: 25, name: 'Arby\'s', rating: 4.0, time: '15-25 min', tags: 'Sandwiches', isWishlisted: false, image: 'https://source.unsplash.com/featured/?arbys,sandwich' },
    { id: 26, name: 'Wingstop', rating: 4.2, time: '25-35 min', tags: 'Fried Chicken', isWishlisted: false, image: 'https://source.unsplash.com/featured/?wingstop,chicken' },
    { id: 27, name: 'Peet\'s Coffee', rating: 4.4, time: '10-20 min', tags: 'Coffee', isWishlisted: false, image: 'https://source.unsplash.com/featured/?peets,coffee' },
    { id: 28, name: 'Baja Fresh', rating: 4.3, time: '20-30 min', tags: 'Mexican', isWishlisted: false, image: 'https://source.unsplash.com/featured/?bajafresh,taco' },
    { id: 29, name: 'Five Guys', rating: 4.6, time: '15-25 min', tags: 'Fast food', isWishlisted: false, image: 'https://source.unsplash.com/featured/?fiveguys,burger' },
    { id: 30, name: 'Marco\'s Pizza', rating: 4.1, time: '30-40 min', tags: 'Pizza', isWishlisted: false, image: 'https://source.unsplash.com/featured/?marcos,pizza' },
    { id: 31, name: 'Jimmy John\'s', rating: 4.2, time: '10-20 min', tags: 'Sandwiches', isWishlisted: false, image: 'https://source.unsplash.com/featured/?jimmyjohns,sandwich' },
    { id: 32, name: 'Church\'s Chicken', rating: 3.9, time: '25-35 min', tags: 'Fried Chicken', isWishlisted: false, image: 'https://source.unsplash.com/featured/?churchs,chicken' },
    { id: 33, name: 'Caribou Coffee', rating: 4.3, time: '15-25 min', tags: 'Coffee', isWishlisted: false, image: 'https://source.unsplash.com/featured/?caribou,coffee' },
    { id: 34, name: 'Del Taco', rating: 4.0, time: '20-30 min', tags: 'Mexican', isWishlisted: false, image: 'https://source.unsplash.com/featured/?deltaco,taco' },
    { id: 35, name: 'Whataburger', rating: 4.4, time: '20-30 min', tags: 'Fast food', isWishlisted: false, image: 'https://source.unsplash.com/featured/?whataburger,burger' },
    { id: 36, name: 'Round Table Pizza', rating: 4.2, time: '30-40 min', tags: 'Pizza', isWishlisted: false, image: 'https://source.unsplash.com/featured/?roundtable,pizza' },
    { id: 37, name: 'Firehouse Subs', rating: 4.5, time: '15-25 min', tags: 'Sandwiches', isWishlisted: false, image: 'https://source.unsplash.com/featured/?firehousesubs,sandwich' },
    { id: 38, name: 'Zaxby\'s', rating: 4.1, time: '25-35 min', tags: 'Fried Chicken', isWishlisted: false, image: 'https://source.unsplash.com/featured/?zaxbys,chicken' },
    { id: 39, name: 'Dutch Bros Coffee', rating: 4.6, time: '10-20 min', tags: 'Coffee', isWishlisted: false, image: 'https://source.unsplash.com/featured/?dutchbros,coffee' },
    { id: 40, name: 'El Pollo Loco', rating: 4.0, time: '20-30 min', tags: 'Mexican', isWishlisted: false, image: 'https://source.unsplash.com/featured/?elpolloloco,chicken' },
    { id: 41, name: 'Culver\'s', rating: 4.3, time: '15-25 min', tags: 'Fast food', isWishlisted: false, image: 'https://source.unsplash.com/featured/?culvers,burger' },
    { id: 42, name: 'Blaze Pizza', rating: 4.4, time: '25-35 min', tags: 'Pizza', isWishlisted: false, image: 'https://source.unsplash.com/featured/?blazepizza,pizza' },
    { id: 43, name: 'Potbelly Sandwich Shop', rating: 4.2, time: '20-30 min', tags: 'Sandwiches', isWishlisted: false, image: 'https://source.unsplash.com/featured/?potbelly,sandwich' },
    { id: 44, name: 'Raising Cane\'s', rating: 4.5, time: '15-25 min', tags: 'Fried Chicken', isWishlisted: false, image: 'https://source.unsplash.com/featured/?raisingcanes,chicken' },
    { id: 45, name: 'Biggby Coffee', rating: 4.1, time: '10-20 min', tags: 'Coffee', isWishlisted: false, image: 'https://source.unsplash.com/featured/?biggby,coffee' },
    { id: 46, name: 'Rubio\'s', rating: 4.3, time: '20-30 min', tags: 'Mexican', isWishlisted: false, image: 'https://source.unsplash.com/featured/?rubios,taco' },
    { id: 47, name: 'Jack in the Box', rating: 3.8, time: '15-25 min', tags: 'Fast food', isWishlisted: false, image: 'https://source.unsplash.com/featured/?jackinthebox,burger' },
    { id: 48, name: 'Jet\'s Pizza', rating: 4.2, time: '30-40 min', tags: 'Pizza', isWishlisted: false, image: 'https://source.unsplash.com/featured/?jetspizza,pizza' },
    { id: 49, name: 'Quiznos', rating: 4.0, time: '20-30 min', tags: 'Sandwiches', isWishlisted: false, image: 'https://source.unsplash.com/featured/?quiznos,sandwich' },
    { id: 50, name: 'Boston Market', rating: 4.1, time: '25-35 min', tags: 'Fried Chicken', isWishlisted: false, image: 'https://source.unsplash.com/featured/?bostonmarket,chicken' },
  ]);

  const [selectedFilter, setSelectedFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const restaurantsPerPage = 9; // 3x3 grid

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

  // Pagination logic
  const totalPages = Math.ceil(filteredRestaurants.length / restaurantsPerPage);
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = filteredRestaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter]);

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
        {currentRestaurants.map((restaurant) => (
          <a
            key={restaurant.id}
            href={`/restaurant/${restaurant.id}`}
            className="card-link"
          >
            <div className="card">
              <div className="image-placeholder">
                <img src={restaurant.image} alt={restaurant.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
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
      {/* Pagination */}
      <div className="pagination">
        <button 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>
      <button className="view-all">View all restaurants</button>
    </div>
  );
};

export default RestaurantsNearYou;