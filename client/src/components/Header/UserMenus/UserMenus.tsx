import BellIcon from "components/common/icons/BellIcon";
import MessageIcon from "components/common/icons/MessageIcon";

import styles from "./UserMenus.module.css";

export default function UserMenus() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.bell}>
        <BellIcon />
      </div>

      <div className={styles.msg}>
        <MessageIcon />
      </div>
    </div>
  );
}
