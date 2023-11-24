import { ChangeEvent, FormEvent, useState } from "react";
import useValid from "hooks/useValid";

import { FiLock } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import {
  PiEyeClosedBold,
  PiEyeBold,
  PiUserFocusBold,
  PiPhoneBold,
  PiUserBold,
} from "react-icons/pi";

import LoadDataButton from "components/common/Buttons/LoadDataButton";

import styles from "./LoginForm.module.css";

type Props = {
  isSignup: boolean;
  loginInfo: { [key: string]: string };
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function LoginForm({
  isSignup,
  onSubmit,
  loginInfo,
  onChange,
}: Props) {
  const { handleBlur } = useValid();
  const [isShowPw, setIsShowPw] = useState(false);
  const { username, password, name, email, phone } = loginInfo;

  return (
    <form className={styles.input_form} onSubmit={onSubmit}>
      <div className={styles.input_field}>
        <PiUserBold className={styles.icon} />
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={onChange}
          className="form-input"
          required
        />
      </div>

      <div className={styles.input_field}>
        <FiLock className={styles.icon} />
        <input
          name="password"
          type={isShowPw ? "text" : "password"}
          placeholder="Password"
          value={password}
          className="form-input"
          onChange={onChange}
          required
        />
        {isShowPw ? (
          <PiEyeBold
            className={styles.showHidePw}
            onClick={() => setIsShowPw(false)}
          />
        ) : (
          <PiEyeClosedBold
            className={styles.showHidePw}
            onClick={() => setIsShowPw(true)}
          />
        )}
      </div>

      {isSignup && (
        <>
          <div className={styles.input_field}>
            <PiUserFocusBold className={styles.icon} />
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={onChange}
              className="form-input"
              required
            />
          </div>
          <div className={styles.input_field}>
            <HiOutlineMail className={styles.icon} />
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={onChange}
              className="form-input"
              required
            />
          </div>
          <div className={styles.input_field}>
            <PiPhoneBold className={styles.icon} />
            <input
              name="phone"
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={onChange}
              className="form-input"
              required
            />
          </div>
        </>
      )}

      {!isSignup && <RememberMeOption />}

      <div className={styles.input_field}>
        <LoadDataButton title={isSignup ? "SignUp Now" : "Login Now"} />
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
    <p className={styles.remember_text}>Forgot password?</p>
  </div>
);
