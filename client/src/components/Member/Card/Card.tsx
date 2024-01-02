import Avatar from "components/common/Avatar/Avatar";
import { Member } from "pages/Member/Member";

import styles from "./Card.module.css";

type Props = {
  members: Member[];
  setMember: React.Dispatch<React.SetStateAction<Member | null>>;
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
            <span className={styles.update} onClick={() => console.log("수정")}>
              수정
            </span>
            <span className={styles.delete} onClick={() => console.log("삭제")}>
              삭제
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
