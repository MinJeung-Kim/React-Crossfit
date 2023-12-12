import { useNavigate } from "react-router";

import { profileImage } from "util/images";
import { useAuth } from "context/AuthContext";

import Avatar from "components/common/Avatar/Avatar";
import DarkMode from "components/SideBar/Profile/DarkMode";
import LogoutIcon from "components/common/icons/LogoutIcon";

import styles from "./Profile.module.css";

export default function Profile() {
  const navigate = useNavigate();
  const { authInfo, logout } = useAuth();

  const onLogout = () => {
    if (window.confirm("Do you want to log out?")) {
      logout();
      navigate("/login");
    }
  };

  return (
    <div className={styles.profile}>
      <div className={styles.user_menu}>
        <DarkMode />
        <LogoutIcon onClick={onLogout} />
      </div>
      <Avatar
        src={profileImage}
        alt={"profile"}
        className={styles.profile_img}
      />
      <div className={styles.user}>
        <span
          className={styles.username}
        >{`Hello👋 ${authInfo?.username}`}</span>
        {/* <span className={styles.email}>{authInfo?.email}</span> */}
      </div>
    </div>
  );
}
