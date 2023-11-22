import { FormEvent, useEffect } from "react";
import { FiLock, FiUser } from "react-icons/fi";
import { GrFormViewHide } from "react-icons/gr";
import { HiOutlineMail } from "react-icons/hi";

import useValid from "hooks/useValid";
import Input from "components/common/Input/Input";
import { useUserContext } from "context/UserContext";

import styles from "../Login/Login.module.css";
import LoadDataButton from "components/common/Buttons/LoadDataButton";

type Props = {
  onSubmitAccount: (e: FormEvent<HTMLFormElement>) => Promise<void>;
};

export default function RegistrationForm({ onSubmitAccount }: Props) {
  const { users, setUsers } = useUserContext();
  const { handleBlur } = useValid();

  return (
    <form onSubmit={onSubmitAccount}>
      <Input
        name="name"
        placeholder="Create a name"
        icon={<FiUser />}
        inputs={users}
        setInputs={setUsers}
      />
      <Input
        name="email"
        placeholder="Create a email"
        icon={<HiOutlineMail />}
        inputs={users}
        setInputs={setUsers}
        onBlur={handleBlur}
      />
      <Input
        name="password"
        type="password"
        placeholder="Create a password"
        icon={<FiLock />}
        hideIcon={<GrFormViewHide />}
        inputs={users}
        setInputs={setUsers}
        onBlur={handleBlur}
      />
      <Input
        name="passwordConfirm"
        type="password"
        placeholder="Confirm a password"
        icon={<FiLock />}
        hideIcon={<GrFormViewHide />}
        inputs={users}
        setInputs={setUsers}
        onBlur={handleBlur}
      />

      <div className={styles.input_field}>
        <LoadDataButton title="SignUp" />
      </div>
    </form>
  );
}
