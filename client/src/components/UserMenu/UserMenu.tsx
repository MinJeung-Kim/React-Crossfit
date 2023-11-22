import Search from "./Search";
import Logout from "./Logout";
import DarkMode from "./DarkMode";
import Language from "./Language";

import styles from "./UserMenu.module.css";

export default function UserMenu() {
  return (
    <div className={styles.darkLight_searchBox}>
      <DarkMode />
      <Search />
      <Language />
      <Logout />
    </div>
  );
}
