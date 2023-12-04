import { Members } from "service/member";
import Avatar from "components/common/Avatar/Avatar";
import UserMenuIcon from "components/common/icons/UserMenuIcon";

import styles from "./Card.module.css";

type Props = {
  members: Members[];
};

export default function Card({ members }: Props) {
  return (
    <ul className={styles.wrapper}>
      {members.map(({ name, username },idx) => (
        <li className={styles.user_wrap} key={idx}>
          <div className={styles.users}>
            <Avatar src={""} alt={""} className={styles.user_img} />
            <div className={styles.user}>
              <span className={styles.name}>{name}</span>
              <span className={styles.username}>{username}</span>
            </div>
          </div>
          <div className={styles.icon}>
            <UserMenuIcon
              onClick={() => {
                console.log("UserMenuIcon");
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
