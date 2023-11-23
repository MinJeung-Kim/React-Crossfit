import { useAuth } from "context/AuthContext";
import { RiLogoutCircleRLine } from "react-icons/ri";

import styles from "./UserMenu.module.css";

export default function Logout() {
  const { logout } = useAuth();

  return (
    <div className={`${styles.searchToggle} ${styles.search_logout}`}>
      <i onClick={logout}>
        <RiLogoutCircleRLine />
      </i>
    </div>
  );
}
