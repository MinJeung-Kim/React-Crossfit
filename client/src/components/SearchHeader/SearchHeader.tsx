import React, { useState } from "react";
import { FiMenu, FiSearch } from "react-icons/fi";

import UserMenu from "../UserMenu/UserMenu";

import styles from "./SearchHeader.module.css";

type Props = {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchHeader({ isActive, setIsActive }: Props) {
  const [text, setText] = useState("");

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <header
      className={`${styles.home_section}  ${isActive ? styles.active : ""}`}
    >
      <nav>
        <div className={styles.sidebar_button}>
          <i onClick={handleToggle}>
            <FiMenu />
          </i>
          <span className={styles.dashboard}>Dashboard</span>
        </div>
        <div className={styles.search_box}>
          <input
            type="text"
            name="text"
            placeholder="Search..."
            value={text || ''}
            onChange={(e) => setText(e.target.value)}
          />
          <i>
            <FiSearch />
          </i>
        </div>
        <div className={styles.profile_details}>
          <UserMenu />
        </div>
      </nav>
    </header>
  );
}
