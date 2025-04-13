# 🍽️ Foodify Website

## 📖 Overview

**Foodify** is a web application built with **React** to help users explore, save, and view recipes. The app features:

- A dynamic homepage with a carousel of trending recipes  
- A search bar to find specific recipes  
- A favourites page to manage saved recipes  
- Detailed recipe pages  

It uses **React Router** for navigation, **Redux** for state management (specifically for favourites), and **Axios** to fetch recipe data from a local `recipes.json` file.

🔗 **Live Website:** [https://foodify-recipies.netlify.app/homepage](https://foodify-recipies.netlify.app/homepage)

---

## ✨ Features

- **Homepage Carousel:**  
  Displays trending recipes, showing 3 at a time on full screens and 1 at a time on small screens. Includes left/right arrow navigation.

- **Favourites:**  
  Add/remove recipes to/from your favourites by tapping the heart icon. Favourites are accessible from the navbar.

- **Search Bar:**  
  Located in the header. If the recipe exists, it links to the details page. If not, a "recipe not available" message is shown.

- **Recipe Details Page:**  
  Displays name, image, ingredients, steps, video, and user comments with ratings.

- **Responsive Design:**  
  Adapts to various screen sizes, simplifying navbar icons for mobile users.

- **Persistent Favourites:**  
  Uses `localStorage` and Redux so favourites are not lost on reload.

- **Recipe Data:**  
  All recipes are stored in `recipes.json` and fetched using **Axios** or the native **Fetch API**.

---

## 🚀 Getting Started

### 🧱 Initial State

When you first visit the site, the main view appears empty (just the navbar).  
Click the **Home icon** (🏠) in the navbar to load the homepage with trending recipes.

---

## ❤️ Using the Favourites Feature

1. Start with an empty favourites list.
2. To **add** a recipe to favourites, click the heart icon on the recipe card.
3. To **remove**, click the heart again (icon toggles).
4. View saved recipes by clicking the **Favourites icon** (❤️) in the navbar.

---

## ⚙️ How It Works

### 🏡 Homepage

- `Homepage.js` fetches recipes from `recipes.json`.
- Displays 3 trending recipes at a time (1 on small screens).
- Includes left/right carousel arrows.
- Each card has a heart icon to add/remove favourites.
- "View Recipe" button navigates to `/recipe/:id`.

### 🔍 Search

- `Header.js` has a live search bar.
- If a match is found, it shows a clickable link to `/recipe/:id`.
- Otherwise, it displays: `"[search term] recipe not available."`

### 📂 Favourites

- `Favourites.js` lists saved recipes using Redux state.
- Users can open details or remove recipes directly.

### 🍽️ Recipe Details

- `RecipeCard.js` uses the `:id` from the URL to load a specific recipe and display its full details.

---

## 🧰 Tech Stack

- **React** – UI framework
- **React Router** – Page navigation
- **Redux Toolkit** – Favourites state management
- **Axios** – API-like requests from local `recipes.json`
- **Material-UI Icons** – Visual icons (hearts, home, search)
- **CSS** – Custom styling (each major component has its own CSS file)

---

## 📁 File Structure and Routes

### 🔗 Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` or `/homepage` | `Homepage.js` | Carousel view of recipes |
| `/favourites` | `Favourites.js` | Grid of saved favourites |
| `/recipe/:id` | `RecipeCard.js` | Full recipe detail page |

### 🗂 JavaScript Files & CSS

| JS File | CSS File | Description |
|---------|----------|-------------|
| `Header.js` | `Header.css` | Navbar with search & nav links |
| `Homepage.js` | `Carousel.css`, `Homepage.css` | Recipe carousel |
| `Favourites.js` | `Favourite.css` | Grid of favourites |
| `Recipe.js` | — | Base for testing recipe fetching |
| `RecipeCard.js` | `RecipeCard.css` | Detailed recipe view |
| `favouritesSlice.js` | — | Redux logic for favourites |
| `store.js` | — | Redux store setup |

---

## 📊 Data

### `recipes.json`

- JSON file storing all recipe data: `id`, `title`, `image`, `ingredients`, `steps`
- Used by `Header.js`, `Homepage.js`, `RecipeCard.js` with Axios or Fetch API

---

## 🛠️ Installation and Setup

Clone the repository:
```bash
git clone https://github.com/arnolddecoder/Foodify-website.git
