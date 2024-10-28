import React, { useCallback } from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  const handleCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onCategoryChange(e.target.value);
    },
    [onCategoryChange],
  );

  return (
    <div className="mb-6">
      <label
        htmlFor="category"
        className="block text-gray-800 font-semibold mb-2"
      >
        Filter by Category:
      </label>
      <div className="relative">
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="block w-full px-4 pt-3 pb-4 bg-gray-200 text-gray-900 rounded-lg border border-gray-300
                               focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300
                               hover:bg-gray-300 focus:outline-none"
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CategoryFilter;
