import { FormEvent } from "react";

import { FiLock } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { GrFormViewHide } from "react-icons/gr";

import useValid from "hooks/useValid";
import { useUserContext } from "context/UserContext";
import Input from "components/common/Input/Input";

import styles from "./Login.module.css";
import LoadDataButton from "components/common/Buttons/LoadDataButton";

type Props = {
  onSubmitAccount: (e: FormEvent<HTMLFormElement>) => Promise<void>;
};

export default function LoginForm({ onSubmitAccount }: Props) {
  const { users, setUsers } = useUserContext();
  const { handleBlur } = useValid();

  return (
    <form onSubmit={onSubmitAccount}>
      <Input
        name="email"
        placeholder="Enter your email"
        icon={<HiOutlineMail />}
        inputs={users}
        setInputs={setUsers}
        onBlur={handleBlur}
      />

      <Input
        name="password"
        type="password"
        placeholder="Enter your Password"
        icon={<FiLock />}
        hideIcon={<GrFormViewHide />}
        inputs={users}
        setInputs={setUsers}
      />

      <RememberMeOption />

      <div className={styles.input_field}>
        <LoadDataButton title="Login Now" />
      </div>
    </form>
  );
}

const RememberMeOption = () => (
  <div className={styles.checkbox_text}>
    <div className={styles.checkbox_content}>
      <input type="checkbox" id="logCheck" />
      <label className={styles.text} htmlFor="logCheck">
        Remember me
      </label>
    </div>
    <button type="button" className={styles.text}>
      Forgot password?
    </button>
  </div>
);
