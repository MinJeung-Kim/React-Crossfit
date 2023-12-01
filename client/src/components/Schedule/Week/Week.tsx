import cn from "classnames";
import { format } from "date-fns";

import { ScheduleType } from "service/schedule";
import { useScheduleContext } from "context/ScheduleContext";
import {
  DATE_FORMAT,
  calculateWeekRange,
  zonedCurrentDate,
} from "util/schedule";

import { useScheduleMap } from "hooks/useScheduleMap";
import { useFilteredAndSortedSchedule } from "hooks/useFilteredAndSortedSchedule";

import styles from "./Week.module.css";

const renderItem = (key: string, items: ScheduleType[]) => {
  return (
    <div key={key} className={styles.content_wrapper}>
      <p>{items[0].rezTime}</p>
      <div
        className={cn(styles.color_display, { [styles.green]: items.length >= 3 })} 
      />
      <div className={styles.user_names}>
        {items.map((item) => (
          <p key={item.id}>{item.username}</p>
        ))}
      </div>
    </div>
  );
};

export default function Week() {
  const { currentDate, data } = useScheduleContext();
  const { weekStart, weekEnd } = calculateWeekRange(
    zonedCurrentDate(currentDate)
  );
  const sortedAndFilteredData = useFilteredAndSortedSchedule(
    data,
    weekStart,
    weekEnd
  );
  const itemsMap = useScheduleMap(sortedAndFilteredData);

  const uniqueDates = new Set<string>();
  const scheduleElements = Array.from(itemsMap.keys()).map((key) => {
    const items = itemsMap.get(key);
    if (!items) return null;
    const isNewDate = !uniqueDates.has(String(items[0].rezDate));
    if (isNewDate) {
      uniqueDates.add(String(items[0].rezDate));
    }

    return (
      <li key={key}>
        {isNewDate && (
          <div className={styles.week_wrapper}>
            <p>{items[0].week}</p>
            <p className={styles.createdAt}>
              {format(new Date(items[0].rezDate), DATE_FORMAT)}
            </p>
          </div>
        )}
        {renderItem(key, items)}
      </li>
    );
  });

  return (
    <>
      {scheduleElements.length > 0 ? (
        <ul>{scheduleElements}</ul>
      ) : (
        <p className={styles.no_data}>데이터가 없습니다.</p>
      )}
    </>
  );
}
