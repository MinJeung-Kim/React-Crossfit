import { TIME_SLOTS } from "util/schedule";

import styles from "./Schedule.module.css";

export default function TimeButtons({
  selectedTime,
  setSelectedTime,
}: {
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}) {
  return (
    <div className={styles.buttonBox}>
      {TIME_SLOTS.map((time) => (
        <button
          key={time}
          className={`${styles.button} ${
            time === selectedTime && styles.selectedBtn
          }`}
          onClick={() => setSelectedTime(time)}
        >
          {time}
        </button>
      ))}
    </div>
  );
}
