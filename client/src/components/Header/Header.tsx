import { Link } from "react-router-dom";

import Search from "./Search/Search";
import Language from "./Language/Language";
import UserMenus from "./UserMenus/UserMenus";

import styles from "./Header.module.css";

const SUB_MENUS = [
  { name: "About Us", url: "" },
  { name: "Instagram", url: "https://www.instagram.com/crossfit_baekho/" },
  {
    name: "Naver",
    url: "https://m.place.naver.com/place/1855680528/home?entry=ple",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/CrossFitbaekho/?locale=ko_KR",
  },
];

export default function Header() {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.sub_menus}>
        {SUB_MENUS.map(({ name, url }) => (
          <li key={name}>
            <Link to={url}>{name}</Link>
          </li>
        ))}
      </ul>
      <Search />
      <Language />
      <UserMenus />
    </div>
  );
}
