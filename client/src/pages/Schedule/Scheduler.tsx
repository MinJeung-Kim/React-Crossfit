import { useState } from "react";

import ScheduleProvider from "context/ScheduleContext";

import CreateModal from "components/Schedule/CreateModal";
import ScheduleHeader from "components/Schedule/ScheduleHeader";
import Week from "components/Schedule/Week/Week";
import Month from "components/Schedule/Month/Month";

import styles from "./Scheduler.module.css";

export type ViewModeType = "MONTH" | "WEEK";

export default function Scheduler() {
  const [viewMode, setViewMode] = useState<ViewModeType>("MONTH");

  return (
    <ScheduleProvider>
      <div className={styles.schedule}>
        <div className={styles.box}>
          <ScheduleHeader viewMode={viewMode} setViewMode={setViewMode} />
          {viewMode === "MONTH" ? <Month /> : <Week />}
          <CreateModal />
        </div>
      </div>
    </ScheduleProvider>
  );
}
