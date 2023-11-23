import { ChangeEvent, FormEvent } from "react";

import { FiLock } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { GrFormViewHide } from "react-icons/gr";

import useValid from "hooks/useValid";
import { useUserContext } from "context/UserContext";
import Input from "components/common/Input/Input";

import styles from "./Login.module.css";
import LoadDataButton from "components/common/Buttons/LoadDataButton";

type Props = {
  username: string;
  password: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;

  onChange:(e: ChangeEvent<HTMLInputElement>)=> void};

export default function LoginForm({ onSubmit, username, password,onChange }: Props) {
  const { users, setUsers } = useUserContext();
  const { handleBlur } = useValid();

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        type="text"
        placeholder="Id"
        value={username}
        onChange={onChange}
        className="form-input"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        className="form-input"
        onChange={onChange}
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
