import React from "react";
import useTheme from "./useTheme";

const ThemeToggleIcon = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      id="theme-toggle"
      type="button"
      className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-2xl py-1 px-3"
    >
      {theme === "light" ? (
        <i className="bx bxs-sun"></i>
      ) : (
        <i className="bx bxs-moon"></i>
      )}
    </button>
  );
};

export default ThemeToggleIcon;
