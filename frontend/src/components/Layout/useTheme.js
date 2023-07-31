import React, { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState("");

  // Function to toggle between dark and light themes
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      document.documentElement.style.backgroundColor = "white";
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      document.documentElement.style.backgroundColor = "#0E162A";
    }
  };

  // On page load or when changing themes, set the initial theme based on user preference or local storage
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      document.documentElement.style.backgroundColor = "#0E162A";
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      document.documentElement.style.backgroundColor = "white";
    }
  }, []);

  // Update the local storage whenever the theme is changed
  useEffect(() => {
    localStorage.theme = theme;
  }, [theme]);

  // Whenever the user explicitly chooses to respect the OS preference, remove the theme from local storage
  const respectOsPreference = () => {
    localStorage.removeItem("theme");
  };

  return { theme, toggleTheme, respectOsPreference };
};

export default useTheme;
