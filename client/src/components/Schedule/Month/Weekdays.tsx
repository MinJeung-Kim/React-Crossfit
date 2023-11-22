import { WEEKS } from "util/schedule";
import styles from "./Month.module.css";
 

export default function Weekdays( ) {
  return (
    <div className={styles.week}>
      {Object.keys(WEEKS).map((day) => (
        <div key={day} className={styles.weekday}>
          {day}
        </div>
      ))}
    </div>
  );
}
