import { RiLogoutCircleRLine } from "react-icons/ri";

import { useAuthContext } from "context/AuthContext";

import styles from "./SideNavigationBar.module.css";

export default function Profile() {
  const { userInfo, onLogout } = useAuthContext();
  return (
    <div className={styles.profile_details} onClick={onLogout}>
      <div className={styles.profile_content}>
        <img src="images/profile.png" alt="profile" />
      </div>
      <div className={styles.name_job}>
        <p className={styles.profile_name}>{userInfo.name}</p>
        <p className={styles.job}>{userInfo.email}</p>
      </div>
      <RiLogoutCircleRLine />
    </div>
  );
}
