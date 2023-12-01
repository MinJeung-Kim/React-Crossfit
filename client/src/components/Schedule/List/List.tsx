import Avatar from "components/common/Avatar/Avatar";
import CalendarIcon from "components/common/icons/CalendarIcon";
import TimeFillIcon from "components/common/icons/TimeFillIcon";
import { useScheduleContext } from "context/ScheduleContext";

import styles from "./List.module.css";

const COLUMNS = [
  { field: "user", header: "USER" },
  { field: "date", header: "DATE" },
  { field: "time", header: "TIME" },
];

export default function List() {
  const { selectSchedule } = useScheduleContext();

  return (
    <div className={styles.wrapper}>
      {selectSchedule.length < 1 && (
        <div className={styles.non_data}>데이터를 선택해주세요</div>
      )}
      {selectSchedule.map(({ id, rezTime, rezDate, name, username, note }) => (
        <div className={styles.list_wrap} key={id}>
          <div className={styles.content}>
            <div className={styles.profile_wrap}>
              <Avatar src={""} alt={""} className={styles.user_img} />
              <div className={styles.user_wrap}>
                <span className={styles.username}>{username}</span>
                <span className={styles.name}>{name}</span>
              </div>
            </div>
            <span className={styles.rezDate}>
              <CalendarIcon />
              {rezDate}
            </span>
            <span className={styles.rezTime}>
              <TimeFillIcon />
              {rezTime}
            </span>
            <div className={styles.utill_wrap}>
              <span className={styles.update}>수정</span>
              <span className={styles.delete}>삭제</span>
            </div>
          </div>
          {note && <div className={styles.note}>{`✏️ ${note}`}</div>}
        </div>
      ))}
    </div>
  );
}
