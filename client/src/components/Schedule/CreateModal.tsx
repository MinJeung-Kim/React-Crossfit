import { Dialog } from "primereact/dialog";
import { Calendar, CalendarChangeParams } from "primereact/calendar";

import TimeButtons from "./TimeButtons";
import { getSchedule, postSchedule } from "service/schedule";

import { useAuthContext } from "context/AuthContext";
import { useScheduleContext } from "context/ScheduleContext";
import DialogFooter from "components/common/Buttons/DialogFooter";

import styles from "./Schedule.module.css";
import { TODAY } from "util/schedule";

export default function CreateModal() {
  const { userInfo } = useAuthContext();
  const {
    selectedDate,
    setSelectedDate,
    isOpen,
    setIsOpen,
    selectedTime,
    setSelectedTime,
    setData,
  } = useScheduleContext();

  const handleDateChange = (e: CalendarChangeParams) => {
    const { value } = e.target;
    if (value instanceof Date) {
      setSelectedDate({ ...selectedDate, date: value });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSave = async () => {
    setIsOpen(false);
    try {
      const postPayload = await postSchedule({
        insDt: selectedDate.date,
        time: selectedTime,
        userName: userInfo.name,
        week: selectedDate.week,
      });
      if (postPayload) {
        try {
          const getPayload = await getSchedule();
          if (getPayload) {
            setData(getPayload);
          }
        } catch (getScheduleError) {
          console.error("Error fetching schedule:", getScheduleError);
        }
      }
    } catch (postScheduleError) {
      console.error("Error posting schedule:", postScheduleError);
    }
  };
  const calendarValue =
    typeof selectedDate.date === "string"
      ? new Date(selectedDate.date)
      : selectedDate.date;

  return (
    <Dialog
      header="Header"
      visible={isOpen}
      style={{ width: "60vw" }}
      onHide={handleClose}
      footer={<DialogFooter onClose={handleClose} onSave={handleSave} />}
    >
      <div className={styles.content}>
        <Calendar
          value={calendarValue}
          dateFormat={"yy-mm-dd"}
          onChange={handleDateChange}
          showIcon
          disabledDays={[0]}
          minDate={new Date(TODAY)}
          style={{ width: "100%" }}
        />

        <TimeButtons
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </div>
    </Dialog>
  );
}
