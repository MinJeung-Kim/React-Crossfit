import { useState } from "react";
import cn from "classnames";

import Logo from "./Logo";
import Profile from "./Profile";
import MenuItem from "./MenuItem";
import { menus } from "../../util/sideNavMenu";

import styles from "./SideNavigationBar.module.css";

type Props = { isActive: boolean };

export default function SideNavigationBar({ isActive }: Props) {
  const [subMenusState, setSubMenusState] = useState<{
    [x: number]: boolean;
  }>({});

  const toggleSubMenu = (index: number) => () =>
    setSubMenusState({ ...subMenusState, [index]: !subMenusState[index] });

  return (
    <nav className={cn(styles.sidebar, { [styles.close]: isActive })}>
      <Logo />
      <ul className={styles.nav_links}>
        {menus.map((menu, index) => (
          <MenuItem
            key={menu.name}
            {...menu}
            toggleSubMenu={toggleSubMenu(index)}
            isSubMenuOpen={subMenusState[index]}
          />
        ))}
      </ul>
      <Profile />
    </nav>
  );
}
