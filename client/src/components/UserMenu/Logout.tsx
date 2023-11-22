import { useAuthContext } from "context/AuthContext";
import { RiLogoutCircleRLine } from "react-icons/ri";

import styles from "./UserMenu.module.css";

export default function Logout() {
  const { onLogout } = useAuthContext();

  return (
    <div className={`${styles.searchToggle} ${styles.search_logout}`}>
      <i onClick={onLogout}>
        <RiLogoutCircleRLine />
      </i>
    </div>
  );
}
