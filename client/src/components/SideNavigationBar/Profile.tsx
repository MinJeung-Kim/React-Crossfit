import { RiLogoutCircleRLine } from "react-icons/ri";

import {   useAuth } from "context/AuthContext";

import styles from "./SideNavigationBar.module.css";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const { userInfo, logout } = useAuth();

  const onLogout = () => {
    if (window.confirm("Do you want to log out?")) {
      logout();
      navigate("/login");
    }
  };

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
