import { useMode } from "context/ModeContext";
import MoonIcon from "components/common/icons/MoonIcon";
import SunIcon from "components/common/icons/SunIcon";

import styles from "./DarkMode.module.css";

export default function DarkMode() {
  const { darkMode, toggleDarkMode } = useMode();

  return (
    <div
      className={`${styles.dark_light} ${darkMode ? styles.active : ""} `}
      onClick={toggleDarkMode}
    >
      <MoonIcon />
      <SunIcon />
    </div>
  );
}
