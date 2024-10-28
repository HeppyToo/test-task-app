import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AllRecipes, RecipeDetails, SelectedRecipes } from './page';
import Header from './components/Header';
import { useRecipeStore } from './store/recipeStore';

const App: React.FC = () => {
  const loadRecipes = useRecipeStore(state => state.loadRecipes);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  return (
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<AllRecipes />} />
              <Route path="/recipe/:id" element={<RecipeDetails />} />
              <Route path="/selected" element={<SelectedRecipes />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
};

export default App;
