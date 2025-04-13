import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFavouriteItem } from "./favouritesSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./Favourite.css";
import { Link } from "react-router-dom";

const Favourites = () => {
  const favouriteItems = useSelector((state) => state.favouritelist.favouriteItems);
  const dispatch = useDispatch();

  return (
    <div className="favourites-container">
      <h1 className="favourites-title">Favourites List</h1>
      <div className="favourites-grid">
        {favouriteItems.length === 0 ? (
          <p className="no-favourites">No favourite recipes yet!</p>
        ) : (
          favouriteItems.map((recipe) => (
            <div key={recipe.id} className="favourite-recipe">
              <img src={recipe.image} alt={recipe.title} className="recipe-image" />
              <h3 className="recipe-title">{recipe.title}</h3>
              <div className="button-wrapper">
                <Link to={`/recipe/${recipe.id}`}>
                  <button className="view-button">View Recipe</button>
                </Link>
                <button
                  onClick={() => dispatch(removeFavouriteItem(recipe.id))}
                  className="remove-button"
                >
                  <FavoriteIcon className="favourite-icon filled" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favourites;