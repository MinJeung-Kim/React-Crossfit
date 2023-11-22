import { useMemo } from "react";
import { isWithinInterval } from "date-fns";

import { ScheduleType } from "service/schedule";
import { TIME_SLOTS } from "util/schedule";

export function useFilteredAndSortedSchedule(
  data: ScheduleType[],
  weekStart: Date,
  weekEnd: Date
) {
  return useMemo(() => {
    return data
      .filter((item) =>
        isWithinInterval(new Date(item.insDt), {
          start: weekStart,
          end: weekEnd,
        })
      )
      .sort((a, b) => {
        const dateA = new Date(a.insDt);
        const dateB = new Date(b.insDt);

        if (dateA.getTime() !== dateB.getTime()) {
          return dateA.getTime() - dateB.getTime();
        }

        const timeIndexA = TIME_SLOTS.indexOf(a.time);
        const timeIndexB = TIME_SLOTS.indexOf(b.time);
        return timeIndexA - timeIndexB;
      });
  }, [data, weekStart, weekEnd]);
}
