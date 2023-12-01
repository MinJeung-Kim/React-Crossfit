import React, { useCallback, useMemo, useState } from "react";
import {
  isSameMonth,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
} from "date-fns";

import { zonedCurrentDate, zonedToday } from "util/schedule";
import { useScheduleContext } from "context/ScheduleContext";

import CreateModal from "../CreateModal";
import ArrowButtons from "./ArrowButtons";
import { ViewModeType } from "pages/Schedule/Scheduler";
import PlusIcon from "components/common/icons/PlusIcon";
import NormalButton from "components/common/Buttons/NormalButton";

import styles from "./ScheduleHeader.module.css";

type Props = {
  viewMode: ViewModeType;
  setViewMode: React.Dispatch<React.SetStateAction<ViewModeType>>;
};

export default function ScheduleHeader({ viewMode, setViewMode }: Props) {
  const { currentDate, setCurrentDate } = useScheduleContext();
  const [isOpen, setIsOpen] = useState(false);

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

  const goToToday = useCallback(() => {
    setCurrentDate(
      viewMode === "WEEK"
        ? startOfWeek(zonedToday, { weekStartsOn: 1 })
        : zonedToday
    );
  }, [setCurrentDate, viewMode, zonedToday]);

  return (
    <>
      <div className={styles.header}>
        <NormalButton
          text="Today"
          onClick={goToToday}
          disabled={isCurrentDateInCurrentPeriod}
        />
        <ArrowButtons viewMode={viewMode} />

        <div className={styles.buttons}>
          <PlusIcon
            onClick={() => {
              setIsOpen(true);
            }}
          />
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
      </div>
      <CreateModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
