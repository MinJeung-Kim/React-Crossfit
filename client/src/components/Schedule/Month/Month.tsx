import Week from "./Week"; 
import Weekdays from "./Weekdays";

import { useScheduleContext } from "context/ScheduleContext";
import { getWeeksInMonth } from "util/schedule";

import styles from "./Month.module.css";

export default function Month() {
  const { currentDate } = useScheduleContext();
  const weeksInMonth = getWeeksInMonth(currentDate);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Weekdays />
        {weeksInMonth.map((week, idx) => (
          <Week key={idx} days={week} />
        ))}
      </div>
    </div>
  );
}
