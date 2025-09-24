export default function ThemeToggle({ darkMode, toggleDarkMode }) {
  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
      className="w-14 h-7 rounded-full p-1 flex items-center bg-gray-300 dark:bg-gray-700 relative cursor-pointer transition-colors duration-300"
    >
      <div
        className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
          darkMode ? "translate-x-7" : "translate-x-0"
        }`}
      />
      <span className="sr-only">Toggle Dark Mode</span>
    </button>
  );
}

