import { createContext, useContext, useState } from "react";

import { TIME_SLOTS } from "util/schedule";
import { ScheduleType } from "service/schedule";

type DateType = { date: Date; week: string };

type State = {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: DateType;
  setSelectedDate: React.Dispatch<React.SetStateAction<DateType>>;
  selectedTime: string;
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
  data: ScheduleType[];
  setData: React.Dispatch<React.SetStateAction<ScheduleType[]>>;
};

const ScheduleContext = createContext<State>({} as State);

export default function ScheduleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<DateType>({
    date: new Date(),
    week: "",
  });
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0]);
  const [data, setData] = useState<ScheduleType[]>([]);

  return (
    <ScheduleContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        isOpen,
        setIsOpen,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        data,
        setData,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}
export const useScheduleContext = () => useContext(ScheduleContext);
