import { createContext, useContext, useState } from "react";

import { TIME_SLOTS } from "util/schedule";
import { ScheduleType } from "service/schedule";

type DateType = { date: Date; week: string };

type State = {
  selectSchedule: ScheduleType[];
  setSelectSchedule: React.Dispatch<React.SetStateAction<ScheduleType[]>>;
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  selectedDate: DateType;
  setSelectedDate: React.Dispatch<React.SetStateAction<DateType>>;
  selectedTime: string;
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
  note: string;
  setNote: React.Dispatch<React.SetStateAction<string>>;
  data: ScheduleType[];
  setData: React.Dispatch<React.SetStateAction<ScheduleType[]>>;
};

const ScheduleContext = createContext<State>({} as State);

export default function ScheduleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectSchedule, setSelectSchedule] = useState<ScheduleType[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<DateType>({
    date: new Date(),
    week: "",
  });
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0]);
  const [note, setNote] = useState("");
  const [data, setData] = useState<ScheduleType[]>([]);

  return (
    <ScheduleContext.Provider
      value={{
        selectSchedule,
        setSelectSchedule,
        currentDate,
        setCurrentDate,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        note,
        setNote,
        data,
        setData,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}
export const useScheduleContext = () => useContext(ScheduleContext);
