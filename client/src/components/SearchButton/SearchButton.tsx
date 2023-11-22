import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"; 
import styles from "./SearchButton.module.css";

const selectList = [
  { id: "", name: "All" },
  { id: "Recent", name: "Recent" },
  { id: "popular", name: "Popular" },
];


export default function SearchButton() {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState("All");

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleSelected = (name: string) => {
    setSelected(name);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBox}>
        <div className={styles.dropdown}>
          <div className={styles.defaultOption} onClick={handleToggle}>
            {selected}
            {isActive ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </div>
          <ul className={`${styles.ul}  ${isActive ? styles.active : ""}`}>
            {selectList.map(({ id, name }) => {
              return (
                <li key={id} onClick={() => handleSelected(name)}>
                  {name}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.searchField}>
          <input type="text" className={styles.input} placeholder="Search" />
          <FiSearch />
        </div>
      </div>
    </div>
  );
}
