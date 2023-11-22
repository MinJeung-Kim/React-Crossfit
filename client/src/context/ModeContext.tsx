import { createContext, useContext, useEffect, useState } from "react";

type State = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  searchMode: boolean;
  setSearchMode: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDarkMode: () => void;
  toggleSearchMode: () => void;
};

const ModeContext = createContext<State>({} as State);

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    updateDarkMode(!darkMode);
  };

  const toggleSearchMode = () => {
    setSearchMode(!searchMode);
  };

  useEffect(() => {
    const isDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    updateDarkMode(isDark);
  }, []);

  return (
    <ModeContext.Provider
      value={{
        darkMode,
        setDarkMode,
        toggleDarkMode,
        searchMode,
        setSearchMode,
        toggleSearchMode,
      }}
    >
      {children}
    </ModeContext.Provider>
  );
}

function updateDarkMode(darkMode: boolean) {
  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }
}
export const useMode = () => useContext(ModeContext);
