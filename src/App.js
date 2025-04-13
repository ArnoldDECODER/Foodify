import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';  
import Homepage from './Components/Homepage';
import Favourites from './Components/Favourites';
import Header from './Components/Layout/Header';
// import RecipeDetails from './Components/Layout/RecipeDetails';
import Recipe from './Components/Layout/Recipe';
import RecipeCard from "./Components/RecipeCard";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {/* 
            As a best practice for user experience, we redirect from the root path ("/") to "/homepage".
            This ensures that when users visit http://localhost:3000/, they are automatically routed to the homepage component,
            maintaining consistent navigation behavior across the app.
          */}
          <Route path="/" element={<Navigate to="/homepage" replace />} />

          <Route path="/homepage" element={<Homepage />} />
          <Route path="/favourites" element={<Favourites />} />
          {/* <Route path="/homepage/:id" element={<RecipeDetails />} /> */}
          <Route path="/homepage/recipe" element={<Recipe />} />
          <Route path="/recipe/:id" element={<RecipeCard />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
