import { useMode } from "context/ModeContext";
import { FiSearch } from "react-icons/fi";
import { MdClear } from "react-icons/md";

import styles from "./UserMenu.module.css";

export default function Search() {
  const { searchMode, toggleSearchMode } = useMode();
  return (
    <div className={styles.searchBox} onClick={toggleSearchMode}>
      <div
        className={`${styles.searchToggle} ${searchMode ? styles.active : ""} `}
        onClick={toggleSearchMode}
      >
        <i className={styles.cancel}>
          <MdClear />
        </i>
        <i className={styles.search}>
          <FiSearch />
        </i>
      </div>
      <div className={styles.search_field}>
        <input type="text" />
        <i>
          <FiSearch />
        </i>
      </div>
    </div>
  );
}
