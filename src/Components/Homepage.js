import React, { useState, useEffect } from "react";
import "./Carousel.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { addTofavouritelists, removeFavouriteItem } from "./favouritesSlice";
import { Link } from "react-router-dom";
import "./Homepage.css";

const Carousel = () => {
  const [recipes, setRecipes] = useState([]);
  const [index, setIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const dispatch = useDispatch();
  const favouriteItems = useSelector((state) => state.favouritelist.favouriteItems);

  // Update screen size state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch("/recipes.json")
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  const totalSlides = recipes.length;

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const getDisplayedImages = () => {
    if (recipes.length === 0) return [];
    if (isSmallScreen) {
      // On small screens, return only 1 recipe
      return [recipes[index]];
    } else {
      // On big screens, return 3 recipes
      return [
        recipes[(index + totalSlides) % totalSlides],
        recipes[(index + 1) % totalSlides],
        recipes[(index + 2) % totalSlides],
      ];
    }
  };

  const isFavorite = (recipe) => {
    return favouriteItems.some((item) => item.id === recipe.id);
  };

  const toggleFavourite = (recipe) => {
    if (isFavorite(recipe)) {
      dispatch(removeFavouriteItem(recipe.id));
    } else {
      dispatch(addTofavouritelists(recipe));
    }
  };

  if (recipes.length === 0) return <p>Loading trending recipes...</p>;

  return (
    <div className="homepage">
      <h1 className="welcome-text">Welcome to Foodify</h1>
      <p className="trending-text">Here are your trending recipes</p>
      <div className="carousel-section">
        <button className="arrow arrow-left" onClick={prevSlide}>
          ❮
        </button>
        <div className="carousel">
          {getDisplayedImages().map((recipe, idx) => (
            <div key={idx} className="trending-recipe">
              <img src={recipe.image} alt={recipe.title} className="recipe-image" />
              <h3 className="recipe-title">{recipe.title}</h3>
              <div className="button-wrapper">
                <Link to={`/recipe/${recipe.id}`}>
                  <button className="view-button">View Recipe</button>
                </Link>
                <button onClick={() => toggleFavourite(recipe)} className="favourite-button">
                  {isFavorite(recipe) ? (
                    <FavoriteIcon className="favourite-icon filled" />
                  ) : (
                    <FavoriteBorderIcon className="favourite-icon" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="arrow arrow-right" onClick={nextSlide}>
          ❯
        </button>
      </div>

      <section className="all-recipes-section">
        <h2 className="section-title">Here are our best tasty recipes, enjoy</h2>
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.title} className="recipe-image" />
              <h3 className="recipe-title">{recipe.title}</h3>
              <div className="button-wrapper">
                <Link to={`/recipe/${recipe.id}`}>
                  <button className="view-button">View Recipe</button>
                </Link>
                <button onClick={() => toggleFavourite(recipe)} className="favourite-button">
                  {isFavorite(recipe) ? (
                    <FavoriteIcon className="favourite-icon filled" />
                  ) : (
                    <FavoriteBorderIcon className="favourite-icon" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Carousel;