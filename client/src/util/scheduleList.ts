import { format } from "date-fns";

import { DATE_FORMAT } from "./schedule";
import { ScheduleType } from "service/schedule";

export function checkDuplicateAndFirst(
    dataItem: ScheduleType,
    duplicatesMap: Map<string, ScheduleType[]>
  ) {
    const dateStr = format(new Date(dataItem.insDt), DATE_FORMAT);
    const key = `${dataItem.week}-${dateStr}`;
    const duplicates = duplicatesMap.get(key);
    const isDuplicated = duplicates && duplicates.length > 1;
    const isFirstDuplicate = isDuplicated
      ? duplicates![0].id === dataItem.id
      : false;
  
    return { isDuplicated, isFirstDuplicate, key };
  }