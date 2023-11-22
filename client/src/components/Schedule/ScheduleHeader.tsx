import React, { useCallback, useMemo } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  format,
  isSameMonth,
  startOfWeek,
  endOfWeek,
  addWeeks,
  addMonths,
  isWithinInterval,
} from "date-fns";

import {
  calculateWeekRange,
  zonedCurrentDate,
  zonedToday,
} from "util/schedule";
import { useScheduleContext } from "context/ScheduleContext";

import { ViewModeType } from "pages/Schedule/Scheduler";
import NormalButton from "components/common/Buttons/NormalButton";

import styles from "./Schedule.module.css";

type Props = {
  viewMode: ViewModeType;
  setViewMode: React.Dispatch<React.SetStateAction<ViewModeType>>;
};

export default function ScheduleHeader({ viewMode, setViewMode }: Props) {
  const { currentDate, setCurrentDate } = useScheduleContext();
  const { weekRange } = calculateWeekRange(zonedCurrentDate(currentDate));

  const isCurrentDateInCurrentPeriod = useMemo(() => {
    if (viewMode === "MONTH") {
      return isSameMonth(zonedToday, zonedCurrentDate(currentDate));
    } else {
      const startOfThisWeek = startOfWeek(zonedToday, { weekStartsOn: 1 });
      const endOfThisWeek = endOfWeek(zonedToday, { weekStartsOn: 1 });

      return isWithinInterval(zonedCurrentDate(currentDate), {
        start: startOfThisWeek,
        end: endOfThisWeek,
      });
    }
  }, [viewMode, zonedToday, zonedCurrentDate]);

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

  const goToToday = useCallback(() => {
    setCurrentDate(
      viewMode === "WEEK"
        ? startOfWeek(zonedToday, { weekStartsOn: 1 })
        : zonedToday
    );
  }, [setCurrentDate, viewMode, zonedToday]);

  return (
    <div className={styles.header}>
      <NormalButton
        text="Today"
        onClick={goToToday}
        disabled={isCurrentDateInCurrentPeriod}
      />
      <div className={styles.buttons}>
        <IoIosArrowBack
          className={styles.arrow}
          onClick={() => updateCurrentDate(-1)}
        />
        <span className={styles.title}>
          {viewMode === "MONTH"
            ? format(zonedCurrentDate(currentDate), "yyyy년 MM월")
            : weekRange}
        </span>
        <IoIosArrowForward
          className={styles.arrow}
          onClick={() => updateCurrentDate(1)}
        />
      </div>

      <div className={styles.unit}>
        <NormalButton
          text="Month"
          onClick={() => setViewMode("MONTH")}
          disabled={viewMode === "MONTH"}
        />
        <NormalButton
          text="Week"
          onClick={() => setViewMode("WEEK")}
          disabled={viewMode === "WEEK"}
        />
      </div>
    </div>
  );
}
