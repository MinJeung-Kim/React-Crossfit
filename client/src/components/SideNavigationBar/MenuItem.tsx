import { ReactNode } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";

import styles from "./SideNavigationBar.module.css";
import SubMenu from "./SubMenu";

type Props = {
  name: string;
  url?: string;
  icon?: ReactNode;
  children?: Array<{ name: string; url?: string }>;
  toggleSubMenu: () => void;
  isSubMenuOpen: boolean;
};

export default function MenuItem({
  name,
  url,
  icon,
  children,
  toggleSubMenu,
  isSubMenuOpen,
}: Props) {
  return (
    <li className={cn({ [styles.showMenu]: isSubMenuOpen })}>
      <Link
        to={url || "#"}
        className={`${children ? styles.icon_link : ""}`}
        onClick={toggleSubMenu}
      >
        <div className={styles.wrapper}>
          {icon && <i>{icon}</i>}
          <span className={styles.link_name}>{name}</span>
        </div>

        {children && <MdKeyboardArrowDown className={styles.arrow} />}
      </Link>
      {children ? (
        <SubMenu items={children} />
      ) : (
        <ul className={styles.sub_menu}>
          <li>
            <Link to={url || "#"}>{name}</Link>
          </li>
        </ul>
      )}
    </li>
  );
}
