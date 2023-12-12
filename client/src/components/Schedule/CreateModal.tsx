import { useState, ChangeEvent } from "react";
import { isSunday as checkIsSunday } from "date-fns";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar, CalendarChangeParams } from "primereact/calendar";

import { scheduleService } from "index";
import { TODAY, setWeek } from "util/schedule";
import { ScheduleType } from "service/schedule";
import { useAuth } from "context/AuthContext";
import { useScheduleContext } from "context/ScheduleContext";

import TimeButtons from "./TimeButtons";
import Modal from "components/common/Modal";
import UserIcon from "components/common/icons/UserIcon";

import styles from "./CreateModal.module.css";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateModal({ isOpen, setIsOpen }: Props) {
  const {
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    desc,
    setDesc,
    data,
    setData,
  } = useScheduleContext();
  const [error, setError] = useState("");
  const { authInfo } = useAuth();

  const handleDateChange = (e: CalendarChangeParams) => {
    const { value } = e.target;

    if (value instanceof Date) {
      setSelectedDate({ ...selectedDate, date: value });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setDesc(value);
  };

  const onError = (error: any) => {
    setError(error.toString());
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  function isPost(element: ScheduleType) {
    const rezDateObj = new Date(element.rezDate);
    const dateObj = new Date(selectedDate.date);
    const format = (d: Date) => d.toISOString().split("T")[0];

    if (format(rezDateObj) === format(dateObj)) {
      return true;
    }
  }

  //TODO
  // 같은 날짜에 입력한 정보가 있으면 생성안됨.

  const handleSave = () => {
    // const result = data.find(isPost);
    // console.log("CreateModal : ", result);

    // const dayOfWeek = getDay(selectedDate.date);
    // const dayName = Object.keys(WEEKS).find((key) => WEEKS[key] === dayOfWeek);
    const week = setWeek(new Date(selectedDate.date));

    if (week && !checkIsSunday(selectedDate.date)) { 
      setSelectedDate({ date: selectedDate.date, week });
      scheduleService
        .postSchedule(selectedDate.date, selectedTime, week, desc)
        .then((created) => {
          setData([...created]);
          setIsOpen(false);
        })
        .catch(onError);
    }
  };

  const calendarValue =
    typeof selectedDate.date === "string"
      ? new Date(selectedDate.date)
      : selectedDate.date;

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={"Reservation"}
      onSave={handleSave}
    >
      <div className={styles.content}>
        <div className={styles.top_wrapper}>
          <span className="p-input-icon-left">
            <UserIcon />
            <InputText value={authInfo?.username} disabled />
          </span>
          <Calendar
            value={calendarValue}
            dateFormat={"yy-mm-dd"}
            onChange={handleDateChange}
            showIcon
            disabledDays={[0]}
            minDate={new Date(TODAY)}
            style={{ width: "100%" }}
          />
        </div>

        <TimeButtons
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
        <InputTextarea
          id="desc"
          placeholder="✏️Add Notes"
          value={desc}
          onChange={handleChange}
          rows={5}
          cols={30}
        />
      </div>
    </Modal>
  );
}
