import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import Homepage from './Components/Homepage';
import Favourites from './Components/Favourites';
import Header from './Components/Layout/Header';
// import RecipeDetails from './Components/Layout/RecipeDetails';
import Recipe from './Components/Layout/Recipe';
import RecipeCard from "./Components/RecipeCard";

const App = () => {
  return (
   
    <Router>
    <Header/>
    <main>
    <Routes>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/favourites" element={<Favourites />} />
        {/* <Route path="/homepage/:id" element={<RecipeDetails />} /> */}
        <Route path="/homepage/recipe" element={<Recipe />} />
        <Route path="/recipe/:id" element={<RecipeCard />} /> {/* Recipe Page */}
      </Routes>
    </main>
    </Router>
    
  );
}

export default App;