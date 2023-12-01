import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getWeek,
  addDays,
  startOfWeek,
  format,
  endOfWeek,
  getDay,
} from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import _ from "lodash";

import { ScheduleType } from "service/schedule";

export type Weekdays = Record<string, number>;

export const DATE_FORMAT = "yyyy-MM-dd";
const WEEKS_IN_YEAR = 52;

export const TIME_SLOTS = [
  "07:00-08:00",
  "09:50-10:50",
  "10:50-11:50",
  "18:20-19:20",
  "19:25-20:25",
  "20:30-21:30",
];

export const WEEKS: Weekdays = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const TODAY = format(new Date(), DATE_FORMAT);
export const zonedToday = utcToZonedTime(new Date(), userTimeZone);

export const zonedCurrentDate = (currentDate: Date) =>
  utcToZonedTime(currentDate, userTimeZone);

export const calculateWeekRange = (date: Date) => {
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });
  const weekEnd = addDays(endOfWeek(date, { weekStartsOn: 1 }), -1);
  const formattedWeekRange = `${format(weekStart, "MM월 dd일")} - ${format(
    weekEnd,
    "MM월 dd일, yyyy년"
  )}`;

  return {
    weekRange: formattedWeekRange,
    weekStart,
    weekEnd,
  };
};

export function getStartOfMonth(currentDate: Date) {
  return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
}

export function getEndOfMonth(currentDate: Date) {
  return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
}

export function getWeeksInMonth(date: Date) {
  const startDate = startOfMonth(date);
  const endDate = endOfMonth(date);

  const startWeek = getWeek(startDate);
  let endWeek = getWeek(endDate);

  if (endWeek < startWeek) {
    endWeek += WEEKS_IN_YEAR;
  }

  const weeks: Date[][] = [];

  for (let week = startWeek; week <= endWeek; week++) {
    let currentWeekStart = addDays(startDate, (week - startWeek) * 7);
    currentWeekStart = startOfWeek(currentWeekStart);

    weeks.push(
      eachDayOfInterval({
        start: currentWeekStart,
        end: addDays(currentWeekStart, 6),
      })
    );
  }

  return weeks;
}

export const filterSchedulesForDay = (
  data: ScheduleType[],
  currentDay: string
) => {
  const filteredData = data.filter(({ rezDate }) => {
    const formatDate = format(
      new Date(String(rezDate).split(" ")[0]),
      DATE_FORMAT
    );
    return formatDate === currentDay;
  });

  const displayItems = _.chunk(filteredData, 2)[0] ?? [];

  const countSchedules = filteredData.length - 2 ?? 0;
  return { displayItems, countSchedules };
};

export const setWeek = (date: Date) => {
  const dayOfWeek = getDay(date);
  const dayName = Object.keys(WEEKS).find((key) => WEEKS[key] === dayOfWeek);
  return dayName;
};
