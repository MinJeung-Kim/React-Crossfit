import { Link, useLocation } from "react-router-dom";

import FireFillIcon from "components/common/icons/FireFillIcon";
import UsersFillIcon from "components/common/icons/UsersFillIcon";
import FileFillIcon from "components/common/icons/FileFillIcon";
import ConfigureIcon from "components/common/icons/ConfigureIcon";
import DumbbellFillIcon from "components/common/icons/DumbbellFillIcon";
import DashboardFilIcon from "components/common/icons/DashboardFilIcon";
import CalendarIcon from "components/common/icons/CalendarIcon";

import styles from "./Menu.module.css";

export const MENUS = [
  { name: "Dashboard", url: "/", icon: <DashboardFilIcon /> },
  { name: "Members", url: "/member", icon: <UsersFillIcon /> },
  { name: "Schedule", url: "/schedule", icon: <CalendarIcon /> },
  { name: "WOD", url: "/category", icon: <DumbbellFillIcon /> },
  { name: "Events", url: "/events", icon: <FireFillIcon /> },
  { name: "Board", url: "/board", icon: <FileFillIcon /> },
  { name: "Teams", url: "/teams", icon: <UsersFillIcon /> },
  { name: "Settings", url: "/settings", icon: <ConfigureIcon /> },
];

export default function Menu() {
  const location = useLocation();
  const urlPathname = location.pathname;

  return (
    <div className={styles.wrapper}>
      {MENUS.map(({ name, icon, url }) => (
        <div
          className={`${styles.menu} ${urlPathname === url && styles.action}`}
          key={name}
        >
          <Link to={url || "#"}>
            <i className={styles.icon}>{icon}</i>
            <span className={styles.name}>{name}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}
