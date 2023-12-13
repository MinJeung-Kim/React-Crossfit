import { zonedTimeToUtc, utcToZonedTime, format } from "date-fns-tz";

// UTC 날짜를 특정 나라의 시간대에 맞춰 변환하는 함수
export function convertToTimeZone(date: Date, timeZone: string): string {
  const utcDate = zonedTimeToUtc(date, timeZone);
  const zonedDate = utcToZonedTime(utcDate, timeZone);
  return format(zonedDate, "yyyy-MM-dd HH:mm:ssXXX", { timeZone });
}

export function dateFormatTonlyDate(date: string) {
  return date?.split("T")[0];
}
