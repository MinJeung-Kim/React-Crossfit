import { format, isSunday as checkIsSunday } from "date-fns";

import Day from "./Day";
import { DATE_FORMAT } from "util/schedule";

import styles from "./Month.module.css";

type Props = {
  days: Date[];
};

export default function Week({ days }: Props) {
  const dayStyles = (day: Date): React.CSSProperties => ({
    pointerEvents: checkIsSunday(day) ? "none" : "auto",
    opacity: checkIsSunday(day) ? 0.5 : 1,
  });

  return (
    <div className={styles.week}>
      {days.map((day, idx) => {
        return (
          <div key={idx} className={styles.days} style={dayStyles(day)}>
            <Day day={day} currentDay={format(day, DATE_FORMAT)} />
          </div>
        );
      })}
    </div>
  );
}
