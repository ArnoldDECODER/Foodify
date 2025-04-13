import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    fetch("/recipes.json")
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setSearchResult(null);
      return;
    }

    const matchedRecipe = recipes.find((recipe) =>
      recipe.title.toLowerCase().includes(value.toLowerCase())
    );

    if (matchedRecipe) {
      setSearchResult({ found: true, recipe: matchedRecipe });
    } else {
      setSearchResult({ found: false, message: `${value} recipe is not available` });
    }
  };

  return (
    <header>
      <nav>
        <div className="logo-area">
          <h1 className="logo-text">
            <span>
              <RestaurantIcon />
            </span>
            Foodify
          </h1>
        </div>

        <div className="search-area">
          <div className="tooltip">
            <span>
              <SearchIcon />
            </span>
            <span className="tooltip-text">Search</span>
          </div>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchResult && (
            <div className="search-feedback">
              {searchResult.found ? (
                <NavLink to={`/recipe/${searchResult.recipe.id}`}>
                  Found: {searchResult.recipe.title}
                </NavLink>
              ) : (
                <p>{searchResult.message}</p>
              )}
            </div>
          )}
        </div>

        <div className="navbar-icons">
          <div className="tooltip">
            <NavLink activeClassName="active" to="/homepage">
              <span className="icon">
                <HomeIcon />
              </span>
              <span className="text">Home</span>
              <span className="tooltip-text">Homepage</span>
            </NavLink>
          </div>

          <div className="tooltip">
            <NavLink activeClassName="active" to="/favourites">
              <span className="icon">
                <FavoriteIcon />
              </span>
              <span className="text">Favourites</span>
              <span className="tooltip-text">Favourites</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;