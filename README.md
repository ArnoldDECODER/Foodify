# Foodify Website

## Overview

Foodify is a web application built with React that allows users to explore, search, save, and view recipes. It features a dynamic homepage with a carousel of trending recipes, a real-time search bar, a favourites page, and detailed recipe views. The application uses React Router for navigation, Redux for managing favourites, and Axios for fetching data from a local `recipes.json` file.

🟢 **Live Site:** [Foodify Website](https://your-netlify-link-here)

---

## Features

- **Homepage Carousel:** Displays trending recipes (3 at a time on large screens, 1 at a time on small screens). Users can navigate using arrow buttons.
- **Favourites:** Tap the heart icon to add/remove recipes. Stored in Redux with localStorage for persistence.
- **Search Bar:** Located in the header. Searches `recipes.json` and shows matching recipes or a "recipe not available" message.
- **Recipe Details:** Click "View Recipe" to see full details like image, ingredients, steps, and video guide.
- **Responsive Design:** Fully responsive layout with icon-only navbar on smaller screens.
- **Persistent Favourites:** Favourites are retained after page reload using `localStorage`.
- **Rating and Comments:** Users can rate and comment on recipes, view their own comments, and delete them with confirmation prompts.
- **YouTube Video Integration:** Each recipe includes an embedded video for visual guidance.

---

## Getting Started

### Initial State

When first opened, the app displays only the navbar. To view content:

1. Click the **Homepage icon** (house icon) in the navbar.

### Using the Favourites Feature

- Favourites start empty.
- Tap the heart icon on a recipe to add it.
- Tap again to remove it.
- View saved recipes by clicking the **Favourites icon** (heart icon) in the navbar.

---

## How It Works

### Homepage

- Component: `Homepage.js`
- Fetches data from `recipes.json`.
- Displays trending recipes in a sliding carousel.
- Users can favourite recipes or click "View Recipe" for details.

### Search

- Located in `Header.js`
- Filters recipes in real-time.
- Displays matching recipes with thumbnail and clickable links.
- Shows a "recipe not available" message if not found.

### Favourites

- Component: `Favourites.js`
- Displays all saved recipes from Redux state.
- Allows users to remove recipes or navigate to recipe details.

### Recipe Details

- Component: `RecipeCard.js`
- Uses `:id` from the URL to fetch the correct recipe from `recipes.json`.
- Shows image, ingredients, steps, video, ratings, and comments.

---

## Tech Stack

- **React:** Frontend framework.
- **React Router:** Page navigation.
- **Redux Toolkit:** State management for favourites.
- **Axios:** Fetching recipes from local JSON.
- **Material-UI Icons:** Icons for UI elements.
- **CSS:** Custom styles for components.

---

## File Structure & Routes

### Routes

| Route             | Component       | Description                                |
|------------------|-----------------|--------------------------------------------|
| `/` or `/homepage` | `Homepage.js`   | Carousel with trending recipes             |
| `/favourites`     | `Favourites.js` | Saved recipes                              |
| `/recipe/:id`     | `RecipeCard.js` | Full recipe details                        |

### Key Files

- `Header.js` (`Header.css`) – Navbar with logo, search bar, and nav icons.
- `Homepage.js` (`Homepage.css`, `Carousel.css`) – Displays carousel of recipes.
- `Favourites.js` (`Favourite.css`) – Shows saved favourites in grid layout.
- `RecipeCard.js` (`RecipeCard.css`) – Recipe details, ratings, and comments.
- `favouritesSlice.js` – Redux slice for managing favourites.
- `store.js` – Redux store setup.
- `recipes.json` – Stores all recipe data.

---

## Installation & Setup

Clone the repo:
```bash
git clone https://github.com/arnolddecoder/Foodify-website.git
Navigate to project directory:

bash
Copy
Edit
cd Foodify-website
Install dependencies:

bash
Copy
Edit
npm install
Run the app locally:

bash
Copy
Edit
npm start
Visit http://localhost:3000 to view the app.

Additional Notes
Each main component has its own .css file for styling.

Axios is used in some components (e.g., Recipe.js) while others use the native fetch API.

The UI adapts based on screen size, simplifying icons and layout for mobile users.

Future Improvements
Autoload Homepage: Ensure the homepage loads automatically when visiting the Netlify link.

Firebase Integration: Store data in Firebase and implement user authentication.

Enhanced Responsiveness: Improve accessibility and layout flexibility for all devices.

Live Demo
👉 Visit the Live Website

Recent Updates
Improved Search UI: Displays result name with thumbnail, or a friendly message if not found.

Ratings & Comments: Users can leave comments and rate recipes. Deleting comments requires confirmation.

Video Integration: Each recipe includes a YouTube video walkthrough.

Updated Styling: Better visuals across homepage and recipe details.
