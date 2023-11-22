import { axiosPrivate } from "../api/AuthApi/axios";

export type ScheduleType = {
  id: number;
  time: string;
  insDt: Date;
  week:string;
  userName: string;
};

export async function getSchedule() {
  const response = await axiosPrivate.get<ScheduleType[]>("/scheduler");

  return response.data;
}

export async function postSchedule(data: {
  time: string;
  insDt: Date;
  week:string;
  userName: string;
}) {
  const response = await axiosPrivate.post<ScheduleType[]>("/scheduler", data);

  return response.data;
}
