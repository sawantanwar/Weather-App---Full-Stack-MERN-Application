import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-md flex items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg overflow-hidden shadow-lg mb-6"
    >
      <input
        className="flex-grow py-3 px-5 rounded-l-lg text-white placeholder-white/80 outline-none border-none bg-transparent text-lg font-semibold"
        type="text"
        placeholder="Explore cities weather"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="px-5 bg-white/30 hover:bg-white/50 transition-colors duration-300 text-white flex items-center justify-center"
      >
        <FaSearch />
      </button>
    </form>
  );
}

