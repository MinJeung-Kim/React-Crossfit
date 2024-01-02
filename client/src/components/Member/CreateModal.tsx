import { useState } from "react";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";

import Modal from "components/common/Modal";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateModal({ isOpen, setIsOpen }: Props) {
  const [userInfo, setUserInfo] = useState({
    email: "",
    phone: "",
    gender: "",
    birthDay: Date(),
  });
  const [membershipInfo, setMembershipInfo] = useState({
    membership: "",
    extension: "",
    lockerYn: "Y",
    locker: "",
    price: "",
    startDate: "",
    endDate: "",
  });

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={"Add Member"}
      onSave={() => {
        return;
      }}
    >
      <div>
        <Calendar
          value={userInfo.birthDay}
          dateFormat={"yy-mm-dd"}
          onChange={() => {
            return;
          }}
          showIcon
          disabledDays={[0]}
          style={{ width: "100%" }}
        />
        <InputText type="email" value={userInfo.email} />
        <InputText type="text" value={userInfo.phone} />
      </div>
    </Modal>
  );
}
