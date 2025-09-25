import { useState } from "react";
import { toast } from "react-toastify";

export default function LoginRegisterModal({ onClose, onLogin }) {
  const [mode, setMode] = useState("login");
  const [loginData, setLoginData] = useState({ em: "", pw: "" });
  const [regData, setRegData] = useState({ nm: "", em: "", pw: "" });

  const BASE_URL="https://weather-app-tau-two-94.vercel.app";   // used for vercel link

  const handleLoginChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleRegChange = (e) =>
    setRegData({ ...regData, [e.target.name]: e.target.value });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.err || "Login failed");

      toast.success("Logged in successfully");
      localStorage.setItem("token", data.token);
      onLogin(data.user);
      onClose();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleRegSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.err || "Registration failed");

      toast.success("Registered successfully, please login");
      setMode("login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-md p-8 max-w-sm w-full relative">
        {mode === "login" ? (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Login</h2>
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                name="em"
                placeholder="Email"
                value={loginData.em}
                onChange={handleLoginChange}
                required
                className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <input
                type="password"
                name="pw"
                placeholder="Password"
                value={loginData.pw}
                onChange={handleLoginChange}
                required
                className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <button
                type="submit"
                className="bg-cyan-600 py-2 rounded hover:bg-cyan-700 transition"
              >
                Login
              </button>
            </form>
            <div className="mt-4 text-gray-600 dark:text-gray-400 text-center">
              Don't have an account?{" "}
              <button
                className="text-cyan-600 dark:text-cyan-400 underline"
                onClick={() => setMode("register")}
              >
                Register
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Register</h2>
            <form onSubmit={handleRegSubmit} className="flex flex-col gap-4" autoComplete="off">
              <input
                type="text"
                name="nm"
                placeholder="Name"
                value={regData.nm}
                onChange={handleRegChange}
                required
                className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <input
                type="email"
                name="em"
                placeholder="Email"
                value={regData.em}
                onChange={handleRegChange}
                required
                className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <input
                type="password"
                name="pw"
                placeholder="Password"
                value={regData.pw}
                onChange={handleRegChange}
                required
                className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <button
                type="submit"
                className="bg-cyan-600 py-2 rounded hover:bg-cyan-700 transition"
              >
                Register
              </button>
            </form>
            <div className="mt-4 text-gray-600 dark:text-gray-400 text-center">
              Already have an account?{" "}
              <button
                className="text-cyan-600 dark:text-cyan-400 underline"
                onClick={() => setMode("login")}
              >
                Login
              </button>
            </div>
          </>
        )}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none"
          aria-label="Close Login/Register Modal"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

