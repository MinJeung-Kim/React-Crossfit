import { useMode } from "context/ModeContext";
import { FiMoon, FiSun } from "react-icons/fi";

import styles from "./UserMenu.module.css";

export default function DarkMode() {
  const { darkMode, toggleDarkMode } = useMode();

  return (
    <div
      className={`${styles.dark_light} ${darkMode ? styles.active : ""} `}
      onClick={toggleDarkMode}
    >
      <i className={styles.moon}>
        <FiMoon />
      </i>
      <i className={styles.sun}>
        <FiSun />
      </i>
    </div>
  );
}
