import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';

const Header: React.FC = () => {
  const selectedRecipes = useRecipeStore(state => state.selectedRecipes);

  return (
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link to="/" className="hover:text-blue-200">
              My Recipes
            </Link>
          </div>
          <nav>
            <ul className="flex gap-4">
              <li>
                <Link
                    to="/"
                    className="hover:bg-blue-500 px-3 py-2 rounded-md transition"
                >
                  All Recipes
                </Link>
              </li>
              <li className="relative">
                <Link
                    to="/selected"
                    className="hover:bg-blue-500 px-3 py-2 rounded-md transition"
                >
                  Selected Recipes
                </Link>
                {selectedRecipes.length > 0 && (
                    <span className="absolute top-0 bg-red-500 text-white text-xs rounded-full px-1">
                  {selectedRecipes.length}
                </span>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
  );
};

export default Header;
