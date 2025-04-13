import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./RecipeCard.css";
import { useDispatch, useSelector } from "react-redux";
import { addTofavouritelists, removeFavouriteItem } from "./favouritesSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const RecipeCard = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const favouriteItems = useSelector((state) => state.favouritelist.favouriteItems);

  useEffect(() => {
    fetch("/recipes.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedRecipe = data.find((recipe) => recipe.id === parseInt(id));
        setRecipe(selectedRecipe);
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, [id]);

  if (!recipe) return <p>Loading recipe details...</p>;

  const isFavorite = (recipe) => favouriteItems.some((item) => item.id === recipe.id);

  const toggleFavourite = (recipe) => {
    if (isFavorite(recipe)) {
      dispatch(removeFavouriteItem(recipe.id));
    } else {
      dispatch(addTofavouritelists(recipe));
    }
  };

  const extractVideoId = (url) => {
    const regex = /(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleAddComment = () => {
    if (!name || !newComment || rating === 0) {
      alert("Please enter your name, a comment, and a rating.");
      return;
    }

    const newEntry = {
      name,
      rating,
      text: newComment,
    };

    setComments([...comments, newEntry]);
    setName('');
    setNewComment('');
    setRating(0);
  };

  const handleDeleteComment = (index) => {
    if (window.confirm("Delete this comment?")) {
      setComments(comments.filter((_, i) => i !== index));
    }
  };

  const handleRatingChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value <= 5) {
      setRating(value);
    }
  };

  const videoId = recipe.videoUrl ? extractVideoId(recipe.videoUrl) : null;

  return (
    <div className="recipe-card-container">
      <div className="recipe-card">
        <h1 className="recipe-title">{recipe.title}</h1>

        <img
          src={recipe.image.startsWith("/") ? recipe.image : `/${recipe.image}`}
          alt={recipe.title}
          className="recipe-image"
        />

        {/* Favourite above ingredients */}
        <div className="favourite-section">
          <button onClick={() => toggleFavourite(recipe)} className="favourite-button">
            {isFavorite(recipe) ? (
              <FavoriteIcon className="favourite-icon filled" />
            ) : (
              <FavoriteBorderIcon className="favourite-icon" />
            )}
          </button>
          <span>Add to favourites</span>
        </div>

        <section className="recipe-section">
          <h2 className="section-title">Ingredients:</h2>
          <ul className="ingredient-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </section>

        <section className="recipe-section">
          <h2 className="section-title">Steps:</h2>
          <ol className="step-list">
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </section>

        {/* Video section */}
        {videoId && (
          <section className="recipe-section">
            <h3 className="section-subtitle">
              🎥 You can also watch the video if you're struggling to follow the written steps.
            </h3>
            <div className="video-container">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                className="recipe-video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Recipe Video"
              ></iframe>
            </div>
          </section>
        )}

        {/* Rating + Comment Section */}
        <section className="review-section">
          <h2 className="section-title">Leave a Review</h2>

          {/* Name input */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="review-input"
          />

          {/* Rating input */}
          <div className="rating-stars">
            <label>Your Rating:</label>
            <input
              type="number"
              min="0"
              max="5"
              value={rating}
              onChange={handleRatingChange}
              className="rating-input"
              placeholder="0-5"
            />
            <div className="star-container">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= rating ? "filled" : "empty"}
                >
                  {star <= rating ? <StarIcon /> : <StarBorderIcon />}
                </span>
              ))}
            </div>
          </div>

          {/* Comment input */}
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Tell us about your experience with the recipe. Did you enjoy it? Was it tasty?"
            className="review-textarea"
          ></textarea>

          <button onClick={handleAddComment} className="submit-button">Submit</button>

          {/* Comments list */}
          <div className="comment-list">
            <h3 className="section-title">Comments</h3>
            {comments.length > 0 && (
              <div className="average-rating">
                <span>Average Rating:</span>
                <div className="star-container">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= Math.round(comments.reduce((acc, c) => acc + c.rating, 0) / comments.length)
                          ? "filled"
                          : "empty"
                      }
                    >
                      {star <= Math.round(comments.reduce((acc, c) => acc + c.rating, 0) / comments.length) ? (
                        <StarIcon />
                      ) : (
                        <StarBorderIcon />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {comments.length === 0 ? (
              <p className="no-comments">No comments yet.</p>
            ) : (
              <ul>
                {comments.map((comment, i) => (
                  <li key={i}>
                    <div className="comment-header">
                      <div className="comment-info">
                        <strong>{comment.name}</strong>
                        <div className="comment-rating">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={star <= comment.rating ? "filled" : "empty"}
                            >
                              {star <= comment.rating ? <StarIcon /> : <StarBorderIcon />}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => handleDeleteComment(i)} className="remove-button">
                        Remove
                      </button>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default RecipeCard;