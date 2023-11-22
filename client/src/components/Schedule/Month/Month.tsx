import { useEffect } from "react";

import Week from "./Week";
import Weekdays from "./Weekdays";

import { getSchedule } from "service/schedule";
import { useScheduleContext } from "context/ScheduleContext";
import { getWeeksInMonth } from "util/schedule";

import styles from "./Month.module.css";

export default function Month() {
  const { currentDate, setData } = useScheduleContext();
  const weeksInMonth = getWeeksInMonth(currentDate);

  const fetchSchedule = async () => {
    try {
      const payload = await getSchedule();
      if (payload) {
        setData(payload);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  return (
    <div className={styles.content}>
      <Weekdays />
      {weeksInMonth.map((week, idx) => (
        <Week key={idx} days={week} />
      ))}
    </div>
  );
}
