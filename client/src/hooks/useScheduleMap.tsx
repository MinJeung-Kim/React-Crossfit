import { useMemo } from "react";
import { format } from "date-fns";

import { DATE_FORMAT } from "util/schedule";
import { ScheduleType } from "service/schedule";

export function useScheduleMap(sortedAndFilteredData: ScheduleType[]) {
  return useMemo(() => {
    const map = new Map<string, ScheduleType[]>();

    sortedAndFilteredData.forEach((item) => { 
      const date = new Date(item.insDt);
      const key = `${item.time}-${format(date, DATE_FORMAT)}`;
      const entries = map.get(key) || [];
      map.set(key, [...entries, item]);
    });

    return map;
  }, [sortedAndFilteredData]);
}
