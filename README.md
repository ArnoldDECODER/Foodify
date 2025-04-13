🍲 Foodify Website
Overview
Foodify is a modern web application built with React that helps users explore, save, and view delicious recipes. The app features:

A dynamic homepage with a carousel of trending recipes.

A search bar to find specific recipes.

A favourites page to manage saved recipes.

Detailed recipe pages with ingredients, steps, video guides, ratings, and comments.

The app uses React Router for navigation, Redux for managing favourites, and Axios to fetch data from a local recipes.json file.

👉 Live Demo: Visit the Live Website

🚀 Features
Homepage Carousel
Trending recipes displayed 3 at a time (1 on small screens), with left/right arrow navigation.

Favourites
Tap the heart icon on any recipe to add/remove it from your favourites. Favourites persist using localStorage.

Search Bar
Located in the header. Matches recipe titles and links to detailed pages or shows a "recipe not available" message.

Recipe Details Page
View full recipe details: image, ingredients, steps, video, user comments, and rating system.

Responsive Design
Mobile-friendly layout with simplified icons and scalable content.

Persistent State
Favourites are stored via Redux and saved to localStorage.

Commenting & Ratings
Users can add their name, rating (stars), and comments for each recipe. Deleting a comment prompts confirmation.

YouTube Integration
Each recipe includes a YouTube video guide embedded on the recipe detail page.

📁 File Structure & Routes
🗂️ Routes
Path	Component	Description
/ or /homepage	Homepage.js	Displays recipe carousel
/favourites	Favourites.js	Lists saved recipes
/recipe/:id	RecipeCard.js	Shows selected recipe details
🧩 Components & Styling
JavaScript File	CSS File	Purpose
Header.js	Header.css	Navbar with logo, search, icons
Homepage.js	Carousel.css, Homepage.css	Homepage layout and carousel
Favourites.js	Favourite.css	Grid display of favourites
RecipeCard.js	RecipeCard.css	Detailed recipe view
Recipe.js	—	Loads all recipe data (optional)
favouritesSlice.js	—	Redux logic for favourites
store.js	—	Redux store setup
📦 Getting Started
Clone the repository:
bash
Copy
Edit
git clone https://github.com/arnolddecoder/Foodify-website.git
Navigate to the project directory:
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
Visit http://localhost:3000 to view the app in your browser.

📌 Additional Notes
Each major component has its own .css file for styling.

Both Axios and native fetch API are used for fetching recipes.json.

Fully responsive layout that adapts based on screen size.

Icons simplify on mobile screens for cleaner navigation.

🔮 Future Improvements
Autoload Homepage
Ensure the homepage automatically loads on the Netlify site without needing manual navigation.

Firebase Integration
Use Firebase for real-time data storage and user authentication (login/signup).

Enhanced Responsiveness
Improve accessibility, layout flexibility, and mobile UX.

📢 Recent Updates
Improved Search UI
Search results now display the recipe name and a thumbnail, or a friendly “not available” message.

Ratings & Comments
Users can rate recipes and leave comments with their names. Comments can be removed with confirmation.

YouTube Video Integration
Each recipe includes a video guide to follow along visually.

Updated Styling
Visual improvements to the homepage, search bar, and recipe details page.

