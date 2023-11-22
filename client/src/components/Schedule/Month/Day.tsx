import cn from "classnames";
import { format, isBefore, isAfter } from "date-fns";

import { useScheduleContext } from "context/ScheduleContext";
import {
  filterSchedulesForDay,
  getEndOfMonth,
  getStartOfMonth,
  TODAY,
} from "util/schedule";

import styles from "./Month.module.css";

type Props = {
  day: Date;
  currentDay: string;
};

export default function Day({ day, currentDay }: Props) {
  const { data, currentDate } = useScheduleContext();
  const { displayItems, countSchedules } = filterSchedulesForDay(
    data,
    currentDay
  );
  const isToday = TODAY === currentDay;
  const isOutsideMonth =
    isBefore(day, getStartOfMonth(currentDate)) ||
    isAfter(day, getEndOfMonth(currentDate));

  return (
    <div
      className={cn(styles.day, {
        [styles.afterThisMonth]: isOutsideMonth,
      })}
    >
      <div className={styles.day_box}>
        <span className={isToday ? styles.today : ""}>{format(day, "dd")}</span>
        {displayItems.length > 1 && (
          <span className={styles.over_count}>{`+${countSchedules}`}</span>
        )}
      </div>
      {displayItems.map(({ id, time, userName }) => (
        <div className={styles.data} key={id}>
          <span className={styles.time}>{time}</span>
          <span className={styles.name}>{userName}</span>
        </div>
      ))}
    </div>
  );
}
