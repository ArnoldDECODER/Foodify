// Import React and hooks for state and side effects
import React, { useState, useEffect } from "react";
// Import CSS for styling the carousel
import "./Carousel.css";
// Import Material-UI icons for favourite functionality
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
// Import Redux hooks for state management and dispatching actions
import { useDispatch, useSelector } from "react-redux";
// Import actions from the favourites slice for adding/removing favourites
import { addTofavouritelists, removeFavouriteItem } from "./favouritesSlice";
// Import Link from React Router for navigation to recipe details
import { Link } from "react-router-dom";
// Import CSS for styling the homepage layout
import "./Homepage.css";

// Define the Carousel component, which serves as the homepage
const Carousel = () => {
  // State to store the list of recipes fetched from recipes.json
  const [recipes, setRecipes] = useState([]);
  // State to track the current index of the carousel for sliding
  const [index, setIndex] = useState(0);
  // Get the dispatch function to send actions to the Redux store
  const dispatch = useDispatch();
  // Use useSelector to get the favouriteItems array from the Redux store
  const favouriteItems = useSelector((state) => state.favouritelist.favouriteItems);

  // useEffect hook to fetch recipes when the component mounts
  useEffect(() => {
    // Fetch the recipes.json file from the public folder
    // NOTE: This fails if recipes.json isn’t in public/ or is malformed
    // The old code worked, so check if recipes.json was moved/deleted after Git setup
    fetch("/recipes.json")
      .then((response) => response.json()) // Convert the response to JSON - fails if response is HTML (e.g., 404 page)
      .then((data) => setRecipes(data)) // Store the recipes in state - only works if JSON is valid
      .catch((error) => console.error("Error fetching recipes:", error)); // Logs "Unexpected token '<'" if HTML is returned
  }, []); // Empty dependency array means this runs once on mount

  // Calculate the total number of slides based on the number of recipes
  const totalSlides = recipes.length;

  // Function to move to the next slide in the carousel
  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % totalSlides); // Increment index, loop back to 0 if at end
  };

  // Function to move to the previous slide in the carousel
  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides); // Decrement index, loop to end if at 0
  };

  // Function to determine which 3 recipes to display in the carousel
  const getDisplayedImages = () => {
    if (recipes.length === 0) return []; // Return empty array if no recipes are loaded - happens if fetch fails
    return [
      recipes[(index + totalSlides) % totalSlides], // Current recipe (handles wrap-around)
      recipes[(index + 1) % totalSlides], // Next recipe
      recipes[(index + 2) % totalSlides], // Third recipe
    ];
  };

  // Function to check if a recipe is already in the favourites list
  const isFavorite = (recipe) => {
    return favouriteItems.some((item) => item.id === recipe.id); // Return true if recipe ID matches any favourite
  };

  // Function to toggle a recipe's favourite status
  const toggleFavourite = (recipe) => {
    if (isFavorite(recipe)) {
      dispatch(removeFavouriteItem(recipe.id)); // Remove from favourites if already favourited
    } else {
      dispatch(addTofavouritelists(recipe)); // Add to favourites if not favourited
    }
  };

  // Show a loading message if recipes haven't loaded yet
  // NOTE: This persists if fetch fails (e.g., due to missing recipes.json)
  if (recipes.length === 0) return <p>Loading trending recipes...</p>;

  // Render the homepage with a welcome message and carousel
  return (
    // Outer container for the homepage with styling from Homepage.css
    <div className="homepage">
      {/* Welcome heading for the page */}
      <h1 className="welcome-text">Welcome to Foodify</h1>
      {/* Subheading introducing the trending recipes */}
      <p className="trending-text">Here are your trending recipes</p>
      {/* Container for the carousel with navigation arrows */}
      <div className="carousel-container">
        {/* Left arrow button to move to the previous slide */}
        <button className="arrow arrow-left" onClick={prevSlide}>
          ❮ {/* Unicode left arrow symbol */}
        </button>
        {/* Inner container for the sliding recipe cards */}
        <div className="carousel">
          {/* Map over the 3 displayed recipes to create cards */}
          {getDisplayedImages().map((recipe, idx) => (
            // Individual recipe card with a key based on index
            <div key={idx} className="trending-recipe">
              {/* Recipe image with alt text for accessibility */}
              <img src={recipe.image} alt={recipe.title} />
              {/* Recipe title */}
              <h3>{recipe.title}</h3>
              {/* Container for the View Recipe and Favourite buttons */}
              <div className="button-wrapper">
                {/* Link to navigate to the detailed recipe page */}
                <Link to={`/recipe/${recipe.id}`}>
                  {/* Button to view the full recipe */}
                  <button className="button-container">View Recipe</button>
                </Link>
                {/* Button to toggle favourite status */}
                <button onClick={() => toggleFavourite(recipe)}>
                  {/* Conditional rendering: show filled heart if favourited, outline if not */}
                  {isFavorite(recipe) ? (
                    <FavoriteIcon style={{ color: "black" }} /> // Black filled heart for favourited
                  ) : (
                    <FavoriteBorderIcon /> // Outline heart for not favourited
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Right arrow button to move to the next slide */}
        <button className="arrow arrow-right" onClick={nextSlide}>
          ❯ {/* Unicode right arrow symbol */}
        </button>
      </div>
    </div>
  );
};

// Export the Carousel component as the default export (used as the homepage)
export default Carousel;