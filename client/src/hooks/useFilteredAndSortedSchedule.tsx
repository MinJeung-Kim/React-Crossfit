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
        isWithinInterval(new Date(item.rezDate), {
          start: weekStart,
          end: weekEnd,
        })
      )
      .sort((a, b) => {
        const dateA = new Date(a.rezDate);
        const dateB = new Date(b.rezDate);

        if (dateA.getTime() !== dateB.getTime()) {
          return dateA.getTime() - dateB.getTime();
        }

        const timeIndexA = TIME_SLOTS.indexOf(a.rezTime);
        const timeIndexB = TIME_SLOTS.indexOf(b.rezTime);
        return timeIndexA - timeIndexB;
      });
  }, [data, weekStart, weekEnd]);
}
