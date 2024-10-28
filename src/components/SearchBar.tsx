import { HiSearch, HiX } from 'react-icons/hi';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onClear,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="search"
        className="block text-gray-800 font-semibold mb-2"
      >
        Search Recipes:
      </label>
      <div className="relative">
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Type to search..."
          className="w-full p-3 pl-10 pr-10 border rounded-lg bg-gray-200 text-gray-900
                               focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300
                               hover:bg-gray-300"
        />
        <HiSearch className="absolute left-3 top-3 w-5 h-5 text-gray-600 pointer-events-none" />
        {searchTerm && (
          <button
            onClick={onClear}
            className="absolute right-3 top-3 text-gray-600 hover:text-gray-900"
          >
            <HiX className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
