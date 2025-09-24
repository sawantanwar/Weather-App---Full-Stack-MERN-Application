import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";
import WeatherSummary from "./WeatherSummary";
import HourlyForecast from "./HourlyForecast";
import { toast } from "react-toastify";

export default function WeatherApp({
  darkMode,
  toggleDarkMode,
  tempUnitCelsius,
  toggleTempUnit,
  user,
  onLoginNeeded,
}) {
  const [city, setCity] = useState("pune");
  const [weatherData, setWeatherData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const fetchWeather = async (q) => {
    try {
      setLoading(true);
      setErrorMsg("");
      const res = await fetch(`/api/weather?q=${encodeURIComponent(q)}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.err || "Failed to fetch weather");
      }
      const data = await res.json();
      setWeatherData(data);
      setHourlyData([
        {
          time: "12:00 pm",
          temp: data.main.temp,
          condition: data.weather[0].main,
          icon: data.weather[0].icon,
          desc: data.weather[0].description,
        },
        { time: "03:00 pm", temp: data.main.temp - 2, condition: "Clouds", icon: "03d", desc: "Overcast Clouds" },
        { time: "06:00 pm", temp: data.main.temp - 4, condition: "Clouds", icon: "03d", desc: "Overcast Clouds" },
        { time: "09:00 pm", temp: data.main.temp - 5, condition: "Clouds", icon: "03d", desc: "Overcast Clouds" },
        { time: "12:00 am", temp: data.main.temp - 6, condition: "Clouds", icon: "03d", desc: "Overcast Clouds" },
      ]);
    } catch (err) {
      setErrorMsg("LOCATION NOT FOUND OPPS!");
      setWeatherData(null);
      setHourlyData([]);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
    if (user) fetchFavorites();
  }, [city, user]);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch("/api/favs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to load favorites");
      const data = await res.json();
      setFavorites(data);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const toggleFavoriteCity = async () => {
    if (!user) {
      onLoginNeeded();
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        onLoginNeeded();
        return;
      }
      if (favorites.includes(city)) {
        const res = await fetch("/api/favs", {
          method: "DELETE",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ cty: city }),
        });
        if (res.ok) {
          setFavorites(favorites.filter((f) => f !== city));
          toast.success(`${city} removed from favorites`);
        } else throw new Error("Failed to remove favorite");
      } else {
        const res = await fetch("/api/favs", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ cty: city }),
        });
        if (res.ok) {
          setFavorites([...favorites, city]);
          toast.success(`${city} added to favorites`);
        } else throw new Error("Failed to add favorite");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  const isFavorite = favorites.includes(city);

  const onSearch = (searchCity) => {
    if (searchCity && searchCity !== city) {
      setCity(searchCity);
      setShowFavorites(false);
    }
  };

  const convertTemp = (temp) => (tempUnitCelsius ? Math.round(temp) : Math.round((temp * 9) / 5 + 32));

  return (
    <>
      <div className="flex flex-col md:flex-row max-w-6xl w-full rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-200 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-700 h-auto max-h-[700px]">
        {/* Left Panel */}
        <div className="flex-1 bg-gradient-to-tr from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 bg-opacity-60 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none flex flex-col p-6 text-gray-900 dark:text-gray-300">
          <div className="flex items-center justify-between space-x-4 mb-6">
            <p
              key={weatherData && (weatherData.id || weatherData.name || Math.random())}
              className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg animate-slide-in-left"
            >
              Weather App
            </p>

            <button
              onClick={() => setShowFavorites((v) => !v)}
              title="Favorites"
              className="flex items-center rounded-full px-6 py-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 shadow-lg cursor-pointer select-none transition hover:scale-105 focus:outline-none"
            >
              <FaStar size={20} className="text-white" />
              <span className="pl-3 text-white font-semibold">Favorites</span>
            </button>

            <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </div>

          <SearchBar onSearch={onSearch} />

          {showFavorites && user && (
            <div className="animate-slide-down pt-3">
              <FavoritesList favorites={favorites} setCity={setCity} />
            </div>
          )}

          <p className="text-center md:text-left text-gray-900 dark:text-gray-100 text-3xl font-bold pt-20 md:pt-[6rem]">
            The Only Weather App You Need!
          </p>
        </div>

        {/* Right Panel */}
        <div className="flex-1 rounded-b-3xl md:rounded-r-4xl md:rounded-bl-none p-6 space-y-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500 overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3 font-semibold text-lg">
              <button
                onClick={toggleFavoriteCity}
                className={`text-3xl focus:outline-none transition-colors duration-300 ${
                  isFavorite ? "text-red-500" : "text-gray-500 dark:text-gray-400 hover:text-red-500"
                }`}
                aria-label="Toggle favorite city"
              >
                {isFavorite ? <FaHeart /> : <FaRegHeart />}
              </button>
              <span className="select-none">{city}</span>
            </div>
            {weatherData && (
              <div className="flex items-center space-x-4">
                <span className="font-bold text-2xl cursor-default select-none">TODAY</span>
                <span className="text-4xl font-bold text-cyan-500 select-none cursor-default">
                  {convertTemp(weatherData.main.temp)}&deg;{tempUnitCelsius ? "C" : "F"}
                </span>
                <label className="inline-flex cursor-pointer items-center relative">
                  <input
                    type="checkbox"
                    checked={tempUnitCelsius}
                    className="sr-only peer"
                    onChange={toggleTempUnit}
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-cyan-600 transition-all duration-300"></div>
                  <div className="absolute left-1 top-[2px] peer-checked:left-[26px] w-5 h-5 rounded-full bg-white dark:bg-gray-800 transition-all duration-300 shadow-md"></div>
                </label>
              </div>
            )}
          </div>

          {loading ? (
            <div className="text-center text-lg animate-pulse text-gray-700 dark:text-gray-300 select-none">
              Loading weather data...
            </div>
          ) : errorMsg ? (
            <div className="text-center flex flex-col items-center justify-center space-y-4 p-4">
              <img
                src="https://static.vecteezy.com/system/resources/previews/026/706/496/non_2x/woman-selecting-place-on-globe-black-white-error-404-flash-message-gps-navigator-on-map-monochrome-empty-state-ui-design-page-not-found-popup-cartoon-image-flat-outline-illustration-concept-vector.jpg"
                alt="Not Found"
                className="w-full h-[28rem] object-cover opacity-40"
              />
              <span className="text-red-600 font-semibold text-xl">{errorMsg}</span>
            </div>
          ) : weatherData ? (
            <>
              <WeatherSummary data={weatherData} convertTemp={convertTemp} tempUnitCelsius={tempUnitCelsius} />
              <HourlyForecast data={hourlyData} convertTemp={convertTemp} tempUnitCelsius={tempUnitCelsius} />
            </>
          ) : (
            <div className="text-center text-lg select-none">No weather data available</div>
          )}
        </div>
      </div>
    </>
  );
}

function FavoritesList({ favorites, setCity }) {
  if (!favorites.length)
    return <div className="mt-4 text-center italic text-cyan-700 dark:text-cyan-400">No favorites added yet</div>;

  return (
    <div className="mt-4 max-h-[350px] overflow-auto bg-cyan-100 dark:bg-gray-800 rounded-xl p-4 shadow-md border border-cyan-300 dark:border-cyan-700 transition-colors duration-300">
      <ul className="space-y-3">
        {favorites.map((fav) => (
          <li
            key={fav}
            onClick={() => setCity(fav)}
            className="flex items-center justify-between px-5 py-3 rounded-lg bg-white dark:bg-cyan-900 shadow hover:shadow-lg active:scale-95 transition transform cursor-pointer text-cyan-900 dark:text-cyan-200 font-semibold select-none"
            title={`View weather for ${fav}`}
          >
            <div className="flex items-center gap-3">
              <FaStar className="text-cyan-600 dark:text-cyan-300" />
              <span>{fav}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
