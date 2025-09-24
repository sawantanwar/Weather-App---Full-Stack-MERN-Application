import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function CityFavoriteToggle({ isFavorite, toggleFavorite }) {
  return (
    <button
      onClick={toggleFavorite}
      className={`text-2xl focus:outline-none transition-colors duration-300 ${
        isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
      }`}
      aria-label="Toggle favorite city"
    >
      {isFavorite ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}


