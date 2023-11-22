import { format, isSunday as checkIsSunday, getDay } from "date-fns";

import Day from "./Day";
import { useScheduleContext } from "context/ScheduleContext";
import { DATE_FORMAT, WEEKS  } from "util/schedule";

import styles from "./Month.module.css";

type Props = {
  days: Date[];
};

export default function Week({ days }: Props) {
  const { setIsOpen, setSelectedDate } = useScheduleContext();

  const handleDayClick = (day: Date) => {
    const dayOfWeek = getDay(day);
    const dayName = Object.keys(WEEKS).find(
      (key) => WEEKS[key] === dayOfWeek
    );

    if (dayName && !checkIsSunday(day)) {
      setIsOpen(true);
      setSelectedDate({ date: day, week: dayName });
    }
  };

  const dayStyles = (day: Date): React.CSSProperties => ({
    pointerEvents: checkIsSunday(day) ? "none" : "auto",
    opacity: checkIsSunday(day) ? 0.5 : 1,
  });

  return (
    <div className={styles.week}>
      {days.map((day, idx) => {
        return (
          <div
            key={idx}
            className={styles.days}
            onClick={() => handleDayClick(day)}
            style={dayStyles(day)}
          >
            <Day day={day} currentDay={format(day, DATE_FORMAT)} />
          </div>
        );
      })}
    </div>
  );
}
