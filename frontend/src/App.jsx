import { useEffect, useState } from "react";
import WeatherApp from "./components/WeatherApp";
import LoginRegisterModal from "./components/LoginRegisterModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : true;
  });

  const [tempUnitCelsius, setTempUnitCelsius] = useState(true);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-700">
      <WeatherApp
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode((v) => !v)}
        tempUnitCelsius={tempUnitCelsius}
        toggleTempUnit={() => setTempUnitCelsius((v) => !v)}
        user={user}
        onLoginNeeded={() => setShowLoginModal(true)}
        onUserLoggedIn={setUser}
      />
      {showLoginModal && (
        <LoginRegisterModal onClose={() => setShowLoginModal(false)} onLogin={setUser} />
      )}
      <ToastContainer />
    </div>
  );
}

export default App;

