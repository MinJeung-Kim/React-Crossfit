import { useCallback } from "react"; 
import { addMonths, addWeeks, format, startOfWeek } from "date-fns";

import { calculateWeekRange, zonedCurrentDate } from "util/schedule";
import { useScheduleContext } from "context/ScheduleContext";

import { ViewModeType } from "pages/Schedule/Scheduler";
import ArrowBackIcon from "components/common/icons/ArrowBackIcon";
import ArrowForwardIcon from "components/common/icons/ArrowForwardIcon";

import styles from "./ArrowButtons.module.css";

type Props = {
  viewMode: ViewModeType;
};

export default function ArrowButtons({ viewMode }: Props) {
  const { currentDate, setCurrentDate } = useScheduleContext();
  const { weekRange } = calculateWeekRange(zonedCurrentDate(currentDate));

  const updateCurrentDate = useCallback(
    (amount: number) => {
      setCurrentDate((current) => {
        if (viewMode === "WEEK") {
          return startOfWeek(addWeeks(current, amount), { weekStartsOn: 1 });
        } else {
          return addMonths(current, amount);
        }
      });
    },
    [setCurrentDate, viewMode]
  );

  return (
    <div className={styles.buttons}>
      <ArrowBackIcon onClick={() => updateCurrentDate(-1)} />
      <span className={styles.title}>
        {viewMode === "MONTH"
          ? format(zonedCurrentDate(currentDate), "yyyy년 MM월")
          : weekRange}
      </span>
      <ArrowForwardIcon onClick={() => updateCurrentDate(1)} />
    </div>
  );
}
