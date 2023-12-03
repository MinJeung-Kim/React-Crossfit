import { useEffect, useState } from "react";
import { Splitter, SplitterPanel } from "primereact/splitter";

import { scheduleService } from "index"; 
import { useScheduleContext } from "context/ScheduleContext";

import Week from "components/Schedule/Week/Week";
import List from "components/Schedule/List/List";
import Month from "components/Schedule/Month/Month";
import ScheduleHeader from "components/Schedule/Header/ScheduleHeader";

import styles from "./Scheduler.module.css";

export type ViewModeType = "MONTH" | "WEEK";

export default function Scheduler() {
  const { setData } = useScheduleContext(); 
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<ViewModeType>("MONTH");

  const onError = (error: any) => {
    setError(error.toString());
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  useEffect(() => { 
    scheduleService
      .getSchedules()
      .then((schedule) => setData([...schedule]))
      .catch(onError);
  }, []);

  return (
    <div className={styles.schedule}>
      {viewMode === "MONTH" ? (
        <Splitter style={{ height: "100%" }} gutterSize={8} layout="vertical">
          <SplitterPanel size={75} style={{ overflow: "hidden" }}>
            <div className={styles.box}>
              <ScheduleHeader viewMode={viewMode} setViewMode={setViewMode} />
              <Month />
            </div>
          </SplitterPanel>
          <SplitterPanel size={20} minSize={10} style={{ overflow: "hidden" }}>
            <List />
          </SplitterPanel>
        </Splitter>
      ) : (
        <div className={styles.box}>
          <ScheduleHeader viewMode={viewMode} setViewMode={setViewMode} />
          <Week />
        </div>
      )}
    </div>
  );
}
