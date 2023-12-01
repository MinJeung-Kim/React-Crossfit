import { useState } from "react";
import SearchIcon from "components/common/icons/SearchIcon";

import styles from "./Search.module.css";

export default function Search() {
  const [text, setText] = useState("");

  return (
    <div className={styles.wrapper}>
      <SearchIcon />
      <input
        type="text"
        value={text}
        placeholder="Search..."
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}
