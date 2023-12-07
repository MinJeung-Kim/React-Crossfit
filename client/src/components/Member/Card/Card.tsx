import { Members } from "service/member";
import Avatar from "components/common/Avatar/Avatar";

import styles from "./Card.module.css";

type Props = {
  members: Members[];
  setMember: React.Dispatch<React.SetStateAction<Members>>;
};

export default function Card({ members, setMember }: Props) {
  return (
    <ul className={styles.wrapper}>
      {members.map((member) => (
        <li
          className={styles.user_wrap}
          key={member.id}
          onClick={() => setMember(member)}
        >
          <div className={styles.users}>
            <Avatar src={""} alt={""} className={styles.user_img} />
            <div className={styles.user}>
              <span className={styles.name}>{member.name}</span>
              <span className={styles.username}>{member.username}</span>
            </div>
          </div>
          <div className={styles.utill}>
            <span className={styles.update}>수정</span>
            <span className={styles.delete}>삭제</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
